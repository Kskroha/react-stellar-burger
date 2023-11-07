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
import { useAppDispatch } from "../../services/hooks/hooks";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from "../../services/actions/user";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useNavigate } from "react-router-dom";
import { OrdersPage } from "../../pages/orders";
import Feed from "../../pages/feed";
import OrderInfo from "../order-info/order-info";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  });

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
  const location = useLocation();
  const background = location.state && location.state.background;

  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={appStyles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
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
          <Route path="orders" element={<OrdersPage />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={<OnlyAuth component={<OrderInfo />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal handleClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal handleClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="profile/orders/:id"
            element={
              <Modal handleClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
