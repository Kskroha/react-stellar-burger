import React from 'react';
import classNames from 'classnames';
import AppHeaderStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <>
          <header className={classNames(AppHeaderStyles.header, "pb-4 pt-4 mt-10")}>
            <nav className={AppHeaderStyles.nav}>
              <button className={classNames(AppHeaderStyles.btn, "pl-5 pr-5 pb-4 pt-4")}>
                <BurgerIcon type="primary" />
                <span className="text text_type_main-small pl-2">Конструктор</span>
              </button>
              <button className={classNames(AppHeaderStyles.btn, "pl-5 pr-5 pb-4 pt-4")}>
                <ListIcon type="secondary" />
                <span className="text text_type_main-small pl-2">Лента заказов</span>
              </button>
            </nav>
            <Logo className={AppHeaderStyles.logo} width="290" height="40"/>
            <button className={classNames(AppHeaderStyles.btn, "pl-5 pr-5 pb-4 pt-4")}>
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-small pl-2">Личный кабинет</span>
              </button>
          </header>
        </>
    );
}

export default AppHeader;
