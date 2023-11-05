import { FC, useMemo } from "react";
import classNames from "classnames";
import OrderCardStyles from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TOrder } from "../../types/types";
import { useAppSelector } from "../../services/hooks/hooks";

interface IOrderCard {
  order: TOrder;
  statusShown: boolean;
}

const OrderCard: FC<IOrderCard> = ({ order, statusShown }) => {
  const { number, createdAt, name } = order;

  const ingredients: TIngredient[] = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const maxInregientsLength = 5;

  const orderIngredients = useMemo(
    () =>
      order?.ingredients.map((id) =>
        ingredients?.find((item) => id === item._id)
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
  return (
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
        <span className={OrderCardStyles.status}>
          {order.status === "done"
            ? "Выполнен"
            : order.status === "pending"
            ? "Готовится"
            : order.status === "created"
            ? "Создан"
            : "Выполнен"}
        </span>
      )}
      <div className={OrderCardStyles.pictures}>
        {orderIngredients.length < maxInregientsLength
          ? Array.from(new Set(orderIngredients)).map((item, index) => (
              <div
                className={OrderCardStyles.picture}
                style={{ zIndex: 10 + index }}
                key={item?._id}
              >
                <img
                  className={OrderCardStyles.image}
                  src={item?.image}
                  alt="Картинка игредиента."
                  width="112"
                  height="56"
                />
              </div>
            ))
          : Array.from(new Set(orderIngredients))
              .slice(0, maxInregientsLength + 1)
              .map((item, index) => {
                if (index === maxInregientsLength) {
                  return (
                    <>
                      <div
                        className={OrderCardStyles.picture}
                        style={{ zIndex: 10 + index }}
                        key={item?._id}
                      >
                        <img
                          className={OrderCardStyles.last}
                          src={item?.image}
                          alt="Картинка игредиента."
                          width="112"
                          height="56"
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
                              maxInregientsLength
                            ).length
                          }
                        </span>
                      </div>
                    </>
                  );
                }
                return (
                  <div
                    className={OrderCardStyles.picture}
                    style={{ zIndex: 10 + index }}
                  >
                    <img
                      className={OrderCardStyles.image}
                      src={item?.image}
                      alt="Картинка игредиента."
                      width="112"
                      height="56"
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
  );
};

export default OrderCard;
