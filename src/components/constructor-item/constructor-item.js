import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorItem(item) {
  return (
    item.type === 'bun' ?
    <>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={item.name + ' (верх)'}
        price={parseInt(item.count) * parseInt(item.price, 10)}
        thumbnail={item.image}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={item.name  + ' (низ)'}
        price={parseInt(item.count) * parseInt(item.price, 10)}
        thumbnail={item.image}
      />
    </> :
    <ConstructorElement
      type={item.type}
      isLocked={false}
      text={item.name}
      price={parseInt(item.count) * parseInt(item.price, 10)}
      thumbnail={item.image}
    />
  );
}

ConstructorItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default ConstructorItem;
