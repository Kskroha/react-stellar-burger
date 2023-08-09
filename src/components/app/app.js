import React from "react";
import classNames from "classnames";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";

const URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = React.useState({
    ingredientsData: [],
    hasError: false,
    isLoading: false,
  });

  React.useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true });
    const getIngredientsData = () => {
      fetch(URL)
        .then((res) => res.json())
        .then((data) =>
          setState({
            ingredientsData: data.data,
            hasError: false,
            isLoading: false,
          })
        )
        .catch((e) => setState({ ...state, hasError: true, isLoading: false }));
    };

    getIngredientsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { ingredientsData } = state;
  return (
      <div className={appStyles.page}>
        <AppHeader />
        <main className={classNames(appStyles.main, "pl-5 pr-5 pt-10")}>
        <div className={appStyles.container}>
          <BurgerIngredients data={ingredientsData} />
          <BurgerConstructor data={ingredientsData} />
        </div>
        </main>
        <div id="modal"></div>
      </div>
  );
}

export default App;
