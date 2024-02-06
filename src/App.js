import HomePage from "./HomePage/HomePage.js";
import Login from "./HomePage/LoginComponents/Login";
import CreateAccount from "./HomePage/LoginComponents/CreateAccount";
import ShopPage from "./HomePage/ShopPage/ShopPage.js";
import MainComponent from "./HomePage/AdminPage/MainComponent.js";
import Box from "./HomePage/ShopPage/Box.js";
import PurchaseComponent from "./HomePage/ShopPage/PurchaseComponent.js";
import MainCommentsComponent from "./HomePage/ProductComponents/CommentsComponents/MainCommentsComponent.js";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function App() {
  const navigate = useNavigate();

  const [data, setData] = useState(
    {
      username: "",
      password: "",
      confPassword: "",
      birthday: new Date(),
      gender: ""
    }
  );

  //default {user : "", isLogged : false}
  const [user, setUser] = useState({});

  //const [isAuthorized, setAuthorized] = useState(false);

  function setUsername(e) {
    setData(prevData => {
      return { ...prevData, username: e.target.value };
    })
  }

  function setPassword(e) {
    setData(prevData => {
      return { ...prevData, password: e.target.value };
    })
  }

  function setConfigPassword(e) {
    setData(prevData => {
      return { ...prevData, confPassword: e.target.value };
    })
  }

  function setBirthday(e) {
    setData(prevData => {
      return { ...prevData, birthday: e.target.value };
    })
  }

  function setGender(e) {
    setData(prevData => {
      return { ...prevData, gender: e.target.value };
    })
  }

  function LoginHandle(userToSet) {
    setUser(prevValue => {
      return { ...userToSet, isLogged: true, isAuthorized: userToSet.role === "admin" ? true : false };
    });
  }

  function onBackButtonClicked() {
    console.log("BACK TO HOME PAGE!");
    navigate('/');
  }

  //Adds products to the box atribute of the user to be displayed in the cart
  function addToCard(product) {
    if (user.isLogged) {
      setUser(oldData => {
        //oldData.box.push(product);
        return {...oldData, box: [...oldData.box, product]};
      });
    }
  }

  //Empty the box atribute of the user. Can only be called on purchase or removing from the cart
  function removeFromCart(id) {
    if (id) {
      console.log(user);
      let index = 1;
      while(true) {
        if(index === id) {
          break;
        }
        else {
          index++;
        }
      }

      setUser(oldData => {
        oldData.box.splice(index - 1, 1);
        return {...oldData};
      })
    }
    else {
      if (user.isLogged) {
        setUser(oldData => {
          oldData.box.length = 0;
          return {...oldData};
        })
      }
    }
  }


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage {...user} />} />
        <Route path="/shop/*" element={<ShopPage userInfo={user} addToCard={addToCard} />} />
        <Route path="/login" element={<Login objectData={{ username: data.username, password: data.password }} setFunctions={[setUsername, setPassword]} onLogin={LoginHandle} />} />
        <Route path="/create" element={<CreateAccount objectData={data} setFunctions={[setUsername, setPassword, setConfigPassword, setBirthday, setGender]} />} />
        <Route path="/admin/*" element={<MainComponent adminInfo={user} onBack={onBackButtonClicked} />} />
        <Route path="/card" element={<Box {...user} onPurchase={removeFromCart} />} />
        <Route path="/purchase" element={<PurchaseComponent />} />
        <Route path="/comments/:type/:id/:value/*" element={<MainCommentsComponent  {...user}/>}/>
      </Routes>
      {user && user.isAuthorized && <Link to="/admin">Admin page</Link>}
    </div>
  );
}

export default App;
