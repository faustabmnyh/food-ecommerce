import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import Rating from "../../components/Rating";
import "./ProductDetails.css";
import { detailsProduct } from "../../actions/productActions";

const ProductDetails = () => {
  let { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="danger">{error}</Message>
  ) : (
    <div className="productDetails">
      <div className="productDetails__left">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="productDetails__right">
        <div className="productDetails__container">
          <div className="productDetails__header">
            <h2>{product.name} </h2>
            <Rating rating={product.rating} />
          </div>
          <div>Reviews: {product.num_reviews} Reviews</div>
          <div className="productDetails__price">
            <div>Price: </div>
            <p>
              <strong>${product.price}</strong>
            </p>
          </div>
          <p>Description: {product.description}</p>
        </div>
      </div>
      <div className="productDetails__right">
        <div className="productDetails__container">
          <ul>
            <li>
              <div>Price</div>
              <p>
                <strong>${product.price}</strong>
              </p>
            </li>
            <li>
              <div>Status</div>
              <div>
                {product.stock_products > 0 ? (
                  <span className="success">In Stock</span>
                ) : (
                  <span className="danger">Unavailable</span>
                )}
              </div>
            </li>
            {product.stock_products > 0 && (
              <>
                <li>
                  <div>Qty</div>
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.stock_products).keys()].map((q) => (
                        <option key={q + 1} value={q + 1}>
                          {q + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </li>
                <li>
                  <button
                    className="productDetails__btn"
                    onClick={() =>
                      history.push(`/cart/${productId}?qty=${qty}`)
                    }
                  >
                    Add to Cart
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
