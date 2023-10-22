import React from "react";
import classNames from "classnames";
import AppHeaderStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link } from "react-router-dom";

function AppHeader() {
  return (
    <>
      <header className={classNames(AppHeaderStyles.header, "pb-4 pt-4")}>
        <div className={AppHeaderStyles.container}>
          <nav className={AppHeaderStyles.nav}>
            <NavLink
              to="/"
              className={classNames(AppHeaderStyles.btn, AppHeaderStyles.active, "pl-5 pr-5 pb-4 pt-4")}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#f2f2f3" : "#8585AD",
                };
              }}
            >
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2">Конструктор</span>
            </NavLink>
            <NavLink
              to="/feed"
              className={classNames(AppHeaderStyles.btn, "pl-5 pr-5 pb-4 pt-4")}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#f2f2f3" : "#8585AD",
                };
              }}
            >
              <ListIcon type="secondary" />
              <span className="text text_type_main-default pl-2">
                Лента заказов
              </span>
            </NavLink>
          </nav>
          <Link to="/" className={AppHeaderStyles.logo} href=".#"><Logo width="290" height="40" /></Link>
          <NavLink
            to="/profile"
            className={classNames(AppHeaderStyles.btn, "pl-5 pr-5 pb-4 pt-4")}
            style={({ isActive }) => {
              return {
                color: isActive ? "#f2f2f3" : "#8585AD",
              };
            }}
          >
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default pl-2">Личный кабинет</span>
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
