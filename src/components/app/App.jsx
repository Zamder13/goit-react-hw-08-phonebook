import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "../index.js";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "services/serviceAPI.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "redux/authSlice.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

import { PublicRoute, PrivateRoute } from "../index.js";

const HomePage = lazy(() => import("pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("pages/SignUpPage/SignUpPage.jsx"));
const LoginPage = lazy(() => import("pages/LoginPage/LoginPage.jsx"));
const ContactsPage = lazy(() => import("pages/ContactsPage/ContactsPage.jsx"));

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const { data, isFetching } = useGetCurrentUserQuery(token, {
    skip: token === null,
  });

  useEffect(() => {
    if (data) {
      dispatch(refreshToken(data));
    }
  }, [data, dispatch]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Suspense fallback="">
          <Routes>
            <Route path="/" element={<NavigationBar />}>
              <Route
                path="/"
                element={
                  <PublicRoute path="/">
                    <HomePage />
                  </PublicRoute>
                }
              ></Route>

              <Route
                path="register"
                element={
                  <PublicRoute restricted>
                    <SignUpPage />
                  </PublicRoute>
                }
              ></Route>

              <Route
                path="login"
                element={
                  <PublicRoute restricted>
                    <LoginPage />
                  </PublicRoute>
                }
              ></Route>

              <Route
                path="contacts"
                element={
                  <PrivateRoute>
                    <ContactsPage />
                  </PrivateRoute>
                }
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default App;
