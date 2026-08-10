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
import { auth, db, doc, getDoc, onAuthStateChanged, signOut } from './firebase';

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
      executeWhatsAppCheckout(userData);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const executeWhatsAppCheckout = (profile) => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const deliveryFee = 200;
    const total = subtotal + deliveryFee;

    let message = `*New Verified Order - DesiKart Cuisine*\n\n`;
    message += `*Customer Name:* ${profile.name}\n`;
    message += `*Phone Number:* ${profile.phone}\n`;
    message += `*Email Account:* ${profile.email || currentUser?.email}\n\n`;
    message += `*Items Ordered:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.serving}) x${item.quantity || 1} - Rs. ${item.price * (item.quantity || 1)}\n`;
    });

    message += `\n*Subtotal:* Rs. ${subtotal}`;
    message += `\n*Delivery Fee:* Rs. ${deliveryFee}`;
    message += `\n*Total Amount:* Rs. ${total}`;
    message += `\n\nPlease confirm my order!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/923316667054?text=${encodedMessage}`, '_blank');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

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

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutClick}
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