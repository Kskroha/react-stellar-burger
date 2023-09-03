import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import FormPageStyles from "./form.module.css";
import { Link } from "react-router-dom";
import { userLogin } from "../services/actions/user";
import { useDispatch } from "react-redux";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(userLogin(formValue));
  };

  return (
    <div className={FormPageStyles.container}>
      <h2
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-medium mb-6"
        )}
      >
        Вход
      </h2>
      <form className={FormPageStyles.form} onSubmit={(e) => handleSubmit(e)}>
        <EmailInput
          onChange={onChange}
          value={formValue.email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={formValue.password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <p
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-default text_color_inactive mb-4 mr-2"
        )}
      >
        Вы — новый пользователь?
        <Link to="/register" className={FormPageStyles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-default text_color_inactive mb-4 mr-2"
        )}
      >
        Забыли пароль?
        <Link to="/forgot-password" className={FormPageStyles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
