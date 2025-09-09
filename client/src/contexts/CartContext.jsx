import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cart_items") || "[]"),
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const exist = state.items.find(i => i.id === item.id);
      const items = exist
        ? state.items.map(i =>
            i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
          )
        : [...state.items, { ...item, qty: item.qty || 1 }];
      return { ...state, items };
    }
    case "INC":
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) };
    case "DEC":
      return {
        ...state,
        items: state.items
          .map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)
          .filter(i => i.qty > 0),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(state.items));
  }, [state.items]);

  const totalQty = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty * (i.price || 0), 0),
    [state.items]
  );

  return (
    <CartContext.Provider value={{ ...state, totalQty, totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);