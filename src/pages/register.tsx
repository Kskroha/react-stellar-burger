import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import FormPageStyles from "./form.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../services/actions/user";
import { useForm } from "../services/hooks/useForm";
import getErrorMessage from "../services/errorMessage";
import { RootState } from "../services/reducers";
import { AppDispatch } from "..";

export const RegisterPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { requestFailed, errorMessage } = useSelector((state: RootState) => state.user);

  const form = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { values } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    form.handleChange(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return dispatch(registerNewUser(values));
  };

  return (
    <div className={FormPageStyles.container}>
      <h2
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-medium mb-6"
        )}
      >
        Регистрация
      </h2>
      <form
        className={FormPageStyles.form}
        method="POST"
        action="#"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={values.name || ''}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChange}
          value={values.email || ''}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={values.password || ''}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-default text_color_inactive mb-4 mr-2"
        )}
      >
        Уже зарегистрированы?
        <Link to="/login" className={FormPageStyles.link}>
          Войти
        </Link>
      </p>
      {requestFailed && <span className="text text_type_main-default">{getErrorMessage(errorMessage)}</span>}
    </div>
  );
};
