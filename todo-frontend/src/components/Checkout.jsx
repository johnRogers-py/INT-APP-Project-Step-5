import React, { useState } from 'react';
import styles from './Checkout.module.css';

function Checkout({ cartItems, products, cartTotal, onBack, onPlaceOrder }) {
  const [step, setStep] = useState('review'); // 'review' | 'confirmed'
  const [address, setAddress] = useState({
    name: 'John Rogers',
    line1: '123 Main Street',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
  });
  const [editingAddress, setEditingAddress] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentLast4] = useState('4242');
  const [giftWrap, setGiftWrap] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const enrichedItems = cartItems.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId),
  })).filter(item => item.product);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const deliveryCost = deliveryOption === 'express' ? 14.99
    : deliveryOption === 'oneday' ? 24.99
    : 0;
  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const subtotalAfterDiscount = cartTotal - discount;
  const tax = ((subtotalAfterDiscount + deliveryCost) * 0.08).toFixed(2);
  const giftWrapCost = giftWrap ? 3.99 : 0;
  const orderTotal = (subtotalAfterDiscount + deliveryCost + parseFloat(tax) + giftWrapCost).toFixed(2);

  const deliveryDate = () => {
    const d = new Date();
    const days = deliveryOption === 'oneday' ? 1 : deliveryOption === 'express' ? 2 : 5;
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  if (step === 'confirmed') {
    const orderNum = `AMZ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
        </div>
        <div className={styles.confirmWrap}>
          <div className={styles.confirmIcon}>✓</div>
          <h1 className={styles.confirmTitle}>Order Placed!</h1>
          <p className={styles.confirmSub}>
            Thank you, {address.name.split(' ')[0]}! Your order has been placed successfully.
          </p>
          <div className={styles.confirmMeta}>
            <div className={styles.confirmMetaRow}>
              <span>Order number:</span>
              <strong>{orderNum}</strong>
            </div>
            <div className={styles.confirmMetaRow}>
              <span>Estimated delivery:</span>
              <strong>{deliveryDate()}</strong>
            </div>
            <div className={styles.confirmMetaRow}>
              <span>Order total:</span>
              <strong className={styles.confirmTotal}>${orderTotal}</strong>
            </div>
          </div>

          <div className={styles.confirmItems}>
            {enrichedItems.map(({ id, product, quantity }) => (
              <div key={id} className={styles.confirmItem}>
                <img src={product.image} alt={product.title} className={styles.confirmImg} />
                <div>
                  <p className={styles.confirmItemTitle}>{product.title}</p>
                  <p className={styles.confirmItemMeta}>Qty: {quantity} · ${(product.price * quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.confirmEmail}>
            A confirmation has been sent to your email address.
          </p>
          <div className={styles.confirmActions}>
            <button className={styles.btnYellow} onClick={() => { onPlaceOrder(); onBack(); }}>
              Continue Shopping
            </button>
            <button className={styles.btnOutline} onClick={() => { onPlaceOrder(); onBack(); }}>
              View Your Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>← Back to cart</button>
        <h1 className={styles.pageTitle}>Checkout</h1>
        <div className={styles.stepIndicator}>
          <span className={styles.stepActive}>1 Shipping</span>
          <span className={styles.stepDivider}>›</span>
          <span className={styles.stepActive}>2 Payment</span>
          <span className={styles.stepDivider}>›</span>
          <span className={styles.stepActive}>3 Review</span>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftCol}>

          {/* Shipping Address */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}><span className={styles.stepNum}>1</span> Shipping address</h2>
              <button className={styles.changeBtn} onClick={() => setEditingAddress(v => !v)}>
                {editingAddress ? 'Save' : 'Change'}
              </button>
            </div>
            {editingAddress ? (
              <div className={styles.addressForm}>
                {[['name','Full name'],['line1','Address'],['city','City'],['state','State'],['zip','ZIP']].map(([field, label]) => (
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
              </div>
            )}
          </section>

          {/* Delivery Options */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}><span className={styles.stepNum}>2</span> Delivery options</h2>
            </div>
            <div className={styles.deliveryOptions}>
              {[
                { id: 'standard', label: 'Standard Shipping', sub: `FREE — arrives ${deliveryDate()}`, badge: 'FREE' },
                { id: 'express', label: 'Express Shipping (2 days)', sub: '$14.99', badge: null },
                { id: 'oneday', label: 'One-Day Delivery', sub: '$24.99', badge: null },
              ].map(opt => (
                <label key={opt.id} className={`${styles.deliveryOption} ${deliveryOption === opt.id ? styles.deliveryOptionActive : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value={opt.id}
                    checked={deliveryOption === opt.id}
                    onChange={() => setDeliveryOption(opt.id)}
                    className={styles.radioInput}
                  />
                  <div className={styles.deliveryOptionBody}>
                    <div className={styles.deliveryOptionLabel}>
                      {opt.label}
                      {opt.badge && <span className={styles.freeBadge}>{opt.badge}</span>}
                    </div>
                    <div className={styles.deliveryOptionSub}>{opt.sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}><span className={styles.stepNum}>3</span> Payment method</h2>
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
              <h2 className={styles.sectionTitle}><span className={styles.stepNum}>4</span> Review items ({itemCount})</h2>
            </div>
            <div className={styles.itemsList}>
              {enrichedItems.map(({ id, product, quantity }) => (
                <div key={id} className={styles.itemRow}>
                  <div className={styles.itemImgWrap}>
                    <img src={product.image} alt={product.title} className={styles.itemImg} />
                  </div>
                  <div className={styles.itemDetails}>
                    <p className={styles.itemTitle}>{product.title}</p>
                    {product.prime && <span className={styles.primeBadge}>prime</span>}
                    <p className={styles.itemPrice}>${(product.price * quantity).toFixed(2)}</p>
                    <p className={styles.itemQty}>Qty: {quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift wrap */}
            <label className={styles.giftWrapRow}>
              <input type="checkbox" checked={giftWrap} onChange={e => setGiftWrap(e.target.checked)} />
              <span>Add gift wrapping (+$3.99)</span>
            </label>
          </section>
        </div>

        {/* Order Summary */}
        <aside className={styles.summary}>
          <div className={styles.summaryInner}>
            <button className={styles.placeOrderBtn} onClick={() => setStep('confirmed')}>
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
              <span>Items ({itemCount}):</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            {promoApplied && (
              <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                <span>Promo discount (10%):</span>
                <span>−${discount.toFixed(2)}</span>
              </div>
            )}
            <div className={styles.summaryRow}>
              <span>Shipping &amp; handling:</span>
              <span>{deliveryCost === 0 ? <span className={styles.freeText}>FREE</span> : `$${deliveryCost.toFixed(2)}`}</span>
            </div>
            {giftWrap && (
              <div className={styles.summaryRow}>
                <span>Gift wrapping:</span>
                <span>$3.99</span>
              </div>
            )}
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow}>
              <span>Estimated tax:</span>
              <span>${tax}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Order total:</span>
              <span className={styles.totalAmount}>${orderTotal}</span>
            </div>

            {/* Promo Code */}
            <div className={styles.promoSection}>
              <p className={styles.promoLabel}>Promo code</p>
              <div className={styles.promoRow}>
                <input
                  className={styles.promoInput}
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <button
                  className={styles.promoBtn}
                  onClick={() => { if (promoCode) setPromoApplied(true); }}
                  disabled={promoApplied || !promoCode}
                >
                  {promoApplied ? '✓' : 'Apply'}
                </button>
              </div>
              {promoApplied && <p className={styles.promoSuccess}>Code applied! 10% off your order.</p>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
