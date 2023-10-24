import { FC, useMemo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../services/hooks/hooks";
import IngredientElementStyles from "./ingredient-element.module.css";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../types/types";

interface IIngredientElement {
  item: TIngredient;
  id?: string;
  key: string;
}

const IngredientElement: FC<IIngredientElement> = ({ item }) => {
  let location = useLocation();
  const { image, name, price } = item;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { item },
  });

  const draggedItems = useAppSelector(
    (state) => state.burgerConstructor.draggedItems
  );
  const bun = useAppSelector((state) => state.burgerConstructor.bun);

  const currentItems = useMemo(
    () => draggedItems.filter((el) => el._id === item._id),
    [draggedItems, item]
  );

  return (
    <Link
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
      className={IngredientElementStyles.link}
    >
      <li ref={dragRef} className={IngredientElementStyles.card} key={item._id}>
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
          <CurrencyIcon type="primary" />
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
          <Counter
            count={currentItems.length}
            size="default"
            extraClass="m-1"
          />
        ) : null}
      </li>
    </Link>
  );
};

export default IngredientElement;
