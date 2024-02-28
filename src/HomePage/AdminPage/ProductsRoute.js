import { Routes, Route, Link, useParams } from 'react-router-dom';
import ProductLine from '../ProductComponents/ProductLine';

export default function ProductsRoute() {
    let { type } = useParams();

    return (
        <div className='admin-products' style={{overflow: "scroll"}}>
            <nav>
                <Link to="laptop">Laptops</Link>
                <Link to="computer">Computers</Link>
                <Link to="phone">Phones</Link>
                <Link to="tablet">Tablets</Link>
                <Link to="mause">Mouses</Link>
                <Link to="monitor">Monitors</Link>
                <Link to="disk">Disks</Link>
                <Link to="TV">TV</Link>
                <Link to="cameras">Cameras</Link>
            </nav>

            <Routes>
                <Route path={`${type}`} element={<ProductLine productType={type} isAuthorized={true} searchRegex={null}/>} />
            </Routes>

            <Link className='add-product' to="/admin/create">Add product +</Link>
        </div>
    );
}

