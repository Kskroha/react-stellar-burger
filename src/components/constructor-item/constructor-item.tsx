import { FC, useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  REMOVE_ITEM,
  MOVE_ITEM,
} from "../../services/constants";
import ConstructorItemStyles from "./constructor-item.module.css";
import { TIngredient } from "../../types/types";
import { useAppDispatch } from "../../services/hooks/hooks";

interface IConstructorItem {
  item: TIngredient;
  text?: string;
  type?: "top" | "bottom" | undefined;
  id?: string;
  index?: number;
  key?: string;
}

const ConstructorItem: FC<IConstructorItem> = ({
  item,
  text,
  type,
  id,
  index,
}) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index!;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
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

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element.tagName === "path") {
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
        type={type}
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
};

export default ConstructorItem;
