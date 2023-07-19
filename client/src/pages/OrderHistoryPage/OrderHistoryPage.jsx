import { useEffect, useState } from "react";
import { getOrderHistory, getOrderHistoryById } from "../../services/OrderServices";
import { useNavigate } from "react-router-dom";
import "./OrderHistoryPage.css";
import moment from "moment";


const OrderHistoryPage = ({ user }) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [activeOrder, setActiveOrder] = useState(null);
    const datea = moment;

    var date = new Date();
    const handleSelectOrder = async (order) => {
        setActiveOrder(order);

        const active = await getOrderHistoryById(order);
        setActiveOrder(active)

    };

    useEffect(() => {
        // Load previous orders (paid)
        async function fetchOrderHistory() {
            const orders = await getOrderHistory(user.id);
            setOrders(orders);
            // If no orders, activeOrder will be set to null below
            setActiveOrder(orders[0])

        }
        fetchOrderHistory();
    }, [user]);

    return user ? (
        <div className="order_history_page_container">
            {/* Sidebar */}
            <div className="sidebar__container">
                <div className="logo">
                    <p>Dion's Coffee Shop</p>
                </div>
               
                <button onClick={() => navigate("/orders/new")}>New Order</button>
                
            </div>

            {/* Order History */}
            <div className="order__history__container">
                {orders.map((history, i) => (
                    <div
                        className="order__history"
                        onClick={() => handleSelectOrder(history._id)}
                    >
                        <div className="div1">
                            <p>Order Number: {history.orderId}</p>
                            <p>Date: {datea(history.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                        </div>
                        <div className="div2">
                            <p>Price: {history.orderTotal.toFixed(2)}</p>
                            <p>Items Qty: {history.totalQty}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Details */}

            <div className="order__details__container">
                {/* Top */}
           

                {/* Bottom */}

                <div className="order__details__wrapper">
                    <div className="bottom__container">
                        {activeOrder && activeOrder.lineItems &&
                            activeOrder.lineItems.map((lineItem) => (
                                <div className="product">
                                        <p>{lineItem.item.emoji}</p>
                                        <p>{lineItem.item.name}</p>
                                        <p>Qty: {lineItem.qty}</p>
                                        <p>{lineItem.extPrice.toFixed(2)}</p>
                                </div>
                            ))}
                    </div>

                </div>


                {/* Order Total */}
                <div className="order__total">
                   
                        
                        <p>Items Qty: {activeOrder ? activeOrder?.totalQty : 0}</p>
                        <p>Total Price: {activeOrder ? activeOrder?.orderTotal?.toFixed(2) : 0}</p>


                    
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
