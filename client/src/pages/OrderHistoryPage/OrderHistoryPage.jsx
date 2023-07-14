import { useEffect, useState } from "react"
import { getOrderHistory, getOrderHistoryById } from "../../services/OrderServices"

import { useNavigate } from "react-router-dom"

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
        <div>
            <div className="sidebar__container">
                <div className="logo">
                    <p>Dion's Coffee Shop</p>
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
        </div>

    )
        : (
            <div className="protected">
                <h3>Oops! You must be signed in to do that!</h3>
                <button onClick={() => navigate('/signin')}>Sign In</button>
            </div>
        )
}

export default OrderHistoryPage