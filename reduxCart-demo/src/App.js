import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from "./components/UI/Notification";
import { updateCart, fetchCartData } from "./store/cart-slice";
// import { uiActions } from "./store/ui-slice";

let isInit = true;

function App() {

  // Setup store dispatcher
  const dispatch = useDispatch();

  // Setup store subscriptions
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    }

    if (cart.changed) {
      dispatch(updateCart(cart));
    }

    // dispatch(uiActions.showNotification({
    //   status: "pending",
    //   title: "Sending ...",
    //   message: "Sending cart data!",
    // }));

    // fetch("https://meals-8eedd-default-rtdb.firebaseio.com/cart.json", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(cart)
    // }).then(response => {
    //   if (!response.ok) {
    //     dispatch(uiActions.showNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: "Sending cart data failed!",
    //     }));
    //   }

    //   dispatch(uiActions.showNotification({
    //     status: "success",
    //     title: "Success!",
    //     message: "Sent cart data successfully!",
    //   }));
    // }).catch(_ => {
    //   dispatch(uiActions.showNotification({
    //     status: "error",
    //     title: "Error!",
    //     message: "Sending cart data failed!",
    //   }));
    // })
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
