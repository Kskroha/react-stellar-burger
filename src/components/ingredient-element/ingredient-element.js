import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import IngredientElementStyles from "./ingredient-element.module.css";

function IngredientElement({ item, handleClick }) {
  const { image, name, price } = item;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { item },
  });

  const draggedItems = useSelector(
    (state) => state.burgerConstructor.draggedItems
  );
  const bun = useSelector((state) => state.burgerConstructor.bun);

  const currentItems = React.useMemo(
    () => draggedItems.filter((el) => el._id === item._id),
    [draggedItems, item]
  );

  return (
    <li
      ref={dragRef}
      className={IngredientElementStyles.card}
      onClick={() => handleClick(item)}
    >
      <img
        className={classNames(IngredientElementStyles.image, "mb-2")}
        src={image}
        alt={name}
        width="240"
        height="120"
      ></img>
      <div className={classNames(IngredientElementStyles.pricewrap, "mb-2")}>
        <span
          className={classNames(
            IngredientElementStyles.price,
            "text text_type_digits-default"
          )}
        >
          {price}
        </span>
        <CurrencyIcon className={IngredientElementStyles.icon} type="primary" />
      </div>
      <h3
        className={classNames(
          IngredientElementStyles.title,
          "text text_type_main-default"
        )}
      >
        {name}
      </h3>
      {item.type === "bun" && bun._id === item._id ? (
        <Counter count={1} size="default" extraClass="m-1" />
      ) : null}
      {currentItems.length && item.type !== "bun" ? (
        <Counter count={currentItems.length} size="default" extraClass="m-1" />
      ) : null}
    </li>
  );
}

IngredientElement.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default IngredientElement;
