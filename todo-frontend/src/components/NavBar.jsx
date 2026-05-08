import React from 'react';
import SearchBar from './SearchBar';
import styles from './NavBar.module.css';

function NavBar({
  cartCount, searchQuery, onSearchChange, onCartToggle,
  onReturnsOrders, onSignIn, onCustomerService, onProtectionPlans, onGiftCards,
  categories, activeCategory, onCategoryChange
}) {
  return (
    <header className={styles.header}>
      {/* ── Primary Nav ── */}
      <nav className={styles.primaryNav} aria-label="Primary navigation">
        <div className={styles.primaryInner}>

          {/* Logo */}
          <a href="/" className={styles.logo} aria-label="AmazonClone home">
            <span className={styles.logoAmazon}>amazon</span>
            <span className={styles.logoDomain}>.clone</span>
          </a>

          {/* Deliver To */}
          <div className={styles.location}>
            <span className={styles.locationPin} aria-hidden="true">📍</span>
            <div>
              <div className={styles.locationSub}>Deliver to</div>
              <div className={styles.locationMain}>United States</div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />

          {/* Account & Lists */}
          <button className={styles.navBtn} aria-label="Account and lists" onClick={onSignIn}>
            <div className={styles.navBtnSub}>Hello, Sign in</div>
            <div className={styles.navBtnMain}>
              Account &amp; Lists&nbsp;▾
            </div>
          </button>

          {/* Returns & Orders */}
          <button className={styles.navBtn} aria-label="Returns and orders" onClick={onReturnsOrders}>
            <div className={styles.navBtnSub}>Returns</div>
            <div className={styles.navBtnMain}>&amp; Orders</div>
          </button>

          {/* Cart */}
          <button
            className={styles.cartBtn}
            onClick={onCartToggle}
            aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          >
            <div className={styles.cartIconWrap}>
              <svg className={styles.cartSvg} viewBox="0 0 38 33" fill="none" aria-hidden="true">
                <path
                  d="M3 1H6.5L9 21H28L31 7H11"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                />
                <circle cx="13" cy="28" r="2.5" fill="currentColor" />
                <circle cx="26" cy="28" r="2.5" fill="currentColor" />
              </svg>
              <span className={styles.cartCount} aria-hidden="true">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            </div>
            <span className={styles.cartLabel}>Cart</span>
          </button>
        </div>
      </nav>

      {/* ── Secondary Nav ── */}
      <nav className={styles.secondaryNav} aria-label="Secondary navigation">
        <div className={styles.secondaryInner}>
          <button className={styles.allMenuBtn}>
            <span className={styles.hamburger}>☰</span> All
          </button>
          <button className={styles.secNavLink} onClick={onCustomerService}>Customer Service</button>
          <button className={styles.secNavLink} onClick={onGiftCards}>Gift Cards</button>
          <button className={styles.secNavLinkHighlight} onClick={onProtectionPlans}>🛡 Protection Plans</button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
