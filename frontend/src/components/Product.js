import { Link } from "react-router-dom";
import "./Product.css";
import Fade from 'react-reveal/Fade';

const Product = ({imageUrl, name, price, description, productId}) => {
    return (
        <Fade bottom cascade>
        <div className="product">
            
            <img src={imageUrl} alt={name} />

            <div className="product__info">
                <p className="info__name">{name}</p>
                <p className="info__description">{description.substring(0, 100)}...</p>

                <p className="info__price">NGN {price}</p>

                <Link to={`/product/${productId}`} className="info__button">
                    View
                </Link>
            </div>
            
        </div>
        </Fade>
    )
}

export default Product;
