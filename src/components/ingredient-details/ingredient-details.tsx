import { FC } from "react";
import classNames from "classnames";
import IngredientDetailsStyles from "./ingedient-details.module.css";
import { useAppSelector } from "../../services/hooks/hooks";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../types/types";

interface IIngredientDetails {
  item?: TIngredient;
}

const IngredientDetails: FC<IIngredientDetails> = ({ item }) => {
  const { id } = useParams();
  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const ingredient =
    item ??
    (ingredients.length &&
      ingredients.find((item: { _id: string | undefined }) => item._id === id)) as TIngredient;

  return (
    <div className={IngredientDetailsStyles.content} data-cy="ingredient-modal">
      <span
        className={classNames(
          IngredientDetailsStyles.header,
          "text text_type_main-large mb-1 ml-10"
        )}
      >
        Детали ингредиента
      </span>
      <img
        className={IngredientDetailsStyles.image}
        src={ingredient.image_large}
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
};

export default IngredientDetails;
