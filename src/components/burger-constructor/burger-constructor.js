import React from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { sendOrder } from "../../services/actions/order-details";
import { ADD_ITEM } from "../../services/actions/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draggedItems = useSelector(
    (state) => state.burgerConstructor.draggedItems
  );
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const isOpen = useSelector((state) => state.orderDetails.isOpen);
  const user = useSelector((state) => state.user.user);

  const countTotal = React.useMemo(() => {
    const bunsPrice = bun.price * 2 || 0;
    const itemsPrice =
      draggedItems.reduce((acc, item) => {
        let sum = 0;
        sum = acc + item.price;
        return sum;
      }, 0) || 0;
    return bunsPrice + itemsPrice;
  }, [bun, draggedItems]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type: ADD_ITEM,
        ...item,
      });
    },
  });

  const disabled = React.useMemo(() => {
    return Object.keys(bun).length && draggedItems.length ? null : true;
  }, [bun, draggedItems]);

  const handleSubmit = (e) => {
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
            className={classNames(
              BurgerConstructorStyles.constructor,
              "mt-4 mb-4"
            )}
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
            <CurrencyIcon
              className={classNames(BurgerConstructorStyles.icon, "pr-10")}
              type="primary"
              width="24"
              height="24"
            />
          </div>
          <button
            disabled={disabled}
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
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
