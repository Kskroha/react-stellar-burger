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
import { useDispatch } from "react-redux";
import { registerNewUser } from "../services/actions/user";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = React.useState({
    name: "",
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
    return dispatch(registerNewUser(formValue));
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
          value={formValue.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
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
    </div>
  );
};
