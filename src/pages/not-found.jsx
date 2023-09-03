import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import classNames from "classnames";
import NotFoundPageStyles from "./not-found.module.css";

export const NotFoundPage = () => {
  return (
    <div className={NotFoundPageStyles.container}>
      <span className={classNames(NotFoundPageStyles.span, "text text_type_main-large mb-20")}>Страница не найдена</span>
      <Link to="/">
        <Button htmlType="button" type="primary" size="medium">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
};
