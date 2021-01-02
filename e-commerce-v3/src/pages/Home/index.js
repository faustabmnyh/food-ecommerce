import "./Home.css";
import Product from "../../components/Product";
import Jumbotron from "../../components/Jumbotron";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  const productLists = useSelector((state) => state.productLists);
  const { loading, products, error } = productLists;
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="danger">{error}</Message>
  ) : (
    <div className="home">
      <Jumbotron />
      <div className="home__product" id="buynow">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
