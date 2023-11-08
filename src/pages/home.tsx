import React from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import classNames from "classnames";
import homeStyles from "./home.module.css";

export const HomePage = () => {
  return (
    <div>
      <main className={classNames(homeStyles.main, "pl-5 pr-5 pt-10")}>
        <DndProvider backend={HTML5Backend}>
          <div className={homeStyles.container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
    </div>
  );
};
