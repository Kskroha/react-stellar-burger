import React from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ConstructorItem from "../constructor-item/constructor-item";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import BurgerConstructorStyles from "./burger-constructor.module.css";

import { useDrop } from "react-dnd";
import { sendOrder } from "../../services/actions/order-details";

// import update from 'immutability-helper'
import { ADD_ITEM } from "../../services/actions/burger-constructor";
import { CLOSE_MODAL } from "../../services/actions/order-details";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const draggedItems = useSelector(
    (state) => state.burgerConstructor.draggedItems
  );
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const totalPrice = useSelector((state) => state.burgerConstructor.totalPrice);
  const isOpen = useSelector((state) => state.orderDetails.isOpen);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type: ADD_ITEM,
        ...item,
      });
    },
  });

  const itemId = React.useId();
  const buttonRef = React.useRef();

  React.useEffect(() => {
    if (Object.keys(bun).length && draggedItems.length) {
      buttonRef.current.removeAttribute("disabled");
    } else {
      buttonRef.current.disabled = "true";
    }
  }, [bun, draggedItems]);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      return dispatch(sendOrder([...draggedItems, bun]));
    },
    [dispatch, bun, draggedItems]
  );

  const onClose = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
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
            className={classNames(
              BurgerConstructorStyles.constructor,
              "mt-4 mb-4"
            )}
          >
            {draggedItems &&
              draggedItems.map((item, index) => (
                <ConstructorItem
                  item={item}
                  index={index}
                  id={item._id}
                  key={itemId}
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
              {totalPrice ? totalPrice : 0}
            </span>
            <CurrencyIcon
              className={classNames(BurgerConstructorStyles.icon, "pr-10")}
              type="primary"
              width="24"
              height="24"
            />
          </div>
          <button
            ref={buttonRef}
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
      {isOpen && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
