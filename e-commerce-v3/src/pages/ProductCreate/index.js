import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createProduct } from "../../actions/productActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import "./ProductCreate.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ProductCreate = () => {
  const [name, setName] = useState(
    `Sample Name Product ${new Date().getTime()}`
  );
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(
    "/images/products/healthy-trendy-brunch.png"
  );
  const [category, setCategory] = useState("Sample Product Category");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("Sample Product Description");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const productCreate = useSelector((state) => state.productCreate);
  const { success, loading, error } = productCreate;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        countInStock,
        description,
        category,
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
  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push("/productlists");
    }
  }, [success, history, dispatch]);
  return (
    <div>
      <div className="productCreate__container">
        {loading && <Loading />}
        {error && <Message condition="danger">{error}</Message>}
        <form onSubmit={handleSubmit}>
          <Link to="/productlists">
            <p className="back">
              <ArrowBackIcon /> Back To Product List
            </p>
          </Link>
          <h2>Create Product</h2>
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
          <div className="productCreate__inputNumber">
            <div className="productCreate__inputPrice">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                placeholder="Enter Product Price..."
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="productCreate__inputStock">
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
            <img src={image} alt="name" className="productCreate__inputImg" />
            <input
              type="file"
              id="image"
              label="Choose Image"
              accept="image/*"
              className="productCreate__inputFile"
              onChange={handleChangeImage}
            />
            {loadingUpload && <Loading />}
            {errorUpload && <Message condition="danger">{errorUpload}</Message>}
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
            <button className="productCreate__btn" type="submit">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
