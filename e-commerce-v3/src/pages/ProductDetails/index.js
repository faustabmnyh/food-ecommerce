import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import Rating from "../../components/Rating";
import "./ProductDetails.css";
import {
  createReview,
  detailsProduct,
  listAllProducts,
} from "../../actions/productActions";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { PRODUCT_REVIEW_CREATE_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  let { productId } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [aboutReview, setAboutReview] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;
  const productAllLists = useSelector((state) => state.productAllLists);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productAllLists;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (successReviewCreate) {
      setOpen(true);
      setAboutReview("Review Submitted Successfully !");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    if (!product) {
      dispatch(detailsProduct(productId));
    }
    if (product) {
      dispatch(listAllProducts({ seller: product?.seller?._id }));
    }
  }, [dispatch, productId, successReviewCreate, product]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, {
          rating,
          comment,
          photo_profile: aboutUser.photo_profile,
        })
      );
    } else {
      setOpen(true);
      setAboutReview("Please enter comment and rating");
    }
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="danger">{error}</Message>
  ) : (
    <div className="productDetails">
      <div className="productDetails__content">
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
              {product.seller && (
                <li className="productDetails__seller">
                  <div>
                    <img
                      src={product?.seller?.seller?.logo}
                      alt={product?.seller?.seller?.name}
                      className="productDetails__containerImg"
                    />
                  </div>
                  <div className="productDetails__sellerName">
                    <Link to={`/seller/${product.seller?._id}`}>
                      {product?.seller?.seller?.name}
                    </Link>
                    {loadingProducts ? null : errorProducts ? (
                      <Message condition="danger">{errorProducts}</Message>
                    ) : (
                      <Rating
                        numReviews={products?.reduce(
                          (a, c) => c.num_reviews + a,
                          0
                        )}
                        rating={
                          products?.reduce((a, c) => c.rating + a, 0) /
                          products?.length
                        }
                        caption=" "
                      />
                    )}
                  </div>
                </li>
              )}
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
      <div className="productDetails__container reviews">
        <ul>
          <li>
            <h2 id="reviews">Reviews Customer</h2>
          </li>
          {product.reviews.map((review) => (
            <li key={review._id} className="productDetails__reviewResult">
              <div className="productDetails__reviewUser">
                <Avatar
                  src={review.photo_profile}
                  style={{ marginRight: "10px" }}
                />{" "}
                {review.username}
              </div>
              <div className="productDetails__reviewDate">
                <Rating rating={review.rating} caption=" " seller comment />
                <p>Reviewed on {review.createdAt.substring(0, 10)}</p>
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
        {aboutUser ? (
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Write a customer review</h2>
            </div>
            <div className="productDetails__reviewSelect">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Exelent</option>
              </select>
            </div>
            <div>
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="productDetails__reviewBtn">
              <div>
                <ul className="productDetails__reviewFast">
                  <li onClick={(e) => setComment("Thank You!")}>Thank You!</li>
                  <li onClick={(e) => setComment("Fast Delivey!")}>
                    Fast Delivery!
                  </li>
                  <li onClick={(e) => setComment("Tasty Food!")}>
                    Tasty Food!
                  </li>
                  <li onClick={(e) => setComment("Good Seller!")}>
                    Good Seller!
                  </li>
                </ul>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
            <div>
              {loadingReviewCreate && <Loading />}
              {errorReviewCreate && (
                <Message condition="danger">{errorReviewCreate}</Message>
              )}
            </div>
          </form>
        ) : (
          <Message>
            Please <Link to="/signin">Sign In</Link> to write a review
          </Message>
        )}
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{aboutReview}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
