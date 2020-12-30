import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { detailsProduct, updateProduct } from "../../actions/productActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import "./ProductEdit.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ProductEdit = () => {
  let { productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = productUpdate;
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(product);
  useEffect(() => {
    if (successUpdate) {
      history.push("/productlists");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.stock_products);
      setDescription(product.description);
    }
  }, [successUpdate, productId, product, history, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      })
    );
  };
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    console.log(bodyFormData);
    try {
      const { data } = await Axios.post("/v1/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${aboutUser.token}`,
        },
      });
      setLoadingUpload(true);
      setImage(data);
      setLoadingUpload(false);
    } catch (err) {
      setLoadingUpload(true);
      setErrorUpload(err.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div>
      <div className="productEdit__container">
        <form onSubmit={handleSubmit}>
          {loadingUpdate && <Loading />}
          {errorUpdate && <Message condition="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message condition="danger">{error}</Message>
          ) : (
            <>
              <Link to="/productlists">
                <p className="back">
                  <ArrowBackIcon fontSize="small" /> Back To Product List
                </p>
              </Link>
              <h2>
                Edit Product{" "}
                <Link to={`/product/${product._id}`}>{product._id}</Link>
              </h2>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Product Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="productEdit__inputNumber">
                <div className="productEdit__inputPrice">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    placeholder="Enter Product Price..."
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="productEdit__inputStock">
                  <label htmlFor="countInStock">Product In Stock</label>
                  <input
                    type="number"
                    id="countInStock"
                    placeholder="Enter Product Stock..."
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <img src={image} alt="name" className="productEdit__inputImg" />
                <input
                  type="file"
                  id="image"
                  label="Choose Image"
                  accept="image/*"
                  className="productEdit__inputFile"
                  onChange={handleChangeImage}
                />
                {loadingUpload && <Loading />}
                {errorUpload && (
                  <Message condition="danger">{errorUpload}</Message>
                )}
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  placeholder="Enter Product Category..."
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Enter Product Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label />
                <button className="productEdit__btn" type="submit">
                  Update Product
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
