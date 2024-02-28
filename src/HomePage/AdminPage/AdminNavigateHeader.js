import { Link, Outlet } from "react-router-dom";

export default function AdminNavigateHeader(props) {

    function backClickedHandler() {
        props.onBack();
    }

    return(
        <div className="admin-header">
            <p>Welcome <span style={{fontWeight : "bold"}}>{props.name}</span></p>
            <nav>
                <Link to="product">Products</Link>
                <Link to="comments">Comments</Link>
                <Link to="users">Users</Link>
            </nav>

            <Outlet />
        </div>
    );
}