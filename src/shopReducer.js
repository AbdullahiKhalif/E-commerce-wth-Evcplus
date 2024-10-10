export const initialState = {
    products: [],
    total: 0
}

const ShopReducer = (state, action) =>{
    const {type, payload} = action;
    switch(type){
        case "ADD_TO_CART":
        return{
            ...state,
            products: payload.products,
        }
        case "REMOVE_FROM_CART":
            return{
                ...state,
                products: payload.products,
            }
        case "CALCULATE_PRODUCTS_TOTAL":
            return{
                ...state,
                total: payload,
            }
        case "CLEAR_CART": return initialState    
          
        default: 
            throw new Error("Invalid reducer action")
    }
}

export default ShopReducer;