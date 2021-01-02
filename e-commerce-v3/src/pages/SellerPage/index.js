import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listAllProducts } from "../../actions/productActions";
import { detailsUser } from "../../actions/userActions";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import Rating from "../../components/Rating";
import Product from "../../components/Product";
import "./SellerPage.css";

const SellerPage = () => {
  let { sellerId } = useParams();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const productAllLists = useSelector((state) => state.productAllLists);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productAllLists;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(sellerId));
    }
    dispatch(listAllProducts({ seller: sellerId }));
  }, [dispatch, sellerId, user]);
  console.log("user", user);
  return (
    <div className="sellerPage">
      <div className="sellerPage__left">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message></Message>
        ) : (
          <ul>
            <li className="sellerPage__info">
              <div>
                <img src={user.seller.logo} alt={user.seller.name} />
              </div>
              <div>{user.seller.name}</div>
            </li>
            <li>
              <Rating
                seller
                numReviews={products?.reduce((a, c) => c.num_reviews + a, 0)}
                rating={
                  products?.reduce((a, c) => c.rating + a, 0) / products?.length
                }
              />
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="sellerPage__right">
        {loadingProducts ? (
          <Loading />
        ) : errorProducts ? (
          <Message condition="danger">{errorProducts}</Message>
        ) : (
          <>
            {products?.length === 0 && <Message>No Product Found</Message>}
            <div className="sellerPage__product">
              {products?.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
