import { useEffect , useState } from "react"
import { getOrderHistory, getOrderHistoryById } from "../../services/OrderServices"

import { useNavigate } from "react-router-dom"

const OrderHistoryPage = ({user}) =>{

    return user ?(
        <div>
            <h1>OrderHistoryPage</h1>
        </div>
    )
    :(
        <div className="protected">
        <h3>Oops! You must be signed in to do that!</h3>
        <button onClick={() => navigate('/signin')}>Sign In</button>
      </div>
      )
}

export default OrderHistoryPage