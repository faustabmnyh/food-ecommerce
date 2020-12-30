import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedProduct, listAllProducts } from "../../actions/productActions";
import "./ProductList.css";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { Link, useHistory } from "react-router-dom";
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

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const productAllLists = useSelector((state) => state.productAllLists);
  const { loading, error, products } = productAllLists;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listAllProducts());
  }, [dispatch, successDelete]);
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
      <div className="productList__header">
        <h1>Products</h1>
        <button onClick={() => history.push("/productcreate")}>
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
                    onClick={() => history.push(`/product/${product._id}/edit`)}
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
    </div>
  );
};

export default ProductList;
