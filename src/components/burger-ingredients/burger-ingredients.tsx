import React from "react";
import IngredientElement from "../ingredient-element/ingredient-element";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { useAppSelector } from "../../services/hooks/hooks";
import { TIngredient } from "../../types/types";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const buns = React.useMemo(
    () => ingredients.filter((item: { type: string }) => item.type === "bun"),
    [ingredients]
  );
  const sauces = React.useMemo(
    () => ingredients.filter((item: { type: string }) => item.type === "sauce"),
    [ingredients]
  );
  const mains = React.useMemo(
    () => ingredients.filter((item: { type: string }) => item.type === "main"),
    [ingredients]
  );
  const [current, setCurrent] = React.useState<string>("");
  const [bunRef, bunInView] = useInView();
  const [sauceRef, sauceInView] = useInView();
  const [mainRef, mainInView] = useInView();

  const clickTab = (type: string) => {
    setCurrent(type);
    const section = document.getElementById(type) as HTMLElement;
    section.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    const handleIngredientScroll = () => {
      switch (true) {
        case bunInView:
          setCurrent("buns");
          break;
        case sauceInView:
          setCurrent("sauces");
          break;
        case mainInView:
          setCurrent("main");
          break;
        default:
          break;
      }
    };
    handleIngredientScroll();
  },
  [bunInView, sauceInView, mainInView]);


  const menuRef = React.useRef<HTMLDivElement>(null);

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => {
            clickTab("buns");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={() => {
            clickTab("sauces");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => {
            clickTab("main");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={BurgerIngredientsStyles.menu} ref={menuRef}>
        <div id="buns" ref={bunRef}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul
            className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}
          >
            {buns.length &&
              buns.map((item: TIngredient) => (
                <IngredientElement item={item} key={item._id} />
              ))}
          </ul>
        </div>
        <div id="sauces" ref={sauceRef}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul
            className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}
          >
            {sauces.length &&
              sauces.map((item: TIngredient) => (
                <IngredientElement item={item} id={item._id} key={item._id} />
              ))}
          </ul>
        </div>
        <div id="main" ref={mainRef}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul
            className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}
          >
            {mains.length &&
              mains.map((item: TIngredient) => (
                <IngredientElement item={item} id={item._id} key={item._id} />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
