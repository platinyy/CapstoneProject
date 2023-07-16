import { useEffect, useState } from "react";
import { GetCategories } from "../../services/CategoryServices";
import { GetItems } from "../../services/ItemServices";
import { getCart, addItemToCart, checkout, setItemQtyInCart, DeleteItemToCart} from '../../services/OrderServices'
import { useNavigate } from "react-router-dom";
import "./NewOrderPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const NewOrderPage = ({ user }) => {
  
  let navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "64aeb60f661de7a2b22825ee"
  );


  const handleCategoryClick = async (categoryId) => {
    console.log("---", categoryId);
    setSelectedCategory(categoryId);

    const data = await GetItems(categoryId);
    setItems(data);
  };

  async function handleAddToOrder(itemId) {
    console.log("itemid ", itemId);
    const updatedCart = await addItemToCart(itemId);
    setCart(updatedCart);
  }
  async function handleDeleteOrder(itemId) {
    const check = await checkout()
    console.log("itemid ", itemId);
    const updatedCart = await DeleteItemToCart(itemId);
    setCart(updatedCart);
    check.totalQty=0;

  }


  
  async function handleCheckOut(itemId) {
    if (!cart) return null;
    const check = await checkout()
    console.log("check: ", check)
    if(check.isPaid == true && check.totalQty > 0 ){
        setCart([])
        navigate('/orders')
    }else{
        alert("You must have at least one item in your order to Checkout")
    }
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }
 

  //   async function handleChangeQty(itemId, newQty) {
  //   const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
  //   setCart(updatedCart);
  // }


  useEffect(() => {
    const handleCategories = async () => {
      const data = await GetCategories();
      setCategories(data);
      
    };
    handleCategories();
    // ======================
  }, []);

  useEffect(() => {
    const handleGetCart = async () => {
      const data = await getCart();
      setCart(data);
      console.log("data");
      console.log(data);
    };
    handleGetCart();

    console.log("cart");
    //   console.log(cart)
  }, []);

  useEffect(() => {
    // Fetch initial category data
    handleCategoryClick(selectedCategory);
  }, [selectedCategory]);

  return user ? (

    <div className="new_order_page_container">
      
      {/* Categories */}
   
      <div className="categories">
      <div className="logo">
                    <p>Dion's Coffee Shop</p>
                </div>
                
        <h1>Categories</h1>
        {Categories.map((category) => (
         
          <div
            key={category._id}
            className={`category ${
              selectedCategory === category._id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category._id)}
          >
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      {/* Items */}
      <div className="items">
        <div className="items-list">
          <h1 className="itemsh1">Menu Items</h1>
          {Items.map((item) => (
            <div key={item._id} className="item">
              <div>{item.emoji}</div>
              <div className="item-title">{item.name}</div>
              <div className="item-details">
                <div className="item-price">${item.price}</div>
                <button onClick={() => handleAddToOrder(item._id)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
   
      <div className="add_to_cart_container">
        <div className="top_container">
        
          
        </div>

        {/* <div className='cart__items_container'>
                   <div className='bottom_container'>
                      <div className='image'>
                <p>lineItem.emoji</p>
            </div>
            <div className='content'>
                <p>"lineItem.name"</p>
                <p>"lineItem.price"</p>
                </div>
           
            <div className='counter'>
                <button>-</button>
                <p>3</p>
                <button>+</button>

            </div>

            <div className='total_price'>
                $10
            </div>

                    </div> 
            </div> */}

        <div className="cart__items_container">
        <div className="icon1">
        <h1 className="iconheader">Your</h1>
        <FontAwesomeIcon icon={faCartShopping} beat size="2xl" style={{color: "#4c76bd",}} />
          </div>
          {cart.lineItems &&
            cart.lineItems.map((lineItem) => (
             
              <div className="bottom_container" key={lineItem._id}>
                <div className="image">
                  <p>{lineItem.item.emoji}</p>
                </div>
                <div className="content">
                  <p>{lineItem.item.name}</p>
                  <p>{lineItem.item.price}</p>
                </div>

                <div className="counter">
                  <button 
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
                  
                  >-</button>
                  <p>{lineItem.qty}</p>
                  <button
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
                  
                  >+</button>
                </div>

                <div className="total_price">{lineItem?.extPrice?.toFixed(2)}</div>

              </div>
            ))}
        </div>

        {/* Checkout */}
        <div className="checkout__container">
          <div className="btn__container">
            <button onClick={handleCheckOut}>Checkout</button>

          
          </div>
          <p>Item Qty: {cart.totalQty}</p>
          <p>Total Price: {cart?.orderTotal?.toFixed(2)}</p>
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

export default NewOrderPage;
