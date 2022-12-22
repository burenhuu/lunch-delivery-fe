import { Status } from "lib/types/order.type";

interface OrderStatusProps {
    status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => (
    <div className="text-gray font-light text-sm">
        {status === Status.PAYMENT_PENDING
            ? "Төлбөр хүлээгдэж буй"
            : status === Status.PAID
            ? "Захиалагдсан"
            : status === Status.PREPARING
            ? "Бэлтгэж байна"
            : status === Status.PREPARED
            ? "Бэлэн болсон"
            : status === Status.DELIVERING
            ? "Хүргэлтэнд гарсан"
            : status === Status.COMPLETED
            ? "Биелсэн"
            : status === Status.CANCELLED
            ? "Цуцлагдсан"
            : ""}
    </div>
);

export default OrderStatus;
