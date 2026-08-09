import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import CinematicBackground from '../common/CinematicBackground'

function Cart({ open, onClose }) {
  const {
    cartItems,
    subtotal,
    totalItems,
    clearCart,
  } = useCart()

  return (
    <>
      {/* =========================================
          BACKDROP
      ========================================= */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0
          z-[90]

          bg-black/70
          backdrop-blur-[5px]

          transition-all
          duration-500

          ${
            open
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          }
        `}
      />

      {/* =========================================
          KART DRAWER
      ========================================= */}

      <aside
        className={`
          fixed
          right-0
          top-0

          z-[100]

          flex
          h-screen
          w-[440px]
          max-w-full
          flex-col

          overflow-hidden

          border-l
          border-[#D4A24C]/18

          bg-[#070503]

          shadow-[-30px_0_90px_rgba(0,0,0,0.72)]

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
            CINEMATIC BACKGROUND
        ========================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0

            opacity-55
          "
        >
          <CinematicBackground />
        </div>

        {/* Dark overlay so smoke stays subtle */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]

            bg-[linear-gradient(180deg,rgba(7,5,3,0.70)_0%,rgba(7,5,3,0.87)_35%,rgba(7,5,3,0.94)_100%)]
          "
        />

        {/* Copper ambient glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[36%]
            z-[1]

            h-[420px]
            w-[420px]

            -translate-x-1/2

            rounded-full

            bg-[#B86132]/[0.055]

            blur-[100px]
          "
        />

        {/* Everything above background */}
        <div className="relative z-10 flex h-full min-h-0 flex-col">

          {/* =========================================
              HEADER
          ========================================= */}

          <div
            className="
              shrink-0

              border-b
              border-[#D4A24C]/12

              bg-[#070503]/60
              backdrop-blur-md

              px-7
              pb-6
              pt-6
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
                    tracking-[0.30em]
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
                      text-[36px]
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

                        shadow-[0_0_18px_rgba(212,162,76,0.18)]
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
                aria-label="Close Kart"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#D4A24C]/20

                  bg-[#120D08]/75

                  text-[24px]
                  leading-none
                  text-[#AB9678]

                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:rotate-90
                  hover:border-[#D4A24C]/60
                  hover:bg-[#D4A24C]/[0.07]
                  hover:text-[#E8BB65]
                "
              >
                ×
              </button>
            </div>

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
              ITEMS / EMPTY STATE
          ========================================= */}

          <div
            className="
              min-h-0
              flex-1

              overflow-y-auto

              px-6
              py-7
            "
          >
            {cartItems.length === 0 ? (
              <div
                className="
                  flex
                  min-h-full

                  items-center
                  justify-center

                  px-5
                  py-10

                  text-center
                "
              >
                <div className="w-full max-w-[310px]">

                  {/* Empty Kart icon */}
                  <div
                    className="
                      mx-auto

                      flex
                      h-[82px]
                      w-[82px]

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#D4A24C]/20

                      bg-[radial-gradient(circle,rgba(212,162,76,0.10)_0%,rgba(16,12,9,0.88)_65%)]

                      shadow-[0_0_38px_rgba(212,162,76,0.06)]
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.55"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="
                        h-9
                        w-9

                        text-[#D4A24C]
                      "
                    >
                      <path d="M3 4h2l2.2 9.2a2 2 0 0 0 2 1.6h6.8a2 2 0 0 0 2-1.6L20 7H6" />
                      <circle cx="10" cy="19" r="1.2" />
                      <circle cx="17" cy="19" r="1.2" />
                    </svg>
                  </div>

                  <h3
                    className="
                      font-display

                      mt-7

                      text-[34px]
                      font-semibold
                      leading-tight
                      text-[#F5EAD8]
                    "
                  >
                    Your Kart is Empty
                  </h3>

                  <p
                    className="
                      mx-auto
                      mt-4

                      max-w-[280px]

                      text-[14px]
                      leading-7
                      text-[#928473]
                    "
                  >
                    Add your favourite DesiKart dishes
                    to begin your order.
                  </p>

                  {/* Cinematic Explore Menu */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      group
                      relative

                      mx-auto
                      mt-8

                      flex
                      h-[48px]
                      min-w-[165px]

                      items-center
                      justify-center
                      gap-2.5

                      overflow-hidden

                      rounded-full

                      border
                      border-[#D9A84E]

                      bg-[linear-gradient(110deg,#9D6322_0%,#D7A348_45%,#EDBD61_60%,#A76B25_100%)]
                      bg-[length:200%_100%]

                      px-6

                      text-[13px]
                      font-bold
                      tracking-[0.025em]
                      text-[#120A04]

                      shadow-[0_12px_32px_rgba(212,162,76,0.18),inset_0_1px_0_rgba(255,243,200,0.40)]

                      transition-all
                      duration-500

                      hover:-translate-y-[2px]
                      hover:bg-[position:100%_0%]
                      hover:shadow-[0_18px_40px_rgba(212,162,76,0.30),0_0_24px_rgba(212,162,76,0.10)]
                    "
                  >
                    {/* Metallic light sweep */}
                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        -left-[45%]

                        w-[35%]

                        -skew-x-12

                        bg-white/30

                        blur-sm

                        transition-all
                        duration-700

                        group-hover:left-[125%]
                      "
                    />

                    <span className="relative z-10">
                      Explore Menu
                    </span>

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="
                        relative
                        z-10

                        h-4
                        w-4

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                      "
                    >
                      <path d="M5 12h14" />
                      <path d="m14 7 5 5-5 5" />
                    </svg>
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
              shrink-0

              border-t
              border-[#D4A24C]/12

              bg-[#070503]/88
              backdrop-blur-xl

              px-7

              pb-7
              pt-6
            "
          >
            {/* Subtotal */}
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
                    tracking-[0.15em]
                    text-[#8A7965]
                  "
                >
                  Subtotal
                </p>

                <p
                  className="
                    mt-2

                    text-[11px]
                    leading-5
                    text-[#665A4D]
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

            {/* Bigger separation before checkout */}
            <div className="mt-7">

              <button
                type="button"
                disabled={cartItems.length === 0}
                className="
                  group
                  relative

                  flex
                  h-[54px]
                  w-full

                  items-center
                  justify-center
                  gap-2.5

                  overflow-hidden

                  rounded-full

                  border
                  border-[#E1AF57]

                  bg-[linear-gradient(110deg,#9F6422_0%,#D7A348_45%,#EDBD61_60%,#A96C25_100%)]
                  bg-[length:200%_100%]

                  text-[13px]
                  font-bold
                  uppercase
                  tracking-[0.07em]
                  text-[#120B04]

                  shadow-[0_12px_30px_rgba(212,162,76,0.20)]

                  transition-all
                  duration-500

                  hover:-translate-y-[2px]
                  hover:bg-[position:100%_0%]
                  hover:shadow-[0_18px_42px_rgba(212,162,76,0.30)]

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:translate-y-0
                  disabled:hover:shadow-[0_12px_30px_rgba(212,162,76,0.12)]
                "
              >
                Proceed to Checkout

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="
                    h-4
                    w-4

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                >
                  <path d="M5 12h14" />
                  <path d="m14 7 5 5-5 5" />
                </svg>
              </button>
            </div>

            {/* Much more space below checkout */}
            <p
              className="
                mt-5
                pb-1

                text-center

                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[#685C4D]
              "
            >
              Review your order before checkout
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Cart