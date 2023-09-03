import React from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
} from "../../pages/index";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from "../../services/actions/user";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div className={appStyles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route path="orders" />
          <Route path="orders/:id" />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
