import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './pages/Homepage';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import { isUserLogin, updateCart } from './actions';
import OrderDetails from './pages/OrderDetails';

const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(isUserLogin())
    }, [auth.authenticate])

    useEffect(() => {
        dispatch(updateCart())
    }, [auth.authenticate])

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/account/orders" component={Orders} />
                <Route path="/order_details/:orderId" component={OrderDetails} />
                <Route path="/:productSlug/:productId/p" component={ProductDetails} />
                <Route path="/:slug" component={ProductList} />
            </Switch>
        </Router>
    )
}

export default App
