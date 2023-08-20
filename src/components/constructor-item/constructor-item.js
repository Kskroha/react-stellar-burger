import React from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  REMOVE_ITEM,
  MOVE_ITEM,
} from "../../services/actions/burger-constructor";
import ConstructorItemStyles from "./constructor-item.module.css";

function ConstructorItem({ item, text, type, id, index }) {
  const dispatch = useDispatch();

  const ref = React.useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: MOVE_ITEM,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
        ...item,
      });
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleClick = React.useCallback(
    (e) => {
      if (e.target.tagName === "path") {
        return dispatch({ type: REMOVE_ITEM, item });
      }
    },
    [dispatch, item]
  );

  return item.type === "bun" ? (
    <>
      <div className={ConstructorItemStyles.bun}>
        <ConstructorElement
          type={type}
          isLocked={true}
          text={item.name + ` (${text})`}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    </>
  ) : (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={ConstructorItemStyles.ingredient}
      onClick={handleClick}
    >
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
  text: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
};

export default ConstructorItem;
