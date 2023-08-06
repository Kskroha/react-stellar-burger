import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerIngredients({data, updateCart}) {
  const [current, setCurrent] = React.useState('one');
  const [cart, setCart] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);
  const [currentIng, setCurrentIng] = React.useState({});

  React.useEffect(() => {
    updateCart(cart);
  });

  const updateProduct = (product) => {
    const currentProduct = cart.findIndex(
        (p) => p._id === product._id
    );

    const currentPr = cart.find(
      (p) => p._id === product._id
    );

    if (currentProduct === -1) {
      const newCart = [...cart];
      const newProduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type,
        count: 1
      };
      newCart.push(newProduct);
      setCart(newCart);
    }

    if (currentProduct !== -1) {
      const newCart = [...cart];
      newCart[currentProduct] = {
        ...currentPr,
        count: currentPr.count + 1
      };
      setCart(newCart);
    }
  };

  const handleClick = (item) => {
    setOpen(true);
    setCurrentIng(item);
  }

  const onClose = () => {
    setOpen(false);
  }

  const buns = React.useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
  const sauces = React.useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);
  const mains = React.useMemo(() => data.filter((item) => item.type === 'main'), [data]);

  return (
      <section>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className="mb-10" style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            <a className={BurgerIngredientsStyles.link} href="#buns">Булки</a>
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            <a className={BurgerIngredientsStyles.link} href="#sauces">Соусы</a>
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            <a className={BurgerIngredientsStyles.link} href="#mains">Начинки</a>
          </Tab>
        </div>
        <div className={BurgerIngredientsStyles.menu}>
          <h2 id="buns" className="text text_type_main-medium">Булки</h2>
            <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-6")}>
              {buns.length && buns.map((item) => (
                <li className={classNames(BurgerIngredientsStyles.card, "pl-4 pr-4 pb-6")} onClick={()=> handleClick(item)} id={item._id} key={item._id}>
                <img className={classNames(BurgerIngredientsStyles.image, "pb-2")} src={item.image} alt={item.name} width="240" height="120"></img>
                <div className={classNames(BurgerIngredientsStyles.pricewrap, "pb-2")}>
                  <span className={classNames(BurgerIngredientsStyles.price, "text text_type_digits-default")}>{item.price}</span>
                  <CurrencyIcon className={BurgerIngredientsStyles.icon} type="primary" />
                </div>
                <h3 className={classNames(BurgerIngredientsStyles.title, "text text_type_main-small")}>{item.name}</h3>
                <Counter count={0} size="default" extraClass="m-1" />
              </li>))}
            </ul>
          <h2 id="sauces" className="text text_type_main-medium">Соусы</h2>
          <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-6")}>
              {sauces.length && sauces.map((item) => (
                <li className={classNames(BurgerIngredientsStyles.card, "pl-4 pr-4 pb-6")} onClick={()=> handleClick(item)} id={item._id} key={item._id}>
                <img className={classNames(BurgerIngredientsStyles.image, "pb-2")} src={item.image} alt={item.name} width="240" height="120"></img>
                <div className={classNames(BurgerIngredientsStyles.pricewrap, "pb-2")}>
                  <span className={classNames(BurgerIngredientsStyles.price, "text text_type_digits-default")}>{item.price}</span>
                  <CurrencyIcon className={BurgerIngredientsStyles.icon} type="primary" />
                </div>
                <h3 className={classNames(BurgerIngredientsStyles.title, "text text_type_main-small")}>{item.name}</h3>
                <Counter count={0} size="default" extraClass="m-1" />
              </li>))}
            </ul>
          <h2 id="mains" className="text text_type_main-medium">Начинки</h2>
          <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-6")}>
              {mains.length && mains.map((item) => (
                <li className={classNames(BurgerIngredientsStyles.card, "pl-4 pr-4 pb-6")} id={item._id} onClick={()=> handleClick(item)} key={item._id}>
                <img className={classNames(BurgerIngredientsStyles.image, "pb-2")} src={item.image} alt={item.name} width="240" height="120"></img>
                <div className={classNames(BurgerIngredientsStyles.pricewrap, "pb-2")}>
                  <span className={classNames(BurgerIngredientsStyles.price, "text text_type_digits-default")}>{item.price}</span>
                  <CurrencyIcon className={BurgerIngredientsStyles.icon} type="primary" />
                </div>
                <h3 className={classNames(BurgerIngredientsStyles.title, "text text_type_main-small")}>{item.name}</h3>
                <Counter count={0} size="default" extraClass="m-1" />
              </li>))}
            </ul>
        </div>
        {isOpen &&
          <Modal onClose={onClose} header="Детали ингредиента">
            <IngredientDetails item={currentIng}/>
          </Modal>
        }
      </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateCart: PropTypes.func
};

export default BurgerIngredients;
