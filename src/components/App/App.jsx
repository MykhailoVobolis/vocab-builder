import { Toaster } from "react-hot-toast";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import { refreshUser } from "../../redux/auth/operations.js";
import PrivateRoute from "../PrivateRoute.jsx";
import RestrictedRoute from "../RestrictedRoute.jsx";

const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage.jsx"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const DictionaryPage = lazy(() => import("../../pages/DictionaryPage/DictionaryPage.jsx"));
const RecommendPage = lazy(() => import("../../pages/RecommendPage/RecommendPage.jsx"));
const TrainingPage = lazy(() => import("../../pages/TrainingPage/TrainingPage.jsx"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user please wait...</p>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<RestrictedRoute component={<HomePage />} redirectTo="/dictionary" />} />
        <Route path="register" element={<RestrictedRoute component={<RegisterPage />} redirectTo="/dictionary" />} />
        <Route path="login" element={<RestrictedRoute component={<LoginPage />} redirectTo="/dictionary" />} />
        <Route path="/dictionary" element={<PrivateRoute component={<DictionaryPage />} redirectTo="/" />} />
        <Route path="/recommend" element={<PrivateRoute component={<RecommendPage />} redirectTo="/" />} />
        <Route path="/training" element={<PrivateRoute component={<TrainingPage />} redirectTo="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" containerStyle={{ zIndex: 999999 }} />
    </Layout>
  );
}
