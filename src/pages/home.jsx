import React from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/burger-ingredients";
import homeStyles from "./home.module.css";

export const HomePage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div>
      <main className={classNames(homeStyles.main, "pl-5 pr-5 pt-10")}>
        <DndProvider backend={HTML5Backend}>
          <div className={homeStyles.container}>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
      <div id="modal"></div>
    </div>
  );
};
