import {createContext, useContext, useReducer } from "react";
import ShopReducer, { initialState } from "./shopReducer";

const ShopContext = createContext(initialState);

export const ShopProvider = ({children}) => {
    const [state, dispatch] = useReducer(ShopReducer, initialState);

    const addToCart = (product) => {
        const updatedProduct = state.products.concat(product);
        calculateTotal(updatedProduct);
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedProduct
            }
        })
    }

    const removeFromCart = (product) => {
        const updatedProduct = state.products.filter(p => product.id !== p.id)
        calculateTotal(updatedProduct);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedProduct
            }
        })
    }

    const calculateTotal = (products) => {
        let total = 0;
        products.forEach(pro => (
            total += pro.price
        ))

        dispatch({
            type: "CALCULATE_PRODUCTS_TOTAL",
            payload: total
        })
    }

    const clearCart = () => {
        dispatch({
            type: "CLEAR_CART",
            payload: initialState
        })
    }
    const values = {
        products: state.products,
        total: state.total,
        addToCart,
        removeFromCart,
        calculateTotal,
        clearCart
    }

    return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>
    
}

const useShop = () => {
    const context = useContext(ShopContext);

    if(context === undefined){
        throw new Error('Context must be inside a ShopContext')
    }
    return context;
}

export default useShop;