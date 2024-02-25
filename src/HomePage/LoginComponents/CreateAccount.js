import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CreateAccount(props) {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  async function SubmitHandler(e) {
    e.preventDefault();

    try {
      let response = await fetch('http://localhost:5000/user', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(props.objectData)
      });

      let responseData = await response.json();
      if (responseData.message !== "User created!") {
        setError(responseData.message);
      }
      else {
        setError(responseData.message);
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='main-div'>
      <form onSubmit={SubmitHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="Enter your username" onChange={props.setFunctions[0]} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Enter your password" onChange={props.setFunctions[1]} />
        <label htmlFor="confirm_password">Confirm password</label>
        <input type="password" name="confirm_password" placeholder="Confirm your password" onChange={props.setFunctions[2]} />
        <label htmlFor="birthday">Birthday</label>
        <input type="date" name="birthday" placeholder="Confirm your password" onChange={props.setFunctions[3]} />
        <div>
          <input type="radio" value="male" name="gender" onChange={props.setFunctions[4]} />
          <label htmlFor="gender">male</label>
        </div>
        <div>
          <input type="radio" value="female" name="gender" onChange={props.setFunctions[4]} />
          <label htmlFor="female">female</label>
        </div>
        <input type="submit" value="Sign up" />
      </form>

      {error !== "" && <p>{error}</p>}
    </div>
  );
}