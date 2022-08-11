import { Fragment } from "react";
import { useParams } from "react-router-dom";

function ProductDetail(props) {
    const param = useParams();
    return (
        <section>
            <h1>Product Detail</h1>
            <p>{param.productId}</p>
        </section>
    );
}

export default ProductDetail;