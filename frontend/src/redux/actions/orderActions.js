import axios from "axios"
import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER } from "../constants/cartConstants"

export const createOrder = (order) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    await axios.post("api/orders", {
        config,
        body: JSON.stringify(order)
    })
    .then((res) => res.json())
    .then((data) => {
        dispatch({
            type: CREATE_ORDER, 
            payload: data
        });

        localStorage.clear("cart");

        dispatch({type: CLEAR_CART});
    })
}

export const clearOrder = () => (dispatch) => {
    dispatch({
        type: CLEAR_ORDER
    });
}