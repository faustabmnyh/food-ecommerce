import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  listAllProducts,
  listProductCategories,
} from "../../actions/productActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import Product from "../../components/Product";
import "./SearchPage.css";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import GradeIcon from "@material-ui/icons/Grade";
import { prices, ratings } from "../../utils";
import Rating from "../../components/Rating";

const SearchPage = () => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams();
  console.log(min);
  const dispatch = useDispatch();
  const history = useHistory();
  const productAllLists = useSelector((state) => state.productAllLists);
  const { loading, error, products } = productAllLists;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listAllProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        order,
        rating,
      })
    );
    dispatch(listProductCategories());
  }, [dispatch, name, category, min, max, order, rating]);
  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMax = filter.max;
    const filterMin = filter.min;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };
  const handleRemoveFilter = () => {
    history.push(`/search/name/${name}`);
  };
  const condition =
    name !== "all" ||
    category !== "all" ||
    min !== 0 ||
    max !== 0 ||
    rating !== 0 ||
    order !== "newest";


  return (
    <div className="searchPage">
      <div className="searchPage__mainHeader">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message condition="danger">{error}</Message>
        ) : (
          <div className="searchPage__result">
            <h3>{products.length} Result</h3>
            {condition && (
              <button onClick={handleRemoveFilter}>Remove Filter</button>
            )}
          </div>
        )}
        <div>
          <select
            value={order}
            onChange={(e) => {
              history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Costumer Reviews</option>
          </select>
        </div>
      </div>
      <div className="searchPage__container">
        <div className="searchPage__left">
          <div>
            <div className="searchPage__menu">
              <h3 className="searchPage__header">
                <RestaurantMenuIcon style={{ marginRight: "10px" }} /> Menu
              </h3>
              {loadingCategories ? (
                <Loading />
              ) : errorCategories ? (
                <Message condition="danger">{errorCategories}</Message>
              ) : (
                <ul>
                  <li>
                    <Link
                      className={"all" === category ? "active" : ""}
                      to={getFilterUrl({ category: "all" })}
                    >
                      Any
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? "active" : ""}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div>
                <h3 className="searchPage__header">
                  <MonetizationOnIcon style={{ marginRight: "10px" }} /> Price
                </h3>
                <ul>
                  {prices.map((price) => (
                    <li key={price.name}>
                      <Link
                        className={
                          `${price.min}-${price.max}` === `${min}-${max}`
                            ? "active"
                            : ""
                        }
                        to={getFilterUrl({ min: price.min, max: price.max })}
                      >
                        {price.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="searchPage__header">
                  <GradeIcon style={{ marginRight: "10px" }} /> Avg. Customer
                  Reviews
                </h3>
                <ul>
                  {ratings.map((r) => (
                    <li key={r.name}>
                      <Link
                        className={
                          `${r.rating}` === `${rating}` ? "active" : ""
                        }
                        to={getFilterUrl({ rating: r.rating })}
                      >
                        <Rating caption={" & up"} rating={r.rating} seller />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="searchPage__right">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message condition="danger">{error}</Message>
          ) : (
            <>
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
