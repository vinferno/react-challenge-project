import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import PrivateRoute from "./guards/protected-route";

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/edit-order" exact component={OrderForm} />
      <PrivateRoute path="/order" exact component={OrderForm} />
      <PrivateRoute path="/view-orders" exact component={ViewOrders} />

    </Router>
  );
}

export default AppRouter;
