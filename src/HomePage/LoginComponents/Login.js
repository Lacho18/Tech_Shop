import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    async function LoginSubmitHandler(e) {
        e.preventDefault();

        try {
            let response = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(props.objectData)
            });

            let responseData = await response.json();

            if (responseData.message === "Success") {
                props.onLogin(responseData);
                navigate('/');
            }
            else {
                if(responseData.message) {
                    setError(responseData.message);
                }
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='main-div'>
            <h1>1qaz+e?_aDM</h1>
            <form onSubmit={LoginSubmitHandler}>
                <label htmlFor="username">Type your username</label>
                <input type="text" name="username" placeholder="Username" onChange={props.setFunctions[0]} />
                <label htmlFor="password">Type your password</label>
                <input type="password" name="password" placeholder="Password" onChange={props.setFunctions[1]} />
                <input type="submit" value="Log in"/>
            </form>

            {error !== "" && <p>{error}</p>}
        </div>
    );
}