import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Promise from './components/Promise';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import EmailAuthModal from './components/EmailAuthModal';
import UserProfileModal from './components/UserProfileModal';
import AiAssistant from './components/AiAssistant';
import { formatPrice } from './data/menu';
import { 
  auth, 
  db, 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  serverTimestamp, 
  onAuthStateChanged, 
  signOut 
} from './firebase';
import { generateAndDownloadInvoice } from './utils/invoiceGenerator';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (dish) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckoutClick = () => {
    if (!currentUser || !userData) {
      setIsAuthModalOpen(true);
    } else {
      executeRestaurantWhatsAppCheckout(userData);
    }
  };

  const handleDirectCustomerInvoice = () => {
    if (cartItems.length === 0) return;

    if (!currentUser || !userData) {
      setIsAuthModalOpen(true);
      return;
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const deliveryFee = 200;
    const total = subtotal + deliveryFee;
    const orderId = Date.now().toString().slice(-6);

    const orderPayload = {
      orderId,
      customerName: userData?.name || "Valued Customer",
      phone: userData?.phone || "",
      email: userData?.email || currentUser?.email || "",
      items: cartItems,
      subtotal,
      deliveryFee,
      total
    };

    // 1. Download PDF to device
    generateAndDownloadInvoice(orderPayload);

    // 2. Format invoice text for customer's WhatsApp
    let message = `*DESIKART CUISINE - INVOICE RECEIPT*\n`;
    message += `*Invoice Ref:* #${orderId}\n`;
    message += `*Customer:* ${orderPayload.customerName}\n`;
    message += `*Date:* ${new Date().toLocaleDateString()}\n\n`;
    message += `*Order Breakdown:*\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.serving || 'Standard'}) x${item.quantity || 1} — Rs. ${item.price * (item.quantity || 1)}\n`;
    });

    message += `\n*Subtotal:* Rs. ${subtotal}`;
    message += `\n*Delivery Fee:* Rs. ${deliveryFee}`;
    message += `\n*Total Paid/Due:* Rs. ${total}`;
    message += `\n\n_A PDF copy of this invoice has been downloaded to your device._`;
    message += `\nThank you for choosing DesiKart Cuisine!`;

    // 3. Format customer phone
    let cleanPhone = (orderPayload.phone || "").replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "92" + cleanPhone.slice(1);
    }

    const encodedMessage = encodeURIComponent(message);
    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
    } else {
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }
  };

  const executeRestaurantWhatsAppCheckout = async (profile) => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const deliveryFee = 200;
    const total = subtotal + deliveryFee;
    const orderTimestampId = Date.now().toString().slice(-6);

    const orderPayload = {
      orderId: orderTimestampId,
      customerName: profile.name || "Customer",
      phone: profile.phone || "N/A",
      email: profile.email || currentUser?.email || "N/A",
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      status: "pending",
      createdAt: serverTimestamp()
    };

    // 1. Log to Firestore
    try {
      await addDoc(collection(db, "orders"), orderPayload);
    } catch (err) {
      console.error("Firestore Order Log Error:", err);
    }

    // 2. Download PDF Invoice
    generateAndDownloadInvoice(orderPayload);

    // 3. Send Order to Restaurant WhatsApp
    let message = `*New Order Placed - DesiKart Cuisine*\n`;
    message += `*Order Ref:* #${orderTimestampId}\n\n`;
    message += `*Customer Name:* ${orderPayload.customerName}\n`;
    message += `*Phone:* ${orderPayload.phone}\n`;
    message += `*Email:* ${orderPayload.email}\n\n`;
    message += `*Items Ordered:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.serving || 'Standard'}) x${item.quantity || 1} - Rs. ${item.price * (item.quantity || 1)}\n`;
    });

    message += `\n*Subtotal:* Rs. ${subtotal}`;
    message += `\n*Delivery Fee:* Rs. ${deliveryFee}`;
    message += `\n*Total Amount:* Rs. ${total}`;
    message += `\n\n📄 _PDF Invoice has been auto-generated & saved to customer device._`;
    message += `\n\nPlease confirm my order!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/923115077779?text=${encodedMessage}`, '_blank');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalCartAmount = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0) + (cartItems.length > 0 ? 200 : 0);

  return (
    <div className="app">
      <Header 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentUser={currentUser}
        userData={userData}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onSignOut={handleSignOut}
      />

      <main style={{ paddingTop: '85px' }}>
        <Hero />
        <Menu onAddToCart={handleAddToCart} />
        <Promise />
        <Story />
        <Contact 
          currentUser={currentUser}
          userData={userData}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      </main>

      <Footer />

      {!isCartOpen && cartItems.length > 0 && (
        <div 
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1a1a1a',
            border: '1px solid #c5a059',
            borderRadius: '50px',
            padding: '10px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)',
            cursor: 'pointer',
            zIndex: 1500,
            transition: 'transform 0.2s ease',
          }}
        >
          <span style={{ background: '#d23214', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            {totalCartCount}
          </span>
          <span style={{ color: '#fff9e6', fontSize: '0.9rem', fontWeight: '600' }}>
            {formatPrice(totalCartAmount)}
          </span>
          <span style={{ color: '#f4ba3f', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px' }}>
            VIEW CART →
          </span>
        </div>
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onCheckout={handleCheckoutClick}
        onDownloadInvoice={handleDirectCustomerInvoice}
      />

      <EmailAuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(verifiedProfile) => {
          setUserData(verifiedProfile);
        }}
      />

      <UserProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        userData={userData}
        onProfileUpdated={(updated) => setUserData(updated)}
      />

      <AiAssistant 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />
    </div>
  );
}

export default App;