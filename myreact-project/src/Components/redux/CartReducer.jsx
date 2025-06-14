export const cartReducer = (
  state = { cart_items: [], shipping_info: {} },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart_items: [...state.cart_items, action.payload],
      };

    case "UPDATE_CART":
      return {
        ...state,
        cart_items: state.cart_items.map((item) =>
          item.product === action.payload.product ? action.payload : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart_items: state.cart_items.filter(
          (cart_item) => cart_item.product !== action.payload
        ),
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart_items: [],
      };

    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        shipping_info: action.payload,
      };
    default:
      return state;
  }
};
