import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'

function Cart({ open, onClose }) {
  const {
    cartItems,
    subtotal,
    totalItems,
    clearCart,
  } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0
          z-[90]
          bg-black/65
          backdrop-blur-[3px]

          transition-all
          duration-500

          ${
            open
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          }
        `}
      />

      {/* Kart Drawer */}
      <aside
        className={`
          fixed
          right-0
          top-0
          z-[100]

          flex
          h-screen
          w-[430px]
          max-w-full
          flex-col

          border-l
          border-[#D4A24C]/15

          bg-[#090705]

          shadow-[-24px_0_80px_rgba(0,0,0,0.58)]

          transition-transform
          duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]

          ${
            open
              ? 'translate-x-0'
              : 'translate-x-full'
          }
        `}
        aria-hidden={!open}
      >
        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            border-b
            border-[#D4A24C]/10
            px-7
            py-6
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#C4863F]
                "
              >
                Your Order
              </p>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-3
                "
              >
                <h2
                  className="
                    font-display
                    text-[34px]
                    font-semibold
                    leading-none
                    text-[#F5EAD8]
                  "
                >
                  Your Kart
                </h2>

                {totalItems > 0 && (
                  <span
                    className="
                      flex
                      h-7
                      min-w-7
                      items-center
                      justify-center
                      rounded-full

                      bg-[#D4A24C]

                      px-2

                      text-[11px]
                      font-bold
                      text-[#120B04]
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full

                border
                border-[#D4A24C]/15

                bg-[#120F0B]

                text-[24px]
                leading-none
                text-[#A99579]

                transition-all
                duration-300

                hover:border-[#D4A24C]/40
                hover:text-[#F5EAD8]
              "
            >
              ×
            </button>
          </div>

          {/* Clear Kart */}
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="
                mt-5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.13em]
                text-[#7C6D5C]

                transition-colors
                duration-300

                hover:text-[#E4571E]
              "
            >
              Clear Kart
            </button>
          )}
        </div>

        {/* =========================================
            ITEMS
        ========================================= */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-6
            py-6
          "
        >
          {cartItems.length === 0 ? (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <div>
                {/* Empty icon */}
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full

                    border
                    border-[#D4A24C]/15

                    bg-[#100C09]
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="
                      h-7
                      w-7
                      text-[#D4A24C]
                    "
                  >
                    <path d="M3 3h2l2.2 9.4a2 2 0 0 0 2 1.6h6.9a2 2 0 0 0 2-1.6L20 7H7" />
                    <circle cx="10" cy="19" r="1" />
                    <circle cx="17" cy="19" r="1" />
                  </svg>
                </div>

                <h3
                  className="
                    font-display
                    mt-6
                    text-[30px]
                    font-semibold
                    text-[#F5EAD8]
                  "
                >
                  Your Kart is Empty
                </h3>

                <p
                  className="
                    mx-auto
                    mt-3
                    max-w-[280px]
                    text-[14px]
                    leading-7
                    text-[#8F8376]
                  "
                >
                  Add your favourite DesiKart dishes
                  to begin your order.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    mt-6
                    inline-flex
                    h-[44px]
                    items-center
                    justify-center
                    rounded-full

                    border
                    border-[#D4A24C]/25

                    px-6

                    text-[12px]
                    font-semibold
                    text-[#D4A24C]

                    transition-all
                    duration-300

                    hover:border-[#D4A24C]/60
                    hover:bg-[#D4A24C]/5
                  "
                >
                  Explore Menu
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* =========================================
            FOOTER
        ========================================= */}

        <div
          className="
            border-t
            border-[#D4A24C]/10
            bg-[#080604]
            px-7
            pb-7
            pt-6
          "
        >
          <div
            className="
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#796B5B]
                "
              >
                Subtotal
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  text-[#685D51]
                "
              >
                Delivery calculated separately
              </p>
            </div>

            <p
              className="
                font-display
                text-[30px]
                font-semibold
                leading-none
                text-[#E7C075]
              "
            >
              Rs {subtotal.toLocaleString()}
            </p>
          </div>

          {/* Checkout */}
          <button
            type="button"
            disabled={cartItems.length === 0}
            className="
              mt-6
              flex
              h-[52px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-full

              border
              border-[#E1AF57]

              bg-gradient-to-r
              from-[#A96C25]
              via-[#D4A24C]
              to-[#B97A28]

              text-[13px]
              font-bold
              uppercase
              tracking-[0.06em]
              text-[#120B04]

              shadow-[0_12px_30px_rgba(212,162,76,0.20)]

              transition-all
              duration-300

              hover:-translate-y-[2px]
              hover:shadow-[0_16px_38px_rgba(212,162,76,0.30)]

              disabled:cursor-not-allowed
              disabled:opacity-35
              disabled:hover:translate-y-0
              disabled:hover:shadow-none
            "
          >
            Proceed to Checkout

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="m14 7 5 5-5 5" />
            </svg>
          </button>

          <p
            className="
              mt-4
              text-center
              text-[9px]
              uppercase
              tracking-[0.12em]
              text-[#65594C]
            "
          >
            Review your order before checkout
          </p>
        </div>
      </aside>
    </>
  )
}

export default Cart