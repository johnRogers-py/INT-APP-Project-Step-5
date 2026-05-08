import React, { useState } from 'react';
import styles from './BuyItNow.module.css';

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<span key={i} className={styles.starFull}>★</span>);
    else if (rating >= i - 0.5) stars.push(<span key={i} className={styles.starHalf}>★</span>);
    else stars.push(<span key={i} className={styles.starEmpty}>★</span>);
  }
  return <span className={styles.stars}>{stars}</span>;
}

function BuyItNow({ product, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState({
    name: 'John Rogers',
    line1: '123 Main Street',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
  });
  const [editingAddress, setEditingAddress] = useState(false);
  const [paymentLast4] = useState('4242');

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const subtotal = (product.price * quantity).toFixed(2);
  const shipping = product.prime ? '0.00' : '5.99';
  const tax = ((parseFloat(subtotal) + parseFloat(shipping)) * 0.08).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax)).toFixed(2);

  if (placed) {
    return (
      <div className={styles.page}>
        <div className={styles.confirmWrap}>
          <div className={styles.confirmIcon}>✓</div>
          <h1 className={styles.confirmTitle}>Order Placed!</h1>
          <p className={styles.confirmSub}>
            Thank you, {address.name.split(' ')[0]}. Your order has been placed and will arrive in{' '}
            <strong>2–4 business days</strong>.
          </p>
          <p className={styles.confirmDetail}>
            A confirmation will be sent to your email address.
          </p>
          <div className={styles.confirmProduct}>
            <img src={product.image} alt={product.title} className={styles.confirmImg} />
            <div>
              <p className={styles.confirmProductTitle}>{product.title}</p>
              <p className={styles.confirmProductPrice}>
                ${product.price.toFixed(2)} × {quantity} = <strong>${subtotal}</strong>
              </p>
            </div>
          </div>
          <div className={styles.confirmActions}>
            <button className={styles.btnPrimary} onClick={onBack}>
              Continue Shopping
            </button>
            <button className={styles.btnSecondary} onClick={onBack}>
              View Returns &amp; Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back to results
        </button>
        <h1 className={styles.pageTitle}>Review your order</h1>
      </div>

      <div className={styles.layout}>
        {/* Left Column */}
        <div className={styles.leftCol}>

          {/* Delivery Address */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}><span className={styles.stepNum}>1</span> Shipping address</h2>
              <button className={styles.changeBtn} onClick={() => setEditingAddress(v => !v)}>
                {editingAddress ? 'Save' : 'Change'}
              </button>
            </div>
            {editingAddress ? (
              <div className={styles.addressForm}>
                {[['name', 'Full name'], ['line1', 'Address'], ['city', 'City'], ['state', 'State'], ['zip', 'ZIP']].map(([field, label]) => (
                  <label key={field} className={styles.formLabel}>
                    {label}
                    <input
                      className={styles.formInput}
                      value={address[field]}
                      onChange={e => setAddress(prev => ({ ...prev, [field]: e.target.value }))}
                    />
                  </label>
                ))}
              </div>
            ) : (
              <div className={styles.addressDisplay}>
                <strong>{address.name}</strong>
                <span>{address.line1}</span>
                <span>{address.city}, {address.state} {address.zip}</span>
                {product.prime && <span className={styles.primeDelivery}>⚡ FREE Prime Delivery — arrives in 2 days</span>}
              </div>
            )}
          </section>

          {/* Payment Method */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}><span className={styles.stepNum}>2</span> Payment method</h2>
              <button className={styles.changeBtn}>Change</button>
            </div>
            <div className={styles.paymentDisplay}>
              <div className={styles.cardIcon}>💳</div>
              <div>
                <div className={styles.cardLabel}>Visa ending in {paymentLast4}</div>
                <div className={styles.cardSub}>Billing address: same as shipping</div>
              </div>
            </div>
          </section>

          {/* Items */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}><span className={styles.stepNum}>3</span> Review item</h2>
            </div>

            <div className={styles.itemRow}>
              <div className={styles.itemImageWrap}>
                <img src={product.image} alt={product.title} className={styles.itemImage} />
                {discount > 0 && <span className={styles.discountBadge}>-{discount}%</span>}
              </div>

              <div className={styles.itemDetails}>
                <p className={styles.itemTitle}>{product.title}</p>

                <div className={styles.ratingRow}>
                  <StarRating rating={product.rating} />
                  <span className={styles.ratingNum}>{product.rating}</span>
                  <span className={styles.reviewCount}>({product.reviews?.toLocaleString()})</span>
                </div>

                <div className={styles.priceBlock}>
                  <span className={styles.priceCurrency}>$</span>
                  <span className={styles.priceWhole}>{Math.floor(product.price)}</span>
                  <span className={styles.priceFraction}>{(product.price % 1).toFixed(2).slice(1)}</span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      List: <s>${product.originalPrice.toFixed(2)}</s>
                    </span>
                  )}
                </div>

                {product.prime && (
                  <div className={styles.primeRow}>
                    <span className={styles.primeBadge}>prime</span>
                    <span className={styles.primeText}>FREE Delivery</span>
                  </div>
                )}

                <div className={styles.qtyRow}>
                  <label className={styles.qtyLabel}>Qty:</label>
                  <select
                    className={styles.qtySelect}
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <p className={styles.itemDescription}>{product.description}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column — Order Summary */}
        <aside className={styles.summary}>
          <div className={styles.summaryInner}>
            <button
              className={styles.placeOrderBtn}
              onClick={() => { onAddToCart(product); setPlaced(true); }}
            >
              Place your order
            </button>

            <p className={styles.summaryLegal}>
              By placing your order, you agree to Amazon Clone's{' '}
              <a href="#" className={styles.summaryLink}>privacy notice</a> and{' '}
              <a href="#" className={styles.summaryLink}>conditions of use</a>.
            </p>

            <div className={styles.summaryDivider} />

            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span>Items ({quantity}):</span>
              <span>${subtotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping &amp; handling:</span>
              <span>{parseFloat(shipping) === 0 ? <span className={styles.freeShip}>FREE</span> : `$${shipping}`}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow}>
              <span>Before tax:</span>
              <span>${(parseFloat(subtotal) + parseFloat(shipping)).toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated tax (8%):</span>
              <span>${tax}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Order total:</span>
              <span className={styles.totalAmount}>${total}</span>
            </div>

            {discount > 0 && (
              <div className={styles.savingsBox}>
                Your savings: <strong>${((product.originalPrice - product.price) * quantity).toFixed(2)}</strong> ({discount}%)
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BuyItNow;
