import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { COUNT_TOTAL } from "../../services/actions/burger-constructor";
import { getIngredients } from "../../services/actions/burger-ingredients";
import appStyles from "./app.module.css";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const draggedItems = useSelector(
    (state) => state.burgerConstructor.draggedItems
  );
  const bun = useSelector((state) => state.burgerConstructor.bun);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch({ type: COUNT_TOTAL });
  }, [dispatch, draggedItems, bun]);

  return (
    <div className={appStyles.page}>
      <AppHeader />
      <main className={classNames(appStyles.main, "pl-5 pr-5 pt-10")}>
        <DndProvider backend={HTML5Backend}>
          <div className={appStyles.container}>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
      <div id="modal"></div>
    </div>
  );
}

export default App;
