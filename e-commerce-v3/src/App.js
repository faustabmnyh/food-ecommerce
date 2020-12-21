import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="grid__container">
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
