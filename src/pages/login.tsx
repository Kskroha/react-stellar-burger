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
import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import { useForm } from "../services/hooks/hooks";
import getErrorMessage from "../services/errorMessage";

export const LoginPage = () => {
  const { requestFailed, errorMessage } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const form = useForm({
    email: "",
    password: "",
  });
  const { values } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return dispatch(userLogin(values));
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
          onChange={form.handleChange}
          value={values.email || ""}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={form.handleChange}
          value={values.password || ""}
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
      {requestFailed && (
        <span className="text text_type_main-default">
          {getErrorMessage(errorMessage)}
        </span>
      )}
    </div>
  );
};
