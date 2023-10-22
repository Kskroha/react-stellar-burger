import React from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { sendOrder } from "../../services/actions/order-details";
import {
  ADD_ITEM,
  CLEAN_CONSTRUCTOR,
} from "../../services/actions/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { PuffLoader } from "react-spinners";
import { RootState } from "../../services/reducers";
import { AppDispatch } from "../..";
import { TIngredient } from "../../types/types";

function BurgerConstructor() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const draggedItems: any[] = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const bun: TIngredient = useSelector((state: RootState) => state.burgerConstructor);
  const { orderRequest, isOpen, orderNumber } = useSelector(
    (state: RootState) => state.orderDetails
  );
  const user = useSelector((state: RootState) => state.user.user);

  React.useEffect(() => {
    if (orderNumber !== 0) {
      dispatch({
        type: CLEAN_CONSTRUCTOR,
      });
    }
  }, [orderNumber, dispatch]);

  const countTotal = React.useMemo(() => {
    const bunsPrice = bun.price * 2 || 0;
    const itemsPrice =
      draggedItems.reduce((acc: any, item: { price: any; }) => {
        let sum = 0;
        sum = acc + item.price;
        return sum;
      }, 0) || 0;
    return bunsPrice ?? 0 + itemsPrice ?? 0;
  }, [bun, draggedItems]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: any) {
      dispatch({
        type: ADD_ITEM,
        payload: {
          ...item,
          uniqueId: uuidv4(),
        },
      });
    },
  });

  const disabled = React.useMemo(() => {
    return Object.keys(bun).length && draggedItems.length ? null : true;
  }, [bun, draggedItems]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      return dispatch(sendOrder([...draggedItems, bun]));
    }
    navigate("/login");
  };

  return (
    <section ref={dropTarget}>
      <form action="#" method="post" onSubmit={(e) => handleSubmit(e)}>
        <div
          className={classNames(
            BurgerConstructorStyles.container,
            "mt-15 mb-10"
          )}
        >
          {Object.keys(bun).length ? (
            <ConstructorItem item={bun} text="верх" type="top" />
          ) : (
            <p className="text text_type_main-default">
              Перетащите сюда булку, чтобы начать
            </p>
          )}
          <div
            className={BurgerConstructorStyles.constructor as unknown as string}
          >
            {draggedItems &&
              draggedItems.map((item: any, index: number) => (
                <ConstructorItem
                  key={item.uniqueId}
                  item={item}
                  index={index}
                  id={item._id}               />
              ))}
          </div>
          {Object.keys(bun).length ? (
            <ConstructorItem item={bun} text="низ" type="bottom" />
          ) : null}
        </div>
        <div className={BurgerConstructorStyles.total}>
          <div className={BurgerConstructorStyles.price}>
            <span className="text text_type_digits-medium pr-2">
              {countTotal}
            </span>
            <CurrencyIcon
              type="primary"
            />
          </div>
          <button
            disabled={disabled!}
            className={classNames(
              BurgerConstructorStyles.submit,
              "pt-5 pb-5 pr-10 pl-10"
            )}
            type="submit"
          >
            <span className="text text_type_main-default">Оформить заказ</span>
          </button>
        </div>
      </form>
      {orderRequest && (
        <div className={BurgerConstructorStyles.loader}><PuffLoader size={130} color="#ffffff" loading /></div>
      )}
      {isOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;