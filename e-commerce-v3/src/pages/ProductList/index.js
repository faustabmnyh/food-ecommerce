import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedProduct, listAllProducts } from "../../actions/productActions";
import "./ProductList.css";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { Link, useHistory, useParams } from "react-router-dom";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";

const ProductList = (props) => {
  let { pageNumber = 1 } = useParams();
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const productAllLists = useSelector((state) => state.productAllLists);
  const { loading, error, products, page, pages } = productAllLists;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listAllProducts({
        name: name !== "all" ? name : "",
        seller: sellerMode ? aboutUser._id : "",
        pageNumber,
      })
    );
  }, [dispatch, successDelete, sellerMode, aboutUser, pageNumber, name]);
  const handleClickOpen = (product) => {
    setOpen(true);
    setProductId(product._id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(deletedProduct(productId));
    setOpen(false);
  };

  return (
    <div className="productList">
      <form className="form-input-list">
        <label htmlFor="input-list">
          <SearchIcon />
        </label>
        <input
          type="text"
          id="input-list"
          className="input-list"
          value={name}
          placeholder="Search Product List..."
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <div className="productList__header">
        <h1>Products</h1>
        <button
          onClick={() =>
            history.push(
              sellerMode ? "/productcreate?redirect=seller" : "/productcreate"
            )
          }
        >
          Create Product <FastfoodIcon style={{ marginLeft: "5px" }} />
        </button>
      </div>
      {loadingDelete && <Loading />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message condition="danger">{error}</Message>
      ) : (
        <table className="productList__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>STOCKS</th>
              <th>CATEGORY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <Link
                    className="productList__goto"
                    to={`/product/${product._id}`}
                  >
                    {product._id}
                  </Link>
                </td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="productList__image"
                  />
                </td>
                <td>
                  <Link
                    className="productList__goto"
                    to={`/product/${product._id}`}
                  >
                    {product.name}
                  </Link>
                </td>
                <td>{product.price}</td>
                <td>{product.stock_products}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="productList__editBtn"
                    type="button"
                    onClick={() =>
                      history.push(
                        sellerMode
                          ? `/product/${product._id}/edit?redirect=seller`
                          : `/product/${product._id}/edit`
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClickOpen(product)}
                  >
                    Delete
                  </button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Are you sure to delete this product ?
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        No
                      </Button>
                      <Button onClick={handleDelete} color="primary">
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {pages > 1 && (
        <div className="pagination">
          {page > 1 && (
            <button
              onClick={() =>
                history.push(
                  sellerMode
                    ? `/productlists/seller/pageNumber/${page - 1}`
                    : `/productlists/pageNumber/${page - 1}`
                )
              }
            >
              <ArrowBackIosIcon
                style={{ fontSize: "16px", marginRight: "5px" }}
              />
              PREV
            </button>
          )}
          {[...Array(pages).keys()].map((p) => (
            <Link
              className={p + 1 === page ? "active" : ""}
              key={p + 1}
              to={
                sellerMode
                  ? `/productlists/seller/pageNumber/${p + 1}`
                  : `/productlists/pageNumber/${p + 1}`
              }
            >
              {p + 1}
            </Link>
          ))}
          {pages > page && (
            <button
              onClick={() =>
                history.push(
                  sellerMode
                    ? `/productlists/seller/pageNumber/${page + 1}`
                    : `/productlists/pageNumber/${page + 1}`
                )
              }
            >
              NEXT
              <ArrowForwardIosIcon
                style={{ fontSize: "16px", marginLeft: "5px" }}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
