import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import Rating from "../Rating";
import "./Product.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="product">
      <div className="product__container">
        <div className="product__imageContainer">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="product__imageProduct"
            />
          </Link>
        </div>
        <div className="product__body">
          <div>
            <div className="product__header">
              <div>
                <Link to={`/product/${product._id}`}>
                  <h3>{product.name}</h3>
                </Link>
              </div>
              <div className="product__rating">
                <Rating rating={product.rating} />
              </div>
            </div>
            <div>
              <div className="product__description">{product.description}</div>
            </div>
          </div>
          <div className="product__footer">
            <div className="product__seller">
              <Link to={`/seller/${product.seller?._id}`}>
                <strong>{product?.seller?.seller?.name}</strong>
              </Link>
            </div>
            <div className="product__footerPrice">
              <div>
                <strong>${product.price}</strong>
              </div>
              <button onClick={() => dispatch(addToCart(product._id, 1))}>
                <ShoppingCartOutlinedIcon className="product__cartIcon"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
