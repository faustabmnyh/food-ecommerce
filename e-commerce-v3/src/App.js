import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainApp from "./pages/MainApp";
import Signin from "./pages/Signin";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/signin" component={Signin} />
        <Route path="/">
          <MainApp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
