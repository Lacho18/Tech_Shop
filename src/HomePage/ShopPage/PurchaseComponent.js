import { Link } from "react-router-dom";

export default function PurchaseComponent() {

    return(
        <div>
            <p>Purchase page</p>
            <Link to="/shop">Go back to shop</Link>
        </div>
    );
}