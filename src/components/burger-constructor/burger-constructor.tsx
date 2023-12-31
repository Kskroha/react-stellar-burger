import React from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { sendOrder } from "../../services/actions/order-details";
import { ADD_ITEM, CLEAN_CONSTRUCTOR } from "../../services/constants/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { PuffLoader } from "react-spinners";
import { useAppSelector, useAppDispatch } from "../../services/hooks/hooks";
import { TIngredient } from "../../types/types";

function BurgerConstructor() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draggedItems: Array<TIngredient> = useAppSelector(
    (state) => state.burgerConstructor.draggedItems
  );
  const bun: TIngredient = useAppSelector((state) => state.burgerConstructor.bun);
  const orderRequest = useAppSelector(
    (state) => state.orderDetails.orderRequest
  );
  const isOpen = useAppSelector(
    (state) => state.orderDetails.isOpen
  );
  const orderNumber = useAppSelector(
    (state) => state.orderDetails.orderNumber
  );

  const user = useAppSelector((state) => state.user["user"]);

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
      draggedItems.reduce((acc, item) => {
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
    <section ref={dropTarget} data-cy="constructor">
      <form action="#" method="post" onSubmit={(e) => handleSubmit(e)}>
        <div className={BurgerConstructorStyles.container}>
          {Object.keys(bun).length ? (
            <ConstructorItem item={bun} text="верх" type="top" />
          ) : (
            <p className="text text_type_main-default">
              Перетащите сюда булку, чтобы начать
            </p>
          )}
          <div
            className={BurgerConstructorStyles.constructor as unknown as string}
            data-cy="constructor-items"
          >
            {draggedItems &&
              draggedItems.map((item, index) => (
                <ConstructorItem
                  key={item.uniqueId}
                  item={item}
                  index={index}
                  id={item._id}
                />
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
            <CurrencyIcon type="primary" />
          </div>
          <button
            disabled={disabled!}
            className={BurgerConstructorStyles.submit}
            type="submit"
            data-cy="order-button"
          >
            <span className="text text_type_main-default">Оформить заказ</span>
          </button>
        </div>
      </form>
      {orderRequest && (
        <div className={BurgerConstructorStyles.loader}>
          <PuffLoader size={130} color="#ffffff" loading />
        </div>
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
