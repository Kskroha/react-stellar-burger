import React from "react";
import classNames from "classnames";
import AppHeaderStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <>
      <header className={classNames(AppHeaderStyles.header, "pb-4 pt-4")}>
        <div className={AppHeaderStyles.container}>
          <nav className={AppHeaderStyles.nav}>
            <a
              href=".#"
              className={classNames(AppHeaderStyles.btn, AppHeaderStyles.active, "pl-5 pr-5 pb-4 pt-4")}
            >
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2">Конструктор</span>
            </a>
            <a
              href=".#"
              className={classNames(AppHeaderStyles.btn, "pl-5 pr-5 pb-4 pt-4")}
            >
              <ListIcon type="secondary" />
              <span className="text text_type_main-default pl-2">
                Лента заказов
              </span>
            </a>
          </nav>
          <a className={AppHeaderStyles.logo} href=".#"><Logo width="290" height="40" /></a>
          <a
            href=".#"
            className={classNames(AppHeaderStyles.btn, "pl-5 pr-5 pb-4 pt-4")}
          >
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default pl-2">Личный кабинет</span>
          </a>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
