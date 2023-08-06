import React, { useEffect } from 'react';
import classNames from 'classnames';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = React.useState({
    ingredientsData: [],
    hasError: false,
    isLoading: false
  });
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    setState({...state, hasError: false, isLoading: true})
    const getIngredientsData = () => {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => setState({ingredientsData: data.data, hasError: false, isLoading: false}))
        .catch((e) => setState({...state, hasError: true, isLoading: false}))
    }

    getIngredientsData();
  }, []);

  React.useEffect(() => {
    countTotal();
  });

  const updateCart = (cartData) => {
    setCart(cartData);
  }

  const countTotal = () => {
    if (cart.length) {
      const totalVal = cart.reduce((result, item) => {
        const newResult = result + (item.price * item.count);
        return newResult;
      }, 0);
      setTotal(totalVal);
    }
  }

  const { ingredientsData } = state;
  return (
    <>
      <div className={appStyles.page}>
        <div className={appStyles.container}>
          <AppHeader />
          <main className={classNames(appStyles.main, "pl-5 pr-5 pt-10")}>
            <BurgerIngredients data={ingredientsData} updateCart={updateCart}/>
            <BurgerConstructor data={cart} total={total}/>
          </main>
        </div>
        <div id="modal"></div>
      </div>
    </>
  );
}

export default App;
