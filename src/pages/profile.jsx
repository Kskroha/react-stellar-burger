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
  const onClick = (e) => {
    e.preventDefault();
    setIsEdit(false);
    setFormValue({
      name: user.name,
      email: user.email,
      password: "",
    });
  };
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

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
          style={({ isActive }) => {
            return {
              color: isActive ? "#f2f2f3" : "#8585AD",
            };
          }}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={classNames(
            ProfilePageStyles.link,
            "text text_type_main-medium"
          )}
          style={({ isActive }) => {
            return {
              color: isActive ? "#f2f2f3" : "#8585AD",
            };
          }}
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
              <div className={ProfilePageStyles.wrapper}>
                <Button
                  onClick={onClick}
                  htmlType="reset"
                  type="primary"
                  size="small"
                  extraClass={ProfilePageStyles.button}
                >
                  Отмена
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="small"
                  extraClass={ProfilePageStyles.button}
                >
                  Сохранить
                </Button>
              </div>
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
