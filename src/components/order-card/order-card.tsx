import { FC, useMemo } from "react";
import classNames from "classnames";
import OrderCardStyles from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TOrder } from "../../types/types";
import { useAppSelector } from "../../services/hooks/hooks";
import { Link, useLocation } from "react-router-dom";

interface IOrderCard {
  order: TOrder;
  statusShown: boolean;
}

const OrderCard: FC<IOrderCard> = ({ order, statusShown }) => {
  const { number, createdAt, name } = order;
  const location = useLocation();
  const path = location.pathname;
  const ingredients: TIngredient[] = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const maxIngredientsLength = 5;

  const orderIngredients = useMemo(
    () =>
      order?.ingredients.map((id) =>
        ingredients?.find((item) => String(id) === String(item._id))
      ),
    [order.ingredients, ingredients]
  );

  const countTotalPrice = (ingredients: TIngredient[]) =>
    ingredients.reduce((acc, item) => {
      let sum = 0;
      sum = acc + item.price;
      return sum;
    }, 0) || 0;

  const getFormattedDate = () => {
    const dateFromServer = createdAt;
    return <FormattedDate date={new Date(dateFromServer)} />;
  };

  const showOrderStatus = (status: string) => {
    switch (status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
      default:
        return "Выполнен";
    }
  };

  return (
    <Link
      to={`${path}/${order.number}`}
      className={OrderCardStyles.link}
      state={{ background: location }}
      key={order?._id}
    >
      <div className={OrderCardStyles.container}>
        <span
          className={classNames(
            OrderCardStyles.number,
            "mb-6 text text_type_digits-default"
          )}
        >
          #{number}
        </span>
        <h3
          className={classNames(
            OrderCardStyles.title,
            "mb-2 text text_type_main-medium"
          )}
        >
          {name}
        </h3>
        {statusShown && (
          <span
            className={classNames(
              OrderCardStyles.status,
              "text text_type_main-default"
            )}
          >
            {showOrderStatus(order.status)}
          </span>
        )}
        <div className={OrderCardStyles.pictures}>
          {orderIngredients.length < maxIngredientsLength
            ? Array.from(new Set(orderIngredients)).map((item, index) => (
                <div
                  key={item?._id}
                  className={OrderCardStyles.picture}
                  style={{ zIndex: 1000 - index }}
                >
                  <img
                    className={OrderCardStyles.image}
                    src={item?.image}
                    alt="Картинка игредиента."
                    width="112"
                    height="56"
                    loading="lazy"
                  />
                </div>
              ))
            : Array.from(new Set(orderIngredients))
                .slice(0, maxIngredientsLength + 1)
                .map((item, index) => {
                  if (index === maxIngredientsLength) {
                    return (
                      <div
                        key={item?._id}
                        className={OrderCardStyles.picture}
                        style={{ zIndex: 1000 - index }}
                      >
                        <img
                          className={OrderCardStyles.last}
                          src={item?.image}
                          alt="Картинка игредиента."
                          width="112"
                          height="56"
                          loading="lazy"
                        />
                        <span
                          className={classNames(
                            OrderCardStyles.count,
                            "text text_type_digits-default"
                          )}
                        >
                          +{" "}
                          {
                            Array.from(new Set(orderIngredients)).slice(
                              maxIngredientsLength
                            ).length
                          }
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div
                      className={OrderCardStyles.picture}
                      style={{ zIndex: 1000 - index }}
                      key={item?._id}
                    >
                      <img
                        className={OrderCardStyles.image}
                        src={item?.image}
                        alt="Картинка игредиента."
                        width="112"
                        height="56"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
        </div>
        <span
          className={classNames(
            OrderCardStyles.time,
            "text text_type_main-default text_color_inactive"
          )}
        >
          {getFormattedDate()}
        </span>
        <div className={OrderCardStyles.price}>
          <span className="text text_type_digits-default mb-2">
            {countTotalPrice(orderIngredients as TIngredient[])}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
