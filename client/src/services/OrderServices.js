import Client from './api'

const BASE_URL = '/api/OrderService'

export function getCart(){
  return Client(`${BASE_URL}/cart`)
}

export function addItemToCart(itemID){
  return Client(`${BASE_URL}/cart/items/${itemID}`, 'POST')
}