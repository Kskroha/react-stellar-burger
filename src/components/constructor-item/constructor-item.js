import React from "react";
import PropTypes from "prop-types";
import ConstructorItemStyles from "./constructor-item.module.css"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorItem(item) {
  return item.type === "bun" ? (
    <>
      <div className={ConstructorItemStyles.bun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={item.name + " (верх)"}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
      <div className={ConstructorItemStyles.bun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={item.name + " (низ)"}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    </>
  ) : (
    <div className={ConstructorItemStyles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        type={item.type}
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
}

ConstructorItem.propTypes = {
  item: PropTypes.object,
};

export default ConstructorItem;
