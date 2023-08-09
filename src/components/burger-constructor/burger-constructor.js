import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ConstructorItem from "../constructor-item/constructor-item";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ data }) {
  const [items, setItems] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    const newItems = sortData(data);
    setItems(newItems);
  }, [data]);

  const sortData = (data) => {
    if (data) {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (a.type === "bun") {
          return -1;
        } else {
          return 1;
        }
      });
      return sortedData;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <section>
      <form action="#" method="post" onSubmit={handleSubmit}>
        <div
          className={classNames(
            BurgerConstructorStyles.constructor,
            "mt-15 mb-10"
          )}
        >
          {items &&
            items.map((item) => <ConstructorItem {...item} key={item._id} />)}
        </div>
        <div className={BurgerConstructorStyles.total}>
          <div className={BurgerConstructorStyles.price}>
            <span className="text text_type_digits-medium pr-2">610</span>
            <CurrencyIcon
              className={classNames(BurgerConstructorStyles.icon, "pr-10")}
              type="primary"
              width="24"
              height="24"
            />
          </div>
          <button
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;
