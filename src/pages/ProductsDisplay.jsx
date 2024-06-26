import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams, useLocation } from 'react-router-dom';
import { API, } from "../constants";
import { getFirstWord, getSecondWord, getQueryParamsAfterSubcategory } from '../utils';
import { Formik, Field, Form, useField } from 'formik';
import { useNavigate } from 'react-router-dom';

function ProductsDisplay() {
  const location = useLocation();
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [queryParameters] = useSearchParams()
  const [filterParams, setFilterParams] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  
  const fetchSubcategoryProducts = async () => {
    setIsLoading(true);
    try {
      console.log(filterParams)
      const response = await fetch(`${API}/products/filter?subcategory=${queryParameters.get('subcategory')}&${filterParams}`, {
        headers: {},
      });
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      console.error(error);
      //error messaage
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchedProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/products/search?searchParam=${queryParameters.get('searchParam')}`, {
        headers: {},
      });
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      console.error(error);
      //error message
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilterData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/products/generateFiltersData?subcategory=${queryParameters.get('subcategory')}`, {
        headers: {},
      });
      const data = await response.json();
      setFilterData(data);
    } catch (error) {
      console.error(error);
      //error message
    } finally {
      setIsLoading(false);
    }
  };

  const displayProducts = () => {
    if (!productsData) {
      return null; // or return a loading spinner or some placeholder content
    }
    const products = productsData;
    let jsxElements = [];
    products?.forEach((element, index) => {
      jsxElements?.push(<ProductCard product={element} key={index} />);
    });

    return jsxElements;


  };


  const displayFilters = () => {
    if (!filterData) {
      return null; // or return a loading spinner or some placeholder content
    }

    let initialValues = {};
    filterData.forEach((filter) => {
      initialValues[`${filter.name}`] = {};
      filter?.values.forEach((value) => {
        initialValues[`${filter.name}`][value.replace('.', '_')] = false;
      });
    });

    // Load saved form values from local storage
    const savedFormValues = JSON.parse(localStorage.getItem('formValues'));
    if (savedFormValues) {
      initialValues = savedFormValues;
    }

    // console.log(initialValues)
    // console.log(Object.entries(JSON.parse(localStorage.getItem('formValues'))))

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(Object.entries(values))
          // Convert form values to query parameters
          const queryParams = Object.entries(values)
            .flatMap(([filterName, filterValues]) =>
              Object.entries(filterValues).filter(([valueName, isChecked]) => isChecked).map(([valueName, isChecked]) => `${filterName}=${valueName.replace('_', '.').replace(' ', '%20')}`)
            )
            .join('&');
          setFilterParams(queryParams);
          console.log(queryParams)

          const newUrl = `?subcategory=${queryParameters.get('subcategory')}&${queryParams}`;

          // Save form values to local storage
          localStorage.setItem('formValues', JSON.stringify(values));

          navigate(newUrl);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className='flex flex-col gap-y-8'>
            <button type='submit' className='bg-secondary' >Filter</button>
            {generateFilters(filterData, setFieldValue, values)}
          </Form>
        )}
      </Formik>
    );
  }

  const generateFilters = (filterAttributes, setFieldValue, values) => {
    return filterAttributes.map((filterObj) => (
      <div className="mb-3 w-full flex flex-col gap-y-4 p-6 h-fit bg-gray-100 shadow-inner max-w-[20rem] mr-8 border-2 border-primary" key={filterObj.name}>
        <h2>{`${getFirstWord(filterObj.name)} ${getSecondWord(filterObj.name)}  `}</h2>
        <fieldset>
          <legend class="sr-only">Checkbox variants</legend>
          {filterObj.values.map(value => (
            <div class="flex items-center mb-4" key={value}>
              <Field
                id={`${filterObj.name}`}
                type="checkbox"
                name={`${filterObj.name}.${value.replace('.', '_')}`}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                onClick={(event) => {
                  setFieldValue(`${filterObj.name}.${value.replace('.', '_')}`, event.target.checked);
                }}
              />
              <label htmlFor={`${filterObj.name}`} class="ms-2 text-sm font-medium text-gray-900">{value}</label>
            </div>
          ))}
        </fieldset>
      </div>
    ));
  }



  useEffect(() => {
    // Load saved form values from local storage
    const savedFormValues = JSON.parse(localStorage.getItem('formValues'));
    if (savedFormValues) {
      // Convert form values to query parameters
      const queryParams = Object.entries(savedFormValues)
        .flatMap(([filterName, filterValues]) =>
          Object.entries(filterValues).filter(([valueName, isChecked]) => isChecked).map(([valueName, isChecked]) => `${filterName}=${valueName.replace('_', '.').replace(' ', '%20')}`)
        )
        .join('&');
      setFilterParams(queryParams);
    }
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // Load saved form values from local storage
    const savedFormValues = JSON.parse(localStorage.getItem('formValues'));
    if (savedFormValues) {
      // Convert form values to query parameters
      const queryParams = Object.entries(savedFormValues)
        .flatMap(([filterName, filterValues]) =>
          Object.entries(filterValues).filter(([valueName, isChecked]) => isChecked).map(([valueName, isChecked]) => `${filterName}=${valueName.replace('_', '.').replace(' ', '%20')}`)
        )
        .join('&');
      setFilterParams(queryParams);
    }
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {

    const match = location.pathname.match(/\/([^\/]+)\/([^\/]+)/);
    if (match && match[2] === 'search') {
      fetchSearchedProducts();
    } else {
      fetchSubcategoryProducts();
    }

  }, [filterParams]); // Runs whenever filterParams changes

  useEffect(() => {
    const savedFormValues = JSON.parse(localStorage.getItem('formValues'));
    if (!savedFormValues || Object.keys(savedFormValues).length === 0) {
      const match = location.pathname.match(/\/([^\/]+)\/([^\/]+)/);
      if (match && match[2] === 'search') {
        fetchSearchedProducts();
      } else {
        fetchSubcategoryProducts();
      }
    }
  }, []); // Runs once on mount if there are no filters applied

  useEffect(() => {
    fetchFilterData()
  }, [])


  return (
    <div className='w-full flex justify-center'>

      <div className='contentContainer verticalContent flex flex-col w-full'>


        <div className='flex'>

          <div className='flex flex-col gap-8'>

            {displayFilters()}

          </div>
          <div className='flex flex-col w-full'>
            <div>ceva</div>

            <div className='w-full flex flex-row flex-wrap shrink grow basis-0 gap-x-[1rem] gap-y-[2rem] justify-around  content-start '>

              {displayProducts()}

            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default ProductsDisplay