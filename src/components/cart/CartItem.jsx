import { useCart } from "../../context/CartContext";

function Cart({
    open,
    onClose,
}) {

    const {
        cartItems,
        subtotal,
    } = useCart();

    return (
        <>
            {/* Backdrop */}

            <div
                onClick={onClose}
                className={`
fixed inset-0
z-[90]
bg-black/60
backdrop-blur-sm

transition-all duration-500

${open
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"}
`}
            />

            {/* Drawer */}

            <aside
                className={`
fixed
top-0
right-0

z-[100]

flex
h-screen
w-[430px]
max-w-full
flex-col

border-l
border-[#D4A24C]/15

bg-[#090705]

shadow-[-20px_0_70px_rgba(0,0,0,.55)]

transition-transform
duration-500

${open
                        ? "translate-x-0"
                        : "translate-x-full"}
`}
            >

                {/* Header */}

                <div
                    className="
px-8
py-7
border-b
border-[#D4A24C]/10
"
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p
                                className="
text-[11px]
uppercase
tracking-[0.3em]
text-[#C4863F]
"
                            >
                                Your Order
                            </p>

                            <h2
                                className="
font-display
mt-2
text-4xl
text-[#F5EAD8]
"
                            >
                                Your Kart
                            </h2>

                        </div>

                        <button

                            onClick={onClose}

                            className="
text-3xl
text-[#B69E7A]
hover:text-white
transition
"
                        >
                            ×
                        </button>

                    </div>

                </div>

                {/* Items */}

                <div
                    className="
flex-1
overflow-y-auto
px-8
py-8
space-y-5
"
                >

                    {cartItems.length === 0 ? (

                        <div
                            className="
flex
h-full
items-center
justify-center
text-center
"
                        >

                            <div>

                                <h3
                                    className="
font-display
text-3xl
text-[#F5EAD8]
"
                                >
                                    Your Kart is Empty
                                </h3>

                                <p
                                    className="
mt-4
leading-8
text-[#978A79]
"
                                >
                                    Add your favourite
                                    DesiKart dishes to begin
                                    your order.
                                </p>

                            </div>

                        </div>

                    ) : (

                        cartItems.map(item => (

                            <div

                                key={item.id}

                                className="
rounded-2xl
border
border-[#D4A24C]/10
bg-[#120F0B]
p-4
"
                            >

                                <div className="flex gap-4">

                                    <img

                                        src={item.image}

                                        alt={item.name}

                                        className="
h-20
w-20
rounded-xl
object-cover
"
                                    />

                                    <div className="flex-1">

                                        <h3
                                            className="
font-display
text-2xl
text-[#F5EAD8]
"
                                        >
                                            {item.name}
                                        </h3>

                                        <p
                                            className="
mt-1
text-[#C4863F]
font-semibold
"
                                        >
                                            Rs {item.price.toLocaleString()}
                                        </p>

                                        <p
                                            className="
mt-3
text-sm
text-[#8F8376]
"
                                        >
                                            Qty : {item.quantity}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Footer */}

                <div
                    className="
border-t
border-[#D4A24C]/10
px-8
py-7
"
                >

                    <div className="flex justify-between">

                        <span className="text-[#9A8C79]">

                            Subtotal

                        </span>

                        <span
                            className="
font-display
text-3xl
text-[#F5EAD8]
"
                        >
                            Rs {subtotal.toLocaleString()}
                        </span>

                    </div>

                    <button
                        className="
mt-7
flex
h-14
w-full
items-center
justify-center

rounded-full

bg-gradient-to-r
from-[#A96C25]
via-[#D4A24C]
to-[#B97A28]

font-bold
text-[#120B04]

transition
duration-300

hover:scale-[1.02]
"
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </aside>
        </>
    );

}

export default Cart;