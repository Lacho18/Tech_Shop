import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminNavigateHeader from './AdminNavigateHeader';
import ProductsRoute from './ProductsRoute';
import CommentsRoute from './CommentsRoute';
import UsersRoute from './UsersRoute';
import ProductCreation from './CreateProduct/ProductCreation1';
import "./AdminPage.css";

export default function MainComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.adminInfo.isAuthorized) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, []);

    if (props.adminInfo.isAuthorized) {
        return (
            <div className='admin-main'>
                <Routes>
                    <Route path='/' element={<AdminNavigateHeader name = {props.adminInfo.username}/>} >
                        <Route index />
                        <Route path='product/*' element={<ProductsRoute />}>
                            <Route path=':type'/>
                        </Route>
                        <Route path='comments' element={<CommentsRoute />}></Route>
                        <Route path='users' element={<UsersRoute />}></Route>
                    </Route>
                    <Route path='/create' element={<ProductCreation />}>

                    </Route>
                </Routes>
            </div>
        );
    }
    else {
        return (
            <div>
                <p>You do not have access to this page!</p>
            </div>
        );
    }
}