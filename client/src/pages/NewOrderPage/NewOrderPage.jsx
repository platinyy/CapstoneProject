import { useEffect, useState} from 'react'
import { GetCategories } from '../../services/CategoryServices'
import { GetItems  } from '../../services/ItemServices'
import { useNavigate } from 'react-router-dom' 
import { getCart } from '../../services/OrderServices'


const NewOrderPage = ({user}) =>{
    let navigate = useNavigate()
    const [Categories, setCategories] = useState([])
    const [Items, setItems] = useState([])
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const handleCategories = async () => {
            const data = await GetCategories()
            setCategories(data)
        }
        handleCategories()
    },[])
   
    useEffect(() => {
        const handleItems = async () => {
            const data = await GetItems()
            setItems(data)
        }
        handleItems()
        async function GetOrders() {
            const cart = await GetOrders();
            setCart(cart);
        }
        GetOrders();
    },[])
    return user ? (
        <div>
            
            {Categories.map((category) => (
                <div>
                <h1>{category.name} </h1>
                {Items.map((item)=>{
                    if(category.name === item.category.name)
                    {
                        return (<div>
                            {item.name}{item.emoji}{item.price} 
                        </div>)
                    }
                })}
                </div>
            ))}
              
       
        </div>
    ) :(
        <div className="protected">
        <h3>Oops! You must be signed in to do that!</h3>
        <button onClick={() => navigate('/signin')}>Sign In</button>
      </div>
      )
}

export default NewOrderPage