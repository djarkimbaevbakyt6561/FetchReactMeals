import { useState, useEffect, useCallback, useReducer } from "react";
import { createContext } from "react";
import { fetchRequest } from "../lib/fetchAPI";
export const CartContext = createContext({
    items: [],
    totalAmount: 0,
})
const basketReducer = (state, action) => {
    if (action.type === "SET") {
        return {
            ...state,
            basket: action.payload
        }
    }
    return state
}
const CartProvider = ({ children }) => {
    const [basket, dispatchBasket] = useReducer(basketReducer, {basket: []})
    const getBasket = useCallback(async () => {
        try {
            const response = await fetchRequest(`/basket`)
            dispatchBasket({ type: "SET", payload: response.items })
        } catch (error) {
            new Error(error)
            console.log(error);
        }
    }, [])
    useEffect(() => {
        getBasket()
    }, [])
    const totalAmount = basket.basket?.reduce((prev, current) => prev + current.amount, 0)

    async function addItem(id, amount) {
        try {
            await fetchRequest(`/foods/${id}/addToBasket`, { method: 'POST', body: { amount } })
            await getBasket()

        } catch (error) {
            new Error(error)
            console.log(error);
        }

    }
    const incrementAmount = useCallback(async (id) => {
        const item = basket.basket.find((item) => item._id === id);
        if (item) {
            const number = item.amount + 1;
            await fetchRequest(`/basketItem/${id}/update`, { method: "PUT", body: { amount: number } });
            await getBasket();
        }
    }, [basket.basket])
    const decrementAmount = useCallback(async (id) => {
        const item = basket.basket.find((item) => item._id === id);
        if (item) {
            const number = item.amount - 1;
            await fetchRequest(`/basketItem/${id}/update`, { method: "PUT", body: { amount: number } });
            await getBasket();
        }
        console.log(item.amount);
        if (item.amount <= 1) {
            console.log("hi");
            await fetchRequest(`/basketItem/${id}/delete`, { method: "DELETE" })
            await getBasket();
        }
    }, [basket.basket])
    const cartValue = {
        totalAmount,
        addItem,
        basket: basket.basket,
        incrementAmount,
        decrementAmount
    }
    return <CartContext.Provider value={cartValue} >
        {children}
    </CartContext.Provider>
}
export default CartProvider