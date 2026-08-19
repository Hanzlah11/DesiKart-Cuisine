import React, { useState } from 'react';
import './AiAssistant.css';

// Complete menu database synchronized directly from your menu items
const FULL_MENU_DATABASE = [
  { name: 'Beef Nihari', price: 1250, serving: 'Single Serving' },
  { name: 'Special Nali Beef Nihari', price: 1690, serving: 'Single Serving (Special)' },
  { name: 'Beef Paya', price: 1590, serving: 'Single Serving' },
  { name: 'Special Nali Beef Paya', price: 2090, serving: 'Single Serving (Special)' },
  { name: 'Degi Beef Qorma', price: 1690, serving: 'Single Serving' },
  { name: 'Beef Haleem', price: 890, serving: 'Single Serving' },
  { name: 'Kalay Channay', price: 690, serving: 'Single Serving' },
  { name: 'Chicken Achari', price: 790, serving: 'Single Serving (Weekend Special)' },
  { name: 'Chicken Tikka Leg', price: 690, serving: 'Single Serving' },
  { name: 'Chicken Tikka Chest', price: 690, serving: 'Single Serving' },
  { name: 'Chicken Tikka Boti Half (With Bone)', price: 690, serving: 'Half' },
  { name: 'Chicken Tikka Boti Full (With Bone)', price: 1250, serving: 'Full' },
  { name: 'Chicken Boti Half (Boneless)', price: 890, serving: 'Half' },
  { name: 'Chicken Boti Full (Boneless)', price: 1590, serving: 'Full' },
  { name: 'Kalay Channay (Family Deal)', price: 1590, serving: 'Family Deal' },
  { name: 'Beef Haleem (Family Deal)', price: 2290, serving: 'Family Deal' },
  { name: 'Degi Beef Qorma (Family Deal)', price: 4990, serving: 'Family Deal' },
  { name: 'Chinioti Mutton Kunna (Family Deal)', price: 5990, serving: 'Family Deal (4-5 Persons)' },
  { name: 'Chicken Achari (Family Deal)', price: 2390, serving: 'Family Deal' },
  { name: 'Special Nali Beef Nihari (Family Deal)', price: 5590, serving: 'Family Deal (4-5 Persons)' },
  { name: 'Beef Paya (Family Deal)', price: 4990, serving: 'Family Deal (4-5 Persons)' },
  { name: 'Special Nali Beef Paya (Family Deal)', price: 6490, serving: 'Family Deal (4-5 Persons)' },
  { name: 'Plain Naan', price: 50, serving: 'Add-on' },
  { name: 'Roghni Naan', price: 120, serving: 'Add-on' },
  { name: 'Garlic Naan', price: 95, serving: 'Add-on' },
  { name: 'Zeera Raita', price: 160, serving: 'Add-on' },
  { name: 'Pudina Raita', price: 160, serving: 'Add-on' },
  { name: 'Mixed Pickle', price: 70, serving: 'Add-on' },
  { name: 'Mineral Water 500ml', price: 80, serving: 'Add-on' },
  { name: 'Soft Drink 250ml Can', price: 140, serving: 'Add-on' }
];

const AiAssistant = ({ onOpenCart, onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Assalam-o-Alaikum! Welcome to DesiKart Cuisine. Ask me about any dish price, delivery charges, or tell me where you want to navigate!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let aiReply = "I'm not quite sure about that. Try asking for a dish price (e.g., 'How much is Beef Nihari?'), or type 'menu', 'contact', or 'footer'.";
      
      // Universal Normalization: strip punctuation, lowercase, clean spacing
      const cleanInput = userText.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();

      // 1. Navigation Actions
      if (cleanInput.includes('home') || cleanInput.includes('top')) {
        aiReply = "Taking you right to the top!";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanInput.includes('menu') || cleanInput.includes('food') || cleanInput.includes('dishes')) {
        aiReply = "Navigating straight to our royal menu!";
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
      } else if (cleanInput.includes('promise') || cleanInput.includes('quality')) {
        aiReply = "Here is our commitment to pure quality.";
        document.getElementById('promise')?.scrollIntoView({ behavior: 'smooth' });
      } else if (cleanInput.includes('story') || cleanInput.includes('about')) {
        aiReply = "Showing you our brand story.";
        document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
      } else if (cleanInput.includes('contact') || cleanInput.includes('location')) {
        aiReply = "Taking you to our contact details.";
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else if (cleanInput.includes('footer') || cleanInput.includes('bottom')) {
        aiReply = "Scrolling straight down to the footer!";
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      } 
      // 2. Cart & Orders
      else if (cleanInput.includes('cart') || cleanInput.includes('order')) {
        aiReply = "Opening your cart drawer!";
        onOpenCart();
      } 
      // 3. Login / Authentication
      else if (cleanInput.includes('account') || cleanInput.includes('login') || cleanInput.includes('signup') || cleanInput.includes('register')) {
        aiReply = "Opening your account options.";
        onOpenAuth();
      } 
      // 4. Delivery Fees
      else if (cleanInput.includes('delivery') || cleanInput.includes('fee') || cleanInput.includes('charges') || cleanInput.includes('cost')) {
        aiReply = "Our standard delivery fee is a flat Rs. 200 across all our delivery areas.";
      } 
      // 5. Universal Dish Price Search
      else {
        const matchedDish = FULL_MENU_DATABASE.find(dish => {
          const cleanDishName = dish.name.toLowerCase().replace(/[^\w\s]/gi, '');
          // Check if full name or substantial keywords match user query
          return cleanInput.includes(cleanDishName) || 
                 cleanDishName.split(' ').some(word => word.length > 2 && cleanInput.includes(word));
        });

        if (matchedDish) {
          aiReply = `Our ${matchedDish.name} (${matchedDish.serving}) is priced at Rs. ${matchedDish.price}. Would you like to add it to your order?`;
        }
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  return (
    <div className="ai-assistant-container">
      {!isOpen && (
        <button className="ai-trigger-btn" onClick={() => setIsOpen(true)} aria-label="Open AI Assistant">
          AI Assistant
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <h3>DESIKART <span className="text-yellow">AI ASSISTANT</span></h3>
            <button onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          <div className="ai-chat-body">
            {messages.map((m, index) => (
              <div key={index} className={`ai-message ${m.sender}`}>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="ai-chat-input-form">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask a dish price, or say 'take me to footer'..." 
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;