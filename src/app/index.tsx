/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { useTranslation } from 'react-i18next';

import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

import { useDispatch, useSelector } from 'react-redux';
import { useLoginSlice } from './pages/LoginPage/slice';

import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { CategoryPage } from 'app/pages/CategoryPage/Loadable';
import { ProductPage } from 'app/pages/ProductPage/Loadable';
import { AddProductPage } from './pages/AddProductPage/Loadable';
import { ViewProductPage } from './pages/ViewProductPage/Loadable';
import { UpdateProductPage } from './pages/UpdateProductPage/Loadable';
import { AccountPage } from './pages/AccountPage/Loadable';
import { CartPage } from './pages/CartPage/Loadable';
import { ViewCartPage } from './pages/ViewCartPage/Loadable';
import { useCartSlice } from './pages/CartPage/slice';
import { selectCart } from './pages/CartPage/slice/selector';

export function App() {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const { actions } = useLoginSlice();

  const { actions: cartActions } = useCartSlice();

  const { page, size, updateStatus } = useSelector(selectCart);

  React.useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch(cartActions.getCartListRequest({ page, size }));
    }
  }, [page, updateStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch(actions.getUserProfileRequest());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s" htmlAttributes={{ lang: i18n.language }} />

      <Switch>
        <PublicRoute path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={CategoryPage} />
        <ProtectedRoute exact path="/product" component={ProductPage} />
        <ProtectedRoute exact path="/account" component={AccountPage} />
        <ProtectedRoute path="/view-product/:id" component={ViewProductPage} />
        <ProtectedRoute
          path="/edit-product/:id"
          component={UpdateProductPage}
        />
        <ProtectedRoute exact path="/add-product" component={AddProductPage} />
        <ProtectedRoute exact path="/cart" component={CartPage} />
        <ProtectedRoute path="/view-cart/:id" component={ViewCartPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
