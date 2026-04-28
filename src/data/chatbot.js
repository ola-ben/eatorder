// Knowledge base for the EatOrder chatbot.
// Each entry has keywords (used by the matcher) and a friendly answer.
// Add new entries here to extend the bot's knowledge.

export const knowledgeBase = [
  // ─────────── Greetings ───────────
  {
    id: "greet",
    keywords: ["hi", "hello", "hey", "yo", "good morning", "good afternoon", "good evening"],
    answer:
      "Hi, I'm Benjamin's Assistant 👋 Ask me about delivery, restaurants, dishes, your cart, or your account.",
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thx", "ty", "appreciate"],
    answer: "You're welcome! Hungry yet? 😋",
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "later"],
    answer: "Catch you later 🍽️ Enjoy your meal!",
  },

  // ─────────── Delivery & Logistics ───────────
  {
    id: "delivery-time",
    keywords: [
      "delivery time", "how long delivery", "how long does delivery take",
      "when will my order arrive", "eta", "delivery duration", "fast delivery",
    ],
    answer:
      "Delivery typically takes **15–45 minutes** depending on the restaurant and distance. Most restaurants near you deliver in **20–30 mins**. You'll see the exact range on each restaurant card.",
  },
  {
    id: "delivery-fee",
    keywords: [
      "delivery fee", "delivery cost", "how much delivery", "shipping cost",
      "delivery charge", "delivery price",
    ],
    answer:
      "Delivery fees range from **₦450–₦800**, based on the restaurant's distance from you. The exact fee shows on each restaurant card before you order.",
  },
  {
    id: "free-delivery",
    keywords: [
      "free delivery", "no delivery fee", "discount delivery", "skip delivery fee",
    ],
    answer:
      "Spend **₦7,000 or more** in a single order and your delivery is **free** 🎉 You'll see a progress hint on the cart page when you're close.",
  },
  {
    id: "delivery-area",
    keywords: [
      "where do you deliver", "delivery area", "delivery location", "do you deliver to",
      "service area", "available in",
    ],
    answer:
      "We currently deliver around **Iwo Road, Ibadan** and nearby areas. Check the app — if a restaurant shows up for you, we deliver there.",
  },
  {
    id: "pickup",
    keywords: ["pickup", "pick up", "self pickup", "collect myself", "no delivery"],
    answer:
      "Yes, you can choose **Pickup** at checkout instead of delivery — no delivery fee, just collect your order from the restaurant.",
  },

  // ─────────── Hours & Contact ───────────
  {
    id: "hours",
    keywords: [
      "opening hours", "open time", "closing time", "what time", "are you open",
      "operating hours", "hours of operation", "when do you open", "when do you close",
    ],
    answer: "We're open **9:00 AM – 10:00 PM**, every day. Some restaurants close earlier — check their card.",
  },
  {
    id: "contact",
    keywords: [
      "contact", "phone number", "call you", "support number", "customer service",
      "reach you", "talk to a person",
    ],
    answer:
      "Reach our support team on **+234 706-302-6384** — 24/7. You can also email **support@eatorder.app**.",
  },

  // ─────────── Restaurants & Recommendations ───────────
  {
    id: "list-restaurants",
    keywords: [
      "what restaurants", "which restaurants", "list of restaurants", "all restaurants",
      "available restaurants", "show restaurants", "what places",
    ],
    answer:
      "We've got **15+ restaurants** including Item 7 Go Iwo Road, Shrider Store, Taste of Lagos, Buka Joint, Spice Route, Chicken Republic, Domino's Pizza, KFC, Suya Kingdom, Jollof Pot and more. Tap **Browse** to see the full list.",
  },
  {
    id: "best-jollof",
    keywords: [
      "best jollof", "good jollof", "where jollof", "jollof rice", "party jollof",
      "best rice",
    ],
    answer:
      "For jollof, try **Taste of Lagos** (4.8⭐) or **Jollof Pot** (4.8⭐) — they specialize in party-style jollof. **Item 7 Go Iwo Road** also serves a great jollof + chicken combo.",
  },
  {
    id: "best-amala",
    keywords: [
      "best amala", "good amala", "amala", "ewedu", "abula", "soup", "swallow",
    ],
    answer:
      "**Shrider Store** (5.0⭐) is the spot for amala, eba, pounded yam and soups. Their amala & beans soup is a customer favourite.",
  },
  {
    id: "best-chicken",
    keywords: [
      "best chicken", "fried chicken", "good chicken", "chicken wings", "wings",
    ],
    answer:
      "For chicken, **Chicken Republic** (4.4⭐) and **KFC** (4.3⭐) are crowd favourites. **Spice Route** does excellent peri-peri grilled chicken.",
  },
  {
    id: "best-pizza",
    keywords: ["pizza", "best pizza", "margherita", "pepperoni"],
    answer:
      "**Domino's Pizza** (4.6⭐) is the go-to for pizza — try the Margherita or Pepperoni. They've got a 50% off deal on a 2nd pizza.",
  },
  {
    id: "best-fish",
    keywords: ["fish", "grilled fish", "tilapia", "catfish", "best fish"],
    answer:
      "**Fish Lovers Spot** (4.6⭐) for grilled tilapia and catfish, or **Taste of Lagos** for grilled fish with their special pepper sauce.",
  },
  {
    id: "best-suya",
    keywords: ["suya", "grilled meat", "best suya", "spicy meat"],
    answer:
      "**Suya Kingdom** (4.9⭐) — peppery, smoky, exactly what suya should be. They throw in extra pepper for free.",
  },
  {
    id: "best-burgers",
    keywords: ["burger", "burgers", "best burger"],
    answer:
      "Try the **Zinger Burger** at KFC, the **Chicken Burger** at Chicken Republic, or **Tantalizers** for combo deals.",
  },
  {
    id: "vegetarian",
    keywords: ["vegetarian", "vegan", "no meat", "plant based"],
    answer:
      "Limited vegetarian options for now — **Moi Moi** at Shrider Store, **French Fries** at Chicken Republic, **Garlic Bread** at Domino's, and most sides at Sweet Sensation. We're working on more.",
  },
  {
    id: "drinks",
    keywords: ["drinks", "soda", "beverage", "coke", "fanta", "sprite"],
    answer:
      "Most restaurants have drinks — Coke, Fanta, Sprite (₦500–₦1,000). Open any restaurant menu and tap **Extras & Drinks**.",
  },
  {
    id: "cheap",
    keywords: [
      "cheap", "cheapest", "affordable", "budget", "low price", "under 1000",
      "under 2000", "small budget",
    ],
    answer:
      "On a budget? **Moi Moi** (₦500–₦700) at Shrider Store, **French Fries** (₦800) at Chicken Republic, **Garlic Bread** (₦1,200) at Domino's, or **Pounded Yam** (₦900) are all under ₦1,500.",
  },
  {
    id: "fastest",
    keywords: [
      "fastest", "quick delivery", "fastest delivery", "shortest time",
      "in a hurry", "rush",
    ],
    answer:
      "Fastest options near you: **Shrider Store** (15–25 mins), **Mama Put** (15–25 mins), **Suya Kingdom** (15–25 mins). Tap **Browse → Fastest** to sort.",
  },

  // ─────────── Cart ───────────
  {
    id: "add-to-cart",
    keywords: ["add to cart", "how to order", "place order", "how do i order"],
    answer:
      "Open any restaurant, tap the **+** on a dish to add it. Manage quantities from the cart icon — top right on desktop, bottom nav on mobile.",
  },
  {
    id: "max-quantity",
    keywords: [
      "max quantity", "maximum items", "how many can i order", "limit items",
      "quantity limit",
    ],
    answer: "You can add up to **10 of the same item** per order. Beyond that, place a separate order or contact support.",
  },
  {
    id: "clear-cart",
    keywords: ["clear cart", "empty cart", "remove all items", "delete cart"],
    answer: "Open the cart and tap **Clear** in the top-right. Or remove items one by one with the – button.",
  },
  {
    id: "minimum-order",
    keywords: ["minimum order", "min order", "smallest order", "order minimum"],
    answer: "There's no minimum order — but free delivery kicks in at **₦7,000**.",
  },

  // ─────────── Account / Auth ───────────
  {
    id: "signup",
    keywords: ["sign up", "signup", "create account", "register", "new account"],
    answer:
      "Tap **Account → Sign in / Sign Up** and switch to the Sign Up tab. You'll need an email and a password (6+ characters).",
  },
  {
    id: "login",
    keywords: ["log in", "login", "sign in", "access my account"],
    answer: "Tap **Account** in the bottom nav (or the Sign in button on desktop) and enter your email + password.",
  },
  {
    id: "forgot-password",
    keywords: ["forgot password", "reset password", "lost password", "can't login"],
    answer:
      "On the login page, tap **Forgot password?** Enter your email and we'll send a reset link. Check your spam folder if you don't see it.",
  },
  {
    id: "logout",
    keywords: ["logout", "log out", "sign out"],
    answer: "Go to **Account** → scroll down → tap **Log Out**.",
  },
  {
    id: "delete-account",
    keywords: ["delete account", "remove account", "close account"],
    answer:
      "**Account → Delete Account**. This signs you out. To fully delete your data, contact support — we're required to handle this manually for security.",
  },

  // ─────────── Orders ───────────
  {
    id: "track-order",
    keywords: ["track order", "where is my order", "order status", "track delivery"],
    answer:
      "Tap **Orders** in the bottom nav. Each order shows its current status — Processing, Pending, or Delivered. You'll get a call from the rider when they're close.",
  },
  {
    id: "reorder",
    keywords: ["reorder", "order again", "repeat order", "same order"],
    answer:
      "Open **Orders**, find the past order, expand it, and tap **Reorder** to drop the same items into your cart.",
  },
  {
    id: "cancel-order",
    keywords: ["cancel order", "cancel my order", "stop my order"],
    answer:
      "If your order hasn't been confirmed by the restaurant yet, call us on **+234 706-302-6384** to cancel. Once it's being prepared, we can't cancel.",
  },
  {
    id: "refund",
    keywords: ["refund", "money back", "wrong order", "missing item", "complaint"],
    answer:
      "Sorry about that 😞 Call **+234 706-302-6384** with your order number and the issue — refunds for wrong/missing items are processed within **24–48 hours**.",
  },

  // ─────────── Favourites ───────────
  {
    id: "save-favourites",
    keywords: ["save restaurant", "add favourite", "favourite restaurant", "bookmark"],
    answer: "Tap the **♡ heart** on any restaurant card to save it. View all saved spots under **Saved** in the bottom nav.",
  },
  {
    id: "view-favourites",
    keywords: ["my favourites", "saved restaurants", "favourites list", "where favourites"],
    answer: "Tap the **heart icon** in the top bar (or the **Saved** tab in the bottom nav).",
  },

  // ─────────── Payment ───────────
  {
    id: "payment-methods",
    keywords: [
      "payment", "payment methods", "how to pay", "card", "cash", "transfer",
      "bank transfer", "pay with",
    ],
    answer:
      "We accept **debit/credit card**, **bank transfer**, and **cash on delivery**. You'll choose at checkout.",
  },
  {
    id: "is-it-safe",
    keywords: ["is it safe", "safe to pay", "secure", "data secure", "my data"],
    answer:
      "Yes — payments are encrypted, and we never store your card details on our servers. Your account uses secure session tokens, not passwords sitting in localStorage.",
  },

  // ─────────── Promos ───────────
  {
    id: "promos",
    keywords: ["promo", "discount", "offer", "deal", "coupon", "promo code", "voucher"],
    answer:
      "Look for the **promo banner** on each restaurant card — e.g. \"Free drink on first order\", \"10% off\", \"Buy 1 Get 1 Free\". They auto-apply at checkout.",
  },
  {
    id: "referral",
    keywords: ["referral", "refer a friend", "invite", "referral code", "earn"],
    answer:
      "Yes! Go to **Account → Referrals**. Share your code — every friend who signs up earns you both ₦500 in cashback.",
  },

  // ─────────── About ───────────
  {
    id: "what-is-eatorder",
    keywords: [
      "what is eatorder", "about you", "what app", "who are you", "what is this app",
    ],
    answer:
      "**EatOrder** is a food delivery app for Ibadan, Nigeria. We connect you to **15+ local and chain restaurants** — order in 2 taps, pay how you like, eat fast.",
  },
];

// ─────────── Suggested questions (shown when chat is empty) ───────────
export const suggestedQuestions = [
  "How long does delivery take?",
  "Do you do free delivery?",
  "Best jollof rice?",
  "What payment methods?",
  "How do I track my order?",
  "Where are my favourites?",
];

// ─────────── Tokenizer + matcher ───────────
const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "have", "has", "had", "of", "to", "from", "for",
  "with", "in", "on", "at", "by", "as", "and", "or", "but", "if", "so",
  "i", "you", "we", "they", "me", "us", "them", "my", "your", "our",
  "this", "that", "these", "those", "what", "which", "who", "whom",
  "where", "when", "why", "how", "can", "could", "should", "would",
  "will", "shall", "may", "might", "tell", "show", "give", "want", "wants",
  "please", "thanks", "ok", "okay", "yes", "no",
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
}

export function findAnswer(query) {
  if (!query || !query.trim()) return null;
  const queryLower = query.toLowerCase();
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return null;

  let best = { score: 0, entry: null };

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const kwLower = keyword.toLowerCase();
      // Exact phrase boost
      if (queryLower.includes(kwLower)) {
        score += 6 + kwLower.length * 0.05;
        continue;
      }
      // Token overlap
      const kwTokens = tokenize(keyword);
      if (kwTokens.length === 0) continue;
      const matches = kwTokens.filter((t) => queryTokens.includes(t)).length;
      if (matches === 0) continue;
      // Weight: how much of the keyword phrase matched
      score += (matches / kwTokens.length) * 2;
    }
    if (score > best.score) best = { score, entry };
  }

  // Threshold: must match enough to be confident
  if (best.score < 1.2) return null;
  return best.entry;
}

export const fallbackResponses = [
  "I'm not sure about that one 🤔 Try asking about delivery, restaurants, payment, or your account — or call us on +234 706-302-6384.",
  "Hmm, I don't have that in my brain yet. Want to try one of the suggested questions, or call support on +234 706-302-6384?",
  "That's outside my menu 🍽️ I can help with deliveries, restaurants, dishes, your cart, or your account.",
];

export function pickFallback() {
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}
