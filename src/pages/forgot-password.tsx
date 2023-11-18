import React from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import FormPageStyles from "./form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import { requestPasswordChange } from "../services/actions/user";
import { useForm } from "../services/hooks/hooks";
import getErrorMessage from "../services/errorMessage";

export const ForgotPasswordPage = () => {
  const { requestFailed, errorMessage } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const form = useForm({
    email: "",
  });

  const { values } = form;
  const { requestSuccess } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (requestSuccess) {
      navigate("/reset-password");
    }
  }, [requestSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return dispatch(requestPasswordChange(values));
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
      <form className={FormPageStyles.form} onSubmit={handleSubmit}>
        <EmailInput
          onChange={form.handleChange}
          value={values.email || ""}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          placeholder="Укажите e-mail"
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
