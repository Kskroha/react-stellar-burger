import React, { useEffect } from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import classNames from "classnames";
import homeStyles from "./home.module.css";
import { wsFeedConnectionStart, wsFeedConnectionClosed } from "../services/actions/ws-feed";
import { useAppDispatch } from "../services/hooks/hooks";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsFeedConnectionStart());
    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

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
