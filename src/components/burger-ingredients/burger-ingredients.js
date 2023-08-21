import React from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientElement from "../ingredient-element/ingredient-element";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from "../../services/actions/ingredient-details";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  const [choice, setChoice] = React.useState("buns");
  const dispatch = useDispatch();

  const currentPreview = useSelector(
    (state) => state.ingredientDetails.currentPreview
  );
  const isOpen = useSelector((state) => state.ingredientDetails.isOpen);

  const handleClick = React.useCallback(
    (item) => {
      return dispatch({ type: OPEN_MODAL, item });
    },
    [dispatch]
  );

  const onClose = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  const buns = React.useMemo(
    () => data.filter((item) => item.type === "bun"),
    [data]
  );
  const sauces = React.useMemo(
    () => data.filter((item) => item.type === "sauce"),
    [data]
  );
  const mains = React.useMemo(
    () => data.filter((item) => item.type === "main"),
    [data]
  );

  const pageRefs = React.useRef({});
  const menuRef = React.useRef();

  React.useEffect(() => {
    menuRef.current.addEventListener("scroll", () => {
      if (menuRef.current.scrollTop < 250) {
        setChoice("buns");
      }
      if (menuRef.current.scrollTop > 250 &&  menuRef.current.scrollTop < 800) {
        setChoice("sauces")
      }
      if (menuRef.current.scrollTop > 800) {
        setChoice("main")
      }
    });
  }, []);

  const scrollIntoView = (type) => {
    pageRefs.current[type].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab
          value="buns"
          active={choice === "buns"}
          onClick={() => {
            setChoice("buns");
            scrollIntoView("buns");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={choice === "sauces"}
          onClick={() => {
            setChoice("sauces");
            scrollIntoView("sauces");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={choice === "main"}
          onClick={() => {
            setChoice("main");
            scrollIntoView("main");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={BurgerIngredientsStyles.menu} ref={menuRef}>
        <h2
          ref={(el) => (pageRefs.current = { ...pageRefs.current, buns: el })}
          className="text text_type_main-medium"
        >
          Булки
        </h2>
        <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}>
          {buns.length &&
            buns.map((item) => (
              <IngredientElement
                item={item}
                handleClick={handleClick}
                id={item._id}
                key={item._id}
              />
            ))}
        </ul>
        <h2
          ref={(el) => (pageRefs.current = { ...pageRefs.current, sauces: el })}
          className="text text_type_main-medium"
        >
          Соусы
        </h2>
        <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}>
          {sauces.length &&
            sauces.map((item) => (
              <IngredientElement
                item={item}
                handleClick={handleClick}
                id={item._id}
                key={item._id}
              />
            ))}
        </ul>
        <h2
          className="text text_type_main-medium"
          ref={(el) => (pageRefs.current = { ...pageRefs.current, main: el })}
        >
          Начинки
        </h2>
        <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}>
          {mains.length &&
            mains.map((item) => (
              <IngredientElement
                item={item}
                handleClick={handleClick}
                id={item._id}
                key={item._id}
              />
            ))}
        </ul>
      </div>
      {isOpen && (
        <Modal onClose={onClose} header="Детали ингредиента">
          <IngredientDetails item={currentPreview} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngredients;
