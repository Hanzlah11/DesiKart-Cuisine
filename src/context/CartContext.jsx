import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  /* =========================================
     ADD ITEM
  ========================================= */

  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (cartItem) =>
            cartItem.id === item.id
        )

      if (existingItem) {
        return currentItems.map(
          (cartItem) =>
            cartItem.id === item.id
              ? {
                  ...cartItem,
                  quantity:
                    cartItem.quantity + 1,
                }
              : cartItem
        )
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ]
    })
  }

  /* =========================================
     REMOVE ITEM COMPLETELY
  ========================================= */

  const removeFromCart = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== itemId
      )
    )
  }

  /* =========================================
     INCREASE QUANTITY
  ========================================= */

  const increaseQuantity = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    )
  }

  /* =========================================
     DECREASE QUANTITY
  ========================================= */

  const decreaseQuantity = (itemId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    )
  }

  /* =========================================
     CLEAR CART
  ========================================= */

  const clearCart = () => {
    setCartItems([])
  }

  /* =========================================
     CALCULATED VALUES
  ========================================= */

  const totalItems = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [cartItems]
  )

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      ),
    [cartItems]
  )

  /* =========================================
     CONTEXT
  ========================================= */

  const value = {
    cartItems,

    addToCart,
    removeFromCart,

    increaseQuantity,
    decreaseQuantity,

    clearCart,

    totalItems,
    subtotal,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}