import React from 'react';
import styles from './Card.module.css';

// Star rating helper — renders filled, half, and empty stars
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className={styles.starFull}>★</span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} className={styles.starHalf}>★</span>);
    } else {
      stars.push(<span key={i} className={styles.starEmpty}>★</span>);
    }
  }
  return <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>{stars}</span>;
}

function formatReviews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return n.toString();
}

function Card({ product, onAddToCart, onBuyNow, cartQuantity }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={styles.card}>
      {/* Badge */}
      {product.badge && (
        <span className={`${styles.badge} ${product.badge === 'Best Seller' ? styles.badgeSeller : styles.badgeChoice}`}>
          {product.badge}
        </span>
      )}

      {/* Product Image */}
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
        {discount > 0 && (
          <span className={styles.discountBadge}>-{discount}%</span>
        )}
      </div>

      {/* Card Body */}
      <div className={styles.body}>
        {/* Title */}
        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>

        {/* Rating Row */}
        <div className={styles.ratingRow}>
          <StarRating rating={product.rating} />
          <span className={styles.ratingNum}>{product.rating}</span>
          <span className={styles.reviewCount}>({formatReviews(product.reviews)})</span>
        </div>

        {/* Price Block */}
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

        {/* Savings */}
        {discount > 0 && (
          <div className={styles.savings}>
            Save ${(product.originalPrice - product.price).toFixed(2)} ({discount}%)
          </div>
        )}

        {/* Prime Badge */}
        {product.prime && (
          <div className={styles.prime}>
            <span className={styles.primeBadge}>prime</span>
            <span className={styles.primeText}>FREE Delivery</span>
          </div>
        )}

        {/* Description (truncated) */}
        <p className={styles.description}>{product.description}</p>

        {/* Add to Cart Button */}
        {cartQuantity === 0 ? (
          <button
            className={styles.addToCartBtn}
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        ) : (
          <div className={styles.inCartIndicator}>
            <span className={styles.inCartIcon}>✓</span>
            In Cart ({cartQuantity})
          </div>
        )}

        {/* Buy Now */}
        <button className={styles.buyNowBtn} onClick={() => onBuyNow && onBuyNow(product)}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Card;
