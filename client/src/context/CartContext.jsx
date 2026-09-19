import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const initialState = {
  items: JSON.parse(localStorage.getItem('nexaCart') || '[]'),
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i._id === action.payload._id);
      if (existing) {
        const items = state.items.map(i =>
          i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
        );
        return { ...state, items };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i._id !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.qty < 1) {
        return { ...state, items: state.items.filter(i => i._id !== action.id) };
      }
      const items = state.items.map(i =>
        i._id === action.id ? { ...i, qty: action.qty } : i
      );
      return { ...state, items };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('nexaCart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD', payload: product });
    dispatch({ type: 'OPEN_CART' });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const itemCount = state.items.reduce((a, i) => a + i.qty, 0);
  const subtotal  = state.items.reduce((a, i) => a + i.price * i.qty, 0);
  const tax       = subtotal * 0.08;
  const shipping  = subtotal > 100 ? 0 : 9.99;
  const total     = subtotal + tax + shipping;

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      itemCount,
      subtotal,
      tax,
      shipping,
      total,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}
