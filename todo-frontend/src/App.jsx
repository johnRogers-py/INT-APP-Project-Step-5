import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Card from './components/Card';
import ShoppingCart from './components/ShoppingCart';
import BuyItNow from './components/BuyItNow';
import ReturnsOrders from './components/ReturnsOrders';
import SignIn from './components/SignIn';
import CustomerService from './components/CustomerService';
import ProtectionPlans from './components/ProtectionPlans';
import GiftCards from './components/GiftCards';
import Checkout from './components/Checkout';
import styles from './App.module.css';

const PRODUCTS_URL = 'http://localhost:3001/products';
const CART_URL = 'http://localhost:3001/cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products and cart on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCart()]);
      setLoading(false);
    };
    loadData();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch(PRODUCTS_URL);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchCart() {
    try {
      const res = await fetch(CART_URL);
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    }
  }

  // CREATE — add item to cart (or increment if already present)
  async function addToCart(product) {
    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
      await updateCartQuantity(existing.id, existing.quantity + 1);
    } else {
      try {
        const res = await fetch(CART_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });
        if (!res.ok) throw new Error('Failed to add to cart');
        const newItem = await res.json();
        setCart(prev => [...prev, newItem]);
      } catch (err) {
        setError(err.message);
      }
    }
  }

  // UPDATE — change quantity of a cart item
  async function updateCartQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) {
      await removeFromCart(cartItemId);
      return;
    }
    try {
      const res = await fetch(`${CART_URL}/${cartItemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) throw new Error('Failed to update cart');
      const updated = await res.json();
      setCart(prev => prev.map(item => (item.id === cartItemId ? updated : item)));
    } catch (err) {
      setError(err.message);
    }
  }

  // DELETE — remove item from cart
  async function removeFromCart(cartItemId) {
    try {
      const res = await fetch(`${CART_URL}/${cartItemId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to remove from cart');
      setCart(prev => prev.filter(item => item.id !== cartItemId));
    } catch (err) {
      setError(err.message);
    }
  }

  // Derived state
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0; // featured — keep original order
    });

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  // Page navigation helpers
  function goToBuyNow(product) {
    setSelectedProduct(product);
    setCurrentPage('buy-now');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToReturnsOrders() {
    setCurrentPage('returns-orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToSignIn() {
    setCurrentPage('sign-in');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToCustomerService() {
    setCurrentPage('customer-service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToProtectionPlans() {
    setCurrentPage('protection-plans');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToGiftCards() {
    setCurrentPage('gift-cards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToCheckout() {
    setCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToShop() {
    setCurrentPage('shop');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Render alternate pages
  if (currentPage === 'buy-now' && selectedProduct) {
    return (
      <BuyItNow
        product={selectedProduct}
        onBack={goToShop}
        onAddToCart={addToCart}
      />
    );
  }
  if (currentPage === 'returns-orders') return <ReturnsOrders onBack={goToShop} />;
  if (currentPage === 'sign-in') return <SignIn onBack={goToShop} />;
  if (currentPage === 'customer-service') return <CustomerService onBack={goToShop} />;
  if (currentPage === 'protection-plans') return <ProtectionPlans onBack={goToShop} />;
  if (currentPage === 'gift-cards') return <GiftCards onBack={goToShop} />;
  if (currentPage === 'checkout') return (
    <Checkout
      cartItems={cart}
      products={products}
      cartTotal={cartTotal}
      onBack={goToShop}
      onPlaceOrder={() => setCart([])}
    />
  );

  return (
    <div className={styles.app}>
      <NavBar
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartToggle={() => setCartOpen(open => !open)}
        onReturnsOrders={goToReturnsOrders}
        onSignIn={goToSignIn}
        onCustomerService={goToCustomerService}
        onProtectionPlans={goToProtectionPlans}
        onGiftCards={goToGiftCards}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Shop Today's Deals</h1>
          <p>Free delivery on millions of items with Prime</p>
          <button className={styles.heroCta}>Shop Now</button>
        </div>
      </div>

      {/* Category Pills */}
      <div className={styles.categoryBar}>
        <div className={styles.categoryInner}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.catPill} ${activeCategory === cat ? styles.catPillActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        {error && (
          <div className={`alert alert-warning ${styles.errorAlert}`} role="alert">
            <strong>⚠ Backend not detected.</strong> Start your JSON Server:{' '}
            <code>cd todo-backend &amp;&amp; npm start</code>
          </div>
        )}

        {/* Sort / Results header */}
        {!loading && (
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && <> for <em>"{searchQuery}"</em></>}
              {activeCategory !== 'All' && <> in <em>{activeCategory}</em></>}
            </span>
            <div className={styles.sortWrap}>
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                className={styles.sortSelect}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        )}

        {loading ? (
          <div className={styles.loadingWrap}>
            <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className={styles.loadingText}>Loading products…</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={styles.noResults}>
            <span className={styles.noResultsIcon}>🔍</span>
            <h3>No results for "{searchQuery}"</h3>
            <p>Try checking your spelling or use more general terms.</p>
            <button className={styles.clearBtn} onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
            {filteredProducts.map(product => {
              const cartItem = cart.find(item => item.productId === product.id);
              return (
                <div className="col" key={product.id}>
                  <Card
                    product={product}
                    onAddToCart={addToCart}
                    onBuyNow={goToBuyNow}
                    cartQuantity={cartItem ? cartItem.quantity : 0}
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        isOpen={cartOpen}
        cartItems={cart}
        products={products}
        cartTotal={cartTotal}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onClose={() => setCartOpen(false)}
        onCheckout={goToCheckout}
      />

      {/* Overlay */}
      {cartOpen && (
        <div className={styles.overlay} onClick={() => setCartOpen(false)} />
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <a href="#top" className={styles.backToTop} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Back to top
          </a>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerLogo}>amazon<span>.clone</span></p>
          <p>© 2024, AmazonClone.com, Inc. or its affiliates</p>
          <p>Built with React, Bootstrap, and JSON Server</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
