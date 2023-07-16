import Client from "./api"

export const getCart = async () => {
    try {
        const res = await Client.get('/orders/cart')
        return res.data
    } catch (error) {
        throw error
    }
}

export const addItemToCart = async (itemId) => {
    try {
        const res = await Client.post(`/orders/cart/items/${itemId}`)
        console.log("res: ", res.data)
        return res.data

    } catch (error) {
        throw error

    }

}
export const DeleteItemToCart = async (itemId, newQty) => {
    try {
        const res = await Client.put(`/orders/cart/qty`, {
            itemId,
            newQty
        })
        console.log("setItem: ", res.data)
        return res.data

    } catch (error) {
        throw error

    }
    

}

export const setItemQtyInCart = async (itemId, newQty) => {
    try {
        const res = await Client.put(`/orders/cart/qty`, {
            itemId,
            newQty
        })
        console.log("setItem: ", res.data)
        return res.data

    } catch (error) {
        throw error

    }
    

}


export const checkout = async () => {
    try {
        const res = await Client.post(`/orders/cart/checkout`)
        console.log("===", res.data)
        return res.data

    } catch (error) {
        throw error

    }
}

export const getOrderHistory = async () => {
    try {
        const res = await Client.get(`/orders/history`)
        return res.data

    } catch (error) {
        throw error

    }
}

export const getOrderHistoryById = async (id) => {
    try {
        console.log("Hi")
        const res = await Client.get(`/orders/history/${id}`)
        console.log("ddd: ", res.data)
        return res.data

    } catch (error) {
        throw error

    }
}