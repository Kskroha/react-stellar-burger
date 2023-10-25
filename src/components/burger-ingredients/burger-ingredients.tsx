import React from "react";
import IngredientElement from "../ingredient-element/ingredient-element";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { useAppSelector } from "../../services/hooks/hooks";
import { TIngredient } from "../../types/types";

function BurgerIngredients() {
  const [choice, setChoice] = React.useState("");
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

  const pageRefs = React.useRef<any>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const scrollIntoView = (type: string) => {
    //@ts-ignore;
    pageRefs.current[type].scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setChoice(entry.target.id);
        }
      })
    }, {});

    Object.values(pageRefs.current).forEach((page: any) => {
      sectionObserver.observe(page);
    });
  }, [])

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
          className="text text_type_main-medium" id="buns"
        >
          Булки
        </h2>
        <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}>
          {buns.length &&
            buns.map((item: TIngredient) => (
              <IngredientElement item={item} key={item._id} />
            ))}
        </ul>
        <h2
          ref={(el) => (pageRefs.current ={ ...pageRefs.current, sauces: el })}
          className="text text_type_main-medium" id="sauces"
        >
          Соусы
        </h2>
        <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}>
          {sauces.length &&
            sauces.map((item: TIngredient) => (
              <IngredientElement item={item} id={item._id} key={item._id} />
            ))}
        </ul>
        <h2
          className="text text_type_main-medium" id="main"
          ref={(el) => (pageRefs.current = { ...pageRefs.current, main: el })}
        >
          Начинки
        </h2>
        <ul className={classNames(BurgerIngredientsStyles.list, "pt-6 pb-15")}>
          {mains.length &&
            mains.map((item: TIngredient) => (
              <IngredientElement item={item} id={item._id} key={item._id} />
            ))}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
