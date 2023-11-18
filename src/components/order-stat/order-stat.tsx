import classNames from "classnames";
import { FC, useMemo } from "react";
import OrderStatStyles from "./order-stat.module.css";
import { useAppSelector } from "../../services/hooks/hooks";

export const OrderStat: FC = () => {
  const orders = useAppSelector((store) => store.wsFeed.orders);
  const total = useAppSelector((store) => store.wsFeed.total);
  const totalToday = useAppSelector((store) => store.wsFeed.totalToday);

  const readyOrders = useMemo(() => {
    return orders.filter((order) => order.status === "done");
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((order) => order.status ===  "pending");
  }, [orders]);

  return (
    <div>
      <div className={OrderStatStyles.upperBlock}>
        <div className={OrderStatStyles.ready}>
          <h4 className={classNames(OrderStatStyles.title, "text text_type_main-medium")}>Готовы:</h4>
          <ul className={OrderStatStyles.orderList}>
            {readyOrders.slice(0,20).map((order) => (
              <li key={order._id} className="text text_type_digits-default">{order.number}</li>
            ))}
          </ul>
        </div>
        <div className={OrderStatStyles.column}>
          <h4 className={classNames(OrderStatStyles.title, "text text_type_main-medium")}>В работе:</h4>
          <ul className={OrderStatStyles.orderList}>
            {pendingOrders.map((order) => (
              <li key={order._id} className="text text_type_digits-default">{order.number}</li>
            ))}
          </ul>
        </div>
      </div>
      <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
      <span
        className={classNames(
          OrderStatStyles.allOrders,
          "text text_type_digits-large"
        )}
      >
        {total}
      </span>
      <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
      <span
        className={classNames(
          OrderStatStyles.dailyOrders,
          "text text_type_digits-large"
        )}
      >
        {totalToday}
      </span>
    </div>
  );
};
