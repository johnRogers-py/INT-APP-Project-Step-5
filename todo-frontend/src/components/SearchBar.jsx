import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, categories, activeCategory, onCategoryChange }) {
  const [focused, setFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Search is live — no extra action needed, but form prevents page reload
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onChange('');
    }
  }

  return (
    <form
      className={`${styles.form} ${focused ? styles.formFocused : ''}`}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search products"
    >
      {/* Category Dropdown */}
      <select
        className={styles.categorySelect}
        value={activeCategory}
        onChange={e => onCategoryChange(e.target.value)}
        aria-label="Select product category"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Divider */}
      <span className={styles.divider} aria-hidden="true" />

      {/* Text Input */}
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search AmazonClone"
        aria-label="Search products"
        autoComplete="off"
      />

      {/* Clear button — shown when there's a query */}
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}

      {/* Search button */}
      <button type="submit" className={styles.searchBtn} aria-label="Submit search">
        <svg viewBox="0 0 24 24" fill="none" className={styles.searchIcon} aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#111" strokeWidth="2.5" />
          <path d="M20 20l-3.5-3.5" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
