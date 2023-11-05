import { useEffect, FC } from "react";

import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import {
  wsFeedConnectionStart,
  wsFeedConnectionClosed,
} from "../services/actions/ws-feed";
import FeedStyles from "./feed.module.css";
import { Link, useLocation } from "react-router-dom";
import OrderCard from "../components/order-card/order-card";
import { OrderStat } from "../components/order-stat/order-stat";

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsFeedConnectionStart());
    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  // const location = useLocation();
  const { orders } = useAppSelector((store) => store.wsFeed);

  return (
    <section className={FeedStyles.page}>
      <h2 className="text_type_main-large pl-3 pt-5 pb-5">Лента заказов</h2>
      <div className={FeedStyles.container}>
        <div className={FeedStyles.orderList}>
          {orders &&
            orders.map((order) => {
              return (
                <Link
                  to={{
                    pathname: `${location.pathname}/${order._id}`,
                    // state: { background: location },
                  }}
                  className={FeedStyles.link}
                  key={order._id}
                >
                  <OrderCard order={order} statusShown={false} />
                </Link>
              );
            })}
        </div>
        <OrderStat></OrderStat>
      </div>
    </section>
  );
};

export default Feed;
