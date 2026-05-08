import React from 'react';
import styles from './ShoppingCart.module.css';

function ShoppingCart({ isOpen, cartItems, products, cartTotal, onUpdateQuantity, onRemove, onClose, onCheckout }) {
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Enrich cart items with product data
  const enrichedItems = cartItems.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId),
  })).filter(item => item.product); // safety filter

  return (
    <>
      {/* Sliding Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitle}>
            <svg viewBox="0 0 38 33" fill="none" className={styles.cartIcon} aria-hidden="true">
              <path d="M3 1H6.5L9 21H28L31 7H11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="13" cy="28" r="2.5" fill="currentColor" />
              <circle cx="26" cy="28" r="2.5" fill="currentColor" />
            </svg>
            <h2>
              Shopping Cart
              {itemCount > 0 && <span className={styles.itemBadge}>{itemCount}</span>}
            </h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.drawerBody}>
          {enrichedItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyCartIcon}>🛒</div>
              <p className={styles.emptyCartTitle}>Your Amazon Cart is empty</p>
              <p className={styles.emptyCartSub}>
                Shop today's deals and discover something you'll love.
              </p>
              <button className={styles.continueShopping} onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {enrichedItems.map(({ id, product, quantity }) => (
                <li key={id} className={styles.cartItem}>
                  {/* Product Image */}
                  <div className={styles.itemImageWrap}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.itemImage}
                    />
                  </div>

                  {/* Item Details */}
                  <div className={styles.itemDetails}>
                    <p className={styles.itemTitle}>{product.title}</p>

                    {/* Prime */}
                    {product.prime && (
                      <span className={styles.itemPrime}>prime</span>
                    )}

                    {/* Price */}
                    <p className={styles.itemPrice}>
                      ${(product.price * quantity).toFixed(2)}
                      {quantity > 1 && (
                        <span className={styles.itemUnitPrice}>
                          {' '}(${product.price.toFixed(2)} ea.)
                        </span>
                      )}
                    </p>

                    {/* Quantity Controls */}
                    <div className={styles.qtyRow}>
                      <div className={styles.qtyControls} role="group" aria-label="Quantity">
                        {/* Minus / Trash */}
                        <button
                          className={`${styles.qtyBtn} ${quantity === 1 ? styles.qtyBtnDelete : ''}`}
                          onClick={() => onUpdateQuantity(id, quantity - 1)}
                          aria-label={quantity === 1 ? 'Remove item' : 'Decrease quantity'}
                        >
                          {quantity === 1 ? (
                            // Trash icon when qty would go to 0
                            <svg viewBox="0 0 24 24" fill="none" className={styles.trashIcon} aria-hidden="true">
                              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          ) : (
                            '−'
                          )}
                        </button>

                        <span className={styles.qtyDisplay} aria-live="polite">{quantity}</span>

                        {/* Plus */}
                        <button
                          className={styles.qtyBtn}
                          onClick={() => onUpdateQuantity(id, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete link */}
                      <button
                        className={styles.deleteLink}
                        onClick={() => onRemove(id)}
                        aria-label={`Remove ${product.title} from cart`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {enrichedItems.length > 0 && (
          <div className={styles.drawerFooter}>
            <div className={styles.subtotal}>
              <span>
                Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''}):
              </span>
              <strong className={styles.subtotalPrice}>${cartTotal.toFixed(2)}</strong>
            </div>

            <label className={styles.giftCheck}>
              <input type="checkbox" /> This order contains a gift
            </label>

            <button className={styles.checkoutBtn} onClick={onCheckout}>
              Proceed to Checkout
            </button>

            <button className={styles.continueShopping} onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default ShoppingCart;
