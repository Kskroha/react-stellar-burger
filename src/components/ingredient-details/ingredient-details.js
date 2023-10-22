import React from "react";
import classNames from "classnames";
import IngredientDetailsStyles from "./ingedient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientDetails({ item }) {
  let { id } = useParams();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const linkItem =
    ingredients.length && ingredients.find((item) => item._id === id);
  const ingredient = item ? item : linkItem;

  return (
    <div className={IngredientDetailsStyles.content}>
      <span className={classNames(IngredientDetailsStyles.header, "text text_type_main-large mb-1 ml-10")}>Детали ингредиента</span>
      <img
        className={IngredientDetailsStyles.image}
        src={linkItem.image_large}
        alt="Картинка ингредиента"
      ></img>
      <span
        className={classNames(
          IngredientDetailsStyles.title,
          "text text_type_main-medium mb-8"
        )}
      >
        {ingredient.name}
      </span>
      <dl
        className={classNames(
          IngredientDetailsStyles.description,
          "text text_type_main-default"
        )}
      >
        <div>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </dd>
        </div>
        <div>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </dd>
        </div>
        <div>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </dd>
        </div>
        <div>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default IngredientDetails;
