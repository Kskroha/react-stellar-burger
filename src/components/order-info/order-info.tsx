import { FC, useEffect, useMemo } from "react";
import classNames from "classnames";
import OrderInfoStyles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { useLocation } from "react-router-dom";
import { getOrder } from "../../services/actions/order-details";

const OrderInfo: FC = () => {
  const location = useLocation();
  const number = location.pathname.split("/").slice(-1).join("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrder(number));
  }, [dispatch, number]);

  const ingredients: TIngredient[] = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const currentOrder = useAppSelector(
    (store) => store.orderDetails.currentOrder
  );

  const currentInredients = useMemo(() => {
    const orderIngredients: TIngredient[] = [];
    currentOrder.ingredients?.forEach((id) => {
      const newIngredient = ingredients.find(
        (item) => String(id) === String(item._id)
      ) as TIngredient;
      orderIngredients.push(newIngredient);
    });
    return orderIngredients;
  }, [currentOrder.ingredients, ingredients]);

  const countedIngredients: TIngredient[] = useMemo(
    () =>
      currentInredients.reduce((newArr: any[], item) => {
        const newItem = {
          ...item,
          count: 1,
        };
        if (newArr.some((el) => el.name === item?.name)) {
          const itemIndex: number = newArr.findIndex(
            (el) => el.name === item?.name
          );
          newArr[itemIndex] = {
            ...item,
            count: (newArr[itemIndex].count += 1),
          };
        } else {
          newArr.push(newItem as TIngredient);
        }
        return newArr;
      }, []),
    [currentInredients]
  );

  const countTotalPrice = (ingredients: TIngredient[]) =>
    ingredients.reduce((acc, item) => {
      let sum = 0;
      sum = acc + item.price * item.count!;
      return sum;
    }, 0) || 0;

  const getFormattedDate = () => {
    const dateFromServer = currentOrder?.createdAt;
    return <FormattedDate date={new Date(dateFromServer!)} />;
  };

  return (
    <div className={OrderInfoStyles.container} data-cy="order-modal">
      <span
        className={classNames(
          OrderInfoStyles.number,
          "text text_type_digits-default"
        )}
      >
        #{currentOrder?.number}
      </span>
      <h3
        className={classNames(
          OrderInfoStyles.title,
          "text text_type_main-medium"
        )}
      >
        {currentOrder?.name}
      </h3>
      <span
        className={classNames(
          OrderInfoStyles.status,
          "text text_type_main-default"
        )}
      >
        {currentOrder?.status === "done"
          ? "Выполнен"
          : currentOrder?.status === "pending"
          ? "Готовится"
          : currentOrder?.status === "created"
          ? "Создан"
          : "Выполнен"}
      </span>
      <div>
        <h3 className="text text_type_main-medium mb-6">Состав:</h3>
        <ul className={OrderInfoStyles.list}>
          {countedIngredients?.map((item) => {
            return (
              <li className={OrderInfoStyles.card} key={item._id}>
                <div
                  className={OrderInfoStyles.picture}
                  style={{ zIndex: 10 }}
                  key={currentOrder?._id}
                >
                  <img
                    className={OrderInfoStyles.image}
                    src={item?.image}
                    alt="Картинка игредиента."
                    width="112"
                    height="56"
                  />
                </div>
                <h4 className="text text_type_main-default">{item?.name}</h4>
                <div className={OrderInfoStyles.priceWrap}>
                  <span className="text text_type_digits-default">
                    {item.count}
                  </span>
                  <span className="text text_type_digits-default mr-2">
                    &nbsp;x&nbsp;{item?.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={OrderInfoStyles.totalPrice}>
        <span
          className={classNames(
            OrderInfoStyles.time,
            "text text_type_main-default text_color_inactive"
          )}
        >{getFormattedDate()}</span>
        <div className={OrderInfoStyles.price}>
          <span className="text text_type_digits-default">
            {countTotalPrice(countedIngredients)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
