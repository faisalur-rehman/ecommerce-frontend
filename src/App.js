import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Orders from "./components/Orders/Orders";
import Customers from "./components/Customers/Customers";
import OrderDetail from "./components/OrderDetail/OrderDetail";

function App() {
  console.log("hello");
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Sidebar />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/order-details">
            <OrderDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
