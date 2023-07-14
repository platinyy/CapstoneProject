import { useEffect, useState } from "react";
import { getOrderHistory, getOrderHistoryById } from "../../services/OrderServices";
import { useNavigate } from "react-router-dom";


const OrderHistoryPage = ({ user }) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [activeOrder, setActiveOrder] = useState(null);

    const handleSelectOrder = async (order) => {
        setActiveOrder(order);

        const active = await getOrderHistoryById(order);
        setActiveOrder(active)

    };

    useEffect(() => {
        // Load previous orders (paid)
        async function fetchOrderHistory() {
            const orders = await getOrderHistory();
            setOrders(orders);
            // If no orders, activeOrder will be set to null below
            setActiveOrder(orders[0])

        }
        fetchOrderHistory();
    }, []);

    return user ? (
        <div className="order_history_page_container">
            {/* Sidebar */}
            <div className="sidebar__container">
                <div className="logo">
                    <p>SEI CAFE</p>
                </div>
                <button onClick={() => navigate("/orders/new")}>New Order</button>
                <button >Logout</button>
            </div>

            {/* Order History */}
            <div className="order__history__container">
                {orders.map((history, i) => (
                    <div
                        className="order__history"
                        onClick={() => handleSelectOrder(history._id)}
                    >
                        <div className="div1">
                            <p>{history.orderId}</p>
                            <p>{history.createdAt}</p>
                        </div>
                        <div className="div2">
                            <p>{history.orderTotal.toFixed(2)}</p>
                            <p>{history.totalQty}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Details */}

            <div className="order__details__container">
                {/* Top */}
                <div className="top__container">
                    <p>Order Id</p>
                    <p>order date</p>
                </div>

                {/* Bottom */}

                <div className="order__details__wrapper">
                    <div className="bottom__container">
                        {activeOrder && activeOrder.lineItems &&
                            activeOrder.lineItems.map((lineItem) => (
                                <div className="product">
                                    <div className="div1">
                                        <p>{lineItem.item.emoji}</p>
                                    </div>

                                    <div className="div2">
                                        <p>{lineItem.item.name}</p>
                                        <p>{lineItem.item.price}</p>
                                    </div>

                                    <div className="div3">
                                        <p>{lineItem.item.qty}</p>
                                    </div>
                                    <div className="div4">
                                        <p>{lineItem.extPrice}</p>
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>


                {/* Order Total */}
                <div className="order__total">
                    <div>
                        <p>Total</p>
                        <p>{activeOrder ? activeOrder?.totalQty : 0}</p>
                        <p>{activeOrder ? activeOrder?.orderTotal?.toFixed(2) : 0}</p>


                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="protected">
            <h3>Oops! You must be signed in to do that!</h3>
            <button onClick={() => navigate("/signin")}>Sign In</button>
        </div>
    );
};

export default OrderHistoryPage;
