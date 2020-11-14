import {RENDER_SHOP_SUCCESS} from "../actions/actionTypes";

const initialState = {
    shop: []
};

export default function shopReducer(state = initialState, action) {
    switch (action.type) {

        case RENDER_SHOP_SUCCESS:
            return {
                ...state,
                shop: action.shop
            };

        default:
            return state
    }
}