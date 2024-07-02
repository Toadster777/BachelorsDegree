import React, { useState, useEffect } from 'react'
import { Widget, addResponseMessage } from 'react-chat-widget';
import '../../node_modules/react-chat-widget/lib/styles.css';
import { API } from "../constants";

export const ChatAssistant = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [usableSubcategories, setUsableSubcategories] = useState([]);

    const fetchSubcategories = async () => {
        try {
            const response = await fetch(`${API}/subcategories/formatted`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUsableSubcategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            return []; // Return an empty array in case of error
        }
    };


    chatHistory.push(['system', ` You are an online sales assistant answering questions to users in an online chat.Your knowledge is limited to information regarding products that adhere to the existing subcategories: ${usableSubcategories}. You are also an expert in all the subcategory domains provided. Do not answer to unrelated questions. To a question that is outside the context of the subcategories, you will respond with a polite refusal. Adhere to the romanian language. For any function call attributes regarding subcategories, use the slugs that are the subcategory name without spaces and in lowercase. For example, for the subcategory "Laptops" use the slug "laptops".`]);


    const sendUserMessage = async (newMessage) => {
        try {
            const messages = chatHistory?.map(([role, content]) => ({ role, content }));
            messages.push(({ role: 'user', content: newMessage }));
            const response = await fetch(`${API}/chat-assistant`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.reply[0]) {
                addResponseMessage(data.reply[0].content);
            }
            else {
                addResponseMessage(data.reply.content);
            }
            chatHistory.push(['user', newMessage]);
            data.reply.forEach(element => {
                chatHistory.push([element.role, element.content]);
            });
            setIsLoading(false);
            return data;
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
        }
    };

    const handleNewUserMessage = (newMessage) => {
        sendUserMessage(newMessage);
    };

    useEffect(() => {
        fetchSubcategories();
        addResponseMessage('Buna! Sunt asistentul dumneavoastra virtual. Iata o lista de lucruri cu care te pot ajuta:\n1. Pot sa iti prezint subcategoriile disponibile.\n2. Pot sa iti ofer informatii despre produsele dintr-o anumita subcategorie.\n3. Dupa o discutie legata de produsele dintr-o subcategorie, iti pot oferi un link de filtrare.')
    }, []);

    return (
        <Widget handleNewUserMessage={handleNewUserMessage} />
    )
}