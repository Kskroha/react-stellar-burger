import React from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import FormPageStyles from "./form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import { resetPassword } from "../services/actions/user";
import { useForm } from "../services/hooks/hooks";
import getErrorMessage from "../services/errorMessage";

export const ResetPasswordPage = () => {
  const { requestFailed, errorMessage } = useAppSelector((state) => state.user);
  const resetSuccess = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (resetSuccess) {
      navigate("/");
    }
  }, [resetSuccess, navigate]);
  const dispatch = useAppDispatch();

  const form = useForm({
    password: "",
    token: "",
  });

  const { values } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return dispatch(resetPassword(values));
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <div className={FormPageStyles.container}>
      <h2
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-medium mb-6"
        )}
      >
        Восстановление пароля
      </h2>
      <form className={FormPageStyles.form} onSubmit={(e) => handleSubmit(e)}>
        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={form.handleChange}
          value={values.password || ""}
          name={"password"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"password"}
          onChange={form.handleChange}
          placeholder={"Введите код из письма"}
          value={values.token || ""}
          name={"token"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
      </form>
      <p
        className={classNames(
          FormPageStyles.title,
          "text text_type_main-default text_color_inactive mb-4 mr-2"
        )}
      >
        Вспомнили пароль?
        <Link to="/login" className={FormPageStyles.link}>
          Войти
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
