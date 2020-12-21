import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./Product.css";

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="product__container">
        <div className="product__imageContainer">
          <img
            src={product.image}
            alt={product.name}
            className="product__imageProduct"
          />
        </div>
        <div className="product__body">
          <div>
            <div>
              <h3>{product.name}</h3>
            </div>
            <div>
              <div>{product.description}</div>
            </div>
          </div>
          <div className="product__footer">
            <div>
              <strong>${product.price}</strong>
            </div>
            <button>
              <ShoppingCartOutlinedIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
