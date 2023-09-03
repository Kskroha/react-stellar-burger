import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useOutlet } from "react-router-dom";
import classNames from "classnames";
import ProfilePageStyles from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../services/actions/user";
import { userLogout } from "../services/actions/user";

export const ProfilePage = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [formValue, setFormValue] = React.useState({
    name: user.name,
    email: user.email,
    password: "",
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const onChange = (e) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setIsEdit(true);
  };
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const checkActive = ({ isActive }) =>
    isActive
      ? {
          color: "#F2F2F3",
        }
      : { color: "#8585AD" };

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(updateUserInfo(formValue));
  };

  const handleClick = (e) => {
    e.preventDefault();
    return dispatch(userLogout());
  };

  return (
    <div className={ProfilePageStyles.container}>
      <div className={ProfilePageStyles.nav}>
        <NavLink
          to="/profile"
          className={classNames(
            ProfilePageStyles.link,
            "text text_type_main-medium"
          )}
          style={(isActive) => checkActive(isActive)}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={classNames(
            ProfilePageStyles.link,
            "text text_type_main-medium"
          )}
          style={(isActive) => checkActive(isActive)}
        >
          История заказов
        </NavLink>
        <a
          href=".#"
          onClick={handleClick}
          className={classNames(
            ProfilePageStyles.link,
            "text text_type_main-medium"
          )}
        >
          Выход
        </a>
      </div>
      {outlet || (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={formValue.name}
              name={"name"}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="mb-6"
              icon="EditIcon"
            />
            <Input
              type={"email"}
              placeholder={"E-mail"}
              onChange={onChange}
              icon="EditIcon"
              value={formValue.email}
              name={"email"}
              extraClass="mb-6"
            />
            <Input
              type={"password"}
              onChange={onChange}
              placeholder={"Пароль"}
              value={formValue.password}
              name={"password"}
              extraClass="mb-6"
              icon="EditIcon"
            />

            {isEdit && (
              <Button
                htmlType="submit"
                type="primary"
                size="small"
                extraClass={ProfilePageStyles.button}
              >
                Сохранить
              </Button>
            )}
          </form>
          <span
            className={classNames(
              ProfilePageStyles.span,
              "text text_type_main-default"
            )}
          >
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </>
      )}
    </div>
  );
};
