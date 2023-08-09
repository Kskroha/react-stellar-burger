import classNames from "classnames";
import PropTypes from "prop-types";
import IngredientDetailsStyles from "./ingedient-details.module.css";

function IngredientDetails({ item }) {
  return (
    <div className={IngredientDetailsStyles.content}>
      <img
        className={IngredientDetailsStyles.image}
        src={item.image_large}
        alt="Картинка ингредиента"
      ></img>
      <span
        className={classNames(
          IngredientDetailsStyles.title,
          "text text_type_main-medium mb-8"
        )}
      >
        {item.name}
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
            {item.calories}
          </dd>
        </div>
        <div>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {item.proteins}
          </dd>
        </div>
        <div>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {item.fat}
          </dd>
        </div>
        <div>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {item.carbohydrates}
          </dd>
        </div>
      </dl>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IngredientDetails;
