import React, { useEffect } from "react";
import classNames from "classnames";
import FormPageStyles from "./form.module.css";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { useLocation } from "react-router-dom";
import {
  wsOrdersConnectionClosed,
  wsOrdersConnectionStart,
} from "../services/actions/ws-orders";
import { TOrder } from "../types/types";
import OrderCard from "../components/order-card/order-card";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector((store) => store.wsOrder.orders);
  console.log(orders);
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
        {orders && orders.map((order) => {
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
