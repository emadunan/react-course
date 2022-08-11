import { Link, Navigate, useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();
    // navigate("/welcome", {replace: true});
    // navigate(-1);    Backward
    // navigate(1);     Forward

    return (
        <section>
            <h1>Products Page</h1>
            <ul>
                <li>
                    <Link to="/products/p1">A Book</Link>
                </li>
                <li>
                    <Link to="/products/p1">A Carpet</Link>
                </li>
                <li>
                    <Link to="/products/p1">A Computer</Link>
                </li>
            </ul>
        </section>
    );
}

export default Products;