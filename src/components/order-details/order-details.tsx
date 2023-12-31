import { FC } from "react";
import classNames from "classnames";
import OrderDetailsStyles from "./order-details.module.css";
import confirmation from "../../images/confirmation.svg";
import { useAppSelector } from "../../services/hooks/hooks";

const OrderDetails: FC = () => {
  const { orderNumber } = useAppSelector((state) => state.orderDetails);

  return (
    <div className={classNames(OrderDetailsStyles.content, "pt-20")} data-cy="order-modal">
      <span
        className={classNames(
          OrderDetailsStyles.order,
          "mb-8 text text_type_digits-large"
        )}
      >
        {orderNumber}
      </span>
      <span
        className={classNames(
          OrderDetailsStyles.title,
          "mb-15 text text_type_main-default"
        )}
      >
        идентификатор заказа
      </span>
      <img
        className="mb-15"
        src={confirmation}
        alt="Галочка подтверждения"
      ></img>
      <span
        className={classNames(
          OrderDetailsStyles.subtitle,
          "text text_type_main-default mb-2"
        )}
      >
        Ваш заказ начали готовить
      </span>
      <span
        className={classNames(
          OrderDetailsStyles.accent,
          "text text_type_main-default text_color_inactive"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderDetails;
