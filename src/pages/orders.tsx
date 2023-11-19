import React, { useEffect } from "react";
import classNames from "classnames";
import FormPageStyles from "./form.module.css";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import {
  wsOrdersConnectionClosed,
  wsOrdersConnectionStart,
} from "../services/actions/ws-orders";
import OrderCard from "../components/order-card/order-card";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((store) => store.wsOrder.orders);
  useEffect(() => {
    dispatch(wsOrdersConnectionStart());
    return () => {
      dispatch(wsOrdersConnectionClosed());
    };
  }, [dispatch]);
  return (
    <>
      <h2
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-medium mb-6"
        )}
      >
        {orders &&
          orders.slice().reverse().map((order) => {
            return (
              <OrderCard
                order={order}
                key={order._id}
                statusShown={true}
              ></OrderCard>
            );
          })}
      </h2>
    </>
  );
};
