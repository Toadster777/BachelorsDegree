import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";

function NotFound() {

    const navigate = useNavigate();

    useEffect(() => {

        navigate("/404");

    }, []);

    return (
        <div>NotFound</div>
    )
}

export default NotFound