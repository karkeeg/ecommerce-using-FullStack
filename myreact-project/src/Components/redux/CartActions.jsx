import Swal from "sweetalert2";

// ADD TO CART
export const addToCart = (item, quantity) => (dispatch, getState) => {
  const cart_item = {
    product: item._id,
    product_name: item.product_name,
    product_image: item.product_image,
    product_price: item.product_price,
    quantity,
    count_in_stock: item.count_in_stock,
  };

  const cart_items = getState().cart.cart_items;
  const itemExist = cart_items.find(
    (cartItem) => cartItem.product === item._id
  );

  let totalQuantity = quantity;
  if (itemExist) {
    totalQuantity = itemExist.quantity + quantity;
  }

  // Check stock availability
  if (totalQuantity > item.count_in_stock) {
    Swal.fire({
      title: "Insufficient Stock",
      text: `Cannot add ${totalQuantity} items. Only ${item.count_in_stock} available in stock.`,
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  if (!itemExist) {
    dispatch({
      type: "ADD_TO_CART",
      payload: cart_item,
    });
    Swal.fire({
      title: "Added to Cart",
      text: `${item.product_name} has been added to your cart.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  } else {
    dispatch({
      type: "UPDATE_CART",
      payload: {
        ...cart_item,
        quantity: totalQuantity,
      },
    });
    Swal.fire({
      title: "Updated Cart",
      text: `${item.product_name} quantity has been updated in your cart.`,
      icon: "info",
      confirmButtonText: "OK",
    });
  }

  // Save to localStorage
  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
};

// REMOVE FROM CART
export const RemoveFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: "REMOVE_FROM_CART", payload: id });

  Swal.fire({
    title: "Removed from Cart",
    text: "Item has been removed from your cart.",
    icon: "info",
    confirmButtonText: "OK",
  });

  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
};

// UPDATE CART (from manual quantity input or similar)
export const UpdateCart = (cart_item) => (dispatch, getState) => {
  if (cart_item.quantity > cart_item.count_in_stock) {
    Swal.fire({
      title: "Stock Limit Exceeded",
      text: `Only ${cart_item.count_in_stock} available in stock.`,
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  dispatch({
    type: "UPDATE_CART",
    payload: cart_item,
  });

  Swal.fire({
    title: "Cart Updated",
    text: `Quantity has been updated in your cart.`,
    icon: "success",
    confirmButtonText: "OK",
  });

  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
};

// EMPTY CART
export const EmptyCart = () => (dispatch, getState) => {
  dispatch({ type: "EMPTY_CART" });

  Swal.fire({
    title: "Cart Emptied",
    text: "Your cart has been emptied.",
    icon: "info",
    confirmButtonText: "OK",
  });

  localStorage.removeItem("cart_items");
};

// SAVE SHIPPING INFO
export const SaveShippingInfo = (shippingInfo) => (dispatch, getState) => {
  dispatch({
    type: "SAVE_SHIPPING_INFO",
    payload: shippingInfo,
  });

  Swal.fire({
    title: "Shipping Info Saved",
    text: "Your shipping information has been saved.",
    icon: "success",
    confirmButtonText: "OK",
  });

  localStorage.setItem(
    "shipping_info",
    JSON.stringify(getState().cart.shipping_info)
  );
};
