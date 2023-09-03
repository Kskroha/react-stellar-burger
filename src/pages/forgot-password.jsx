import React from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import FormPageStyles from "./form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordChange } from "../services/actions/user";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = React.useState({
    email: "",
  });
  const requestSuccess = useSelector(
    (state) => state.user.passwordChangeRequestSuccess
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (requestSuccess) {
      navigate("/reset-password");
    }
  }, [requestSuccess, navigate]);

  const onChange = (e) => {
    e.preventDefault();
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(requestPasswordChange(formValue));
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
        <EmailInput
          onChange={onChange}
          value={formValue.email}
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
    </div>
  );
};
