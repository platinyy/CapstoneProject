import Client from "./api"

export const getCart = async () => {
    try {
        const res = await Client.get('/orders/cart')
        return res.data
    } catch (error) {
        throw error
    }
}

export const addItemToCart = async (itemId, userId) => {
    try {
        const res = await Client.post(`/orders/cart/items/${itemId}/${userId}`)
        console.log("res: ", res.data)
        return res.data

    } catch (error) {
        throw error

    }

}


export const setItemQtyInCart = async (itemId, newQty,userId) => {
    try {
        const res = await Client.put(`/orders/cart/qty/${userId}`, {
            itemId,
            newQty
        })
        console.log("setItem: ", res.data)
        return res.data

    } catch (error) {
        throw error

    }
    

}


export const checkout = async (userId) => {
    try {
        const res = await Client.post(`/orders/cart/checkout/${userId}`)
        console.log("===", res.data)
        return res.data

    } catch (error) {
        throw error

    }
}

export const getOrderHistory = async (userId) => {
    try {
        const res = await Client.get(`/orders/history/${userId}`)
        return res.data

    } catch (error) {
        throw error

    }
}

export const getOrderHistoryById = async (id) => {
    try {
      
        const res = await Client.get(`/orders/history/orders/${id}`)
       
        return res.data

    } catch (error) {
        throw error

    }
}