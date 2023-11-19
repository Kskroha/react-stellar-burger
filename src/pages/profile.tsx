import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useOutlet } from "react-router-dom";
import classNames from "classnames";
import ProfilePageStyles from "./profile.module.css";
import { updateUserInfo } from "../services/actions/user";
import { userLogout } from "../services/actions/user";
import { useForm } from "../services/hooks/hooks";
import getErrorMessage from "../services/errorMessage";
import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";

export const ProfilePage = () => {
  const { requestFailed, errorMessage } = useAppSelector((state) => state.user);
  const outlet = useOutlet();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user["user"]);

  const [isEdit, setIsEdit] = React.useState(false);
  const form = useForm({
    name: user["name"],
    email: user["email"],
    password: "",
  });

  const onClick = () => {
    setIsEdit(false);
    form.setValues({
      name: user["name"],
      email: user["email"],
      password: "",
    });
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return dispatch(updateUserInfo(form.values));
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return dispatch(userLogout());
  };

  const handleBlur = () => {
    setIsEdit(true);
  };

  return (
    <div className={ProfilePageStyles.container}>
      <div className={ProfilePageStyles.nav}>
        <NavLink
          end
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
          end
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
              onBlur={handleBlur}
              onChange={form.handleChange}
              value={form.values.name || ""}
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
              onChange={form.handleChange}
              icon="EditIcon"
              value={form.values.email || ""}
              name={"email"}
              extraClass="mb-6"
            />
            <Input
              type={"password"}
              onChange={form.handleChange}
              placeholder={"Пароль"}
              value={form.values.password || ""}
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
      {requestFailed && (
        <span className="text text_type_main-default">
          {getErrorMessage(errorMessage)}
        </span>
      )}
    </div>
  );
};
