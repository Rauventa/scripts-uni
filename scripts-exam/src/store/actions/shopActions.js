import axios from 'axios';
import {RENDER_SHOP_SUCCESS} from "./actionTypes";

export function renderShop() {
    return async dispatch => {
        try {
            const response = await axios.get('https://rauventa-scripts-exam.firebaseio.com/shop.json');

            const dataContent = Object.entries(response.data).map((item, index) => {
                return {
                    ...item[1],
                    id: item[0],
                    key: item[0]
                }
            });

            dataContent.sort((a, b) => a.status - b.status);

            dispatch(renderShopSuccess(dataContent))

        } catch (e) {
            console.log(e)
        }
    }
}

export function renderShopSuccess(shop) {
    return {
        type: RENDER_SHOP_SUCCESS,
        shop
    }
}