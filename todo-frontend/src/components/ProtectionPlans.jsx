import React, { useState } from 'react';
import styles from './ProtectionPlans.module.css';

const PLANS = [
  {
    name: '1-Year Protection Plan',
    price: 9.99,
    color: '#232F3E',
    features: [
      'Covers mechanical and electrical failures',
      'No deductibles or hidden fees',
      '24/7 customer support',
      'Easy online claims process',
    ],
  },
  {
    name: '2-Year Protection Plan',
    price: 17.99,
    color: '#FF9900',
    badge: 'Most Popular',
    features: [
      'Covers mechanical and electrical failures',
      'Accidental damage coverage',
      'No deductibles or hidden fees',
      '24/7 customer support',
      'Easy online claims process',
      'Transferable if you sell the item',
    ],
  },
  {
    name: '3-Year Protection Plan',
    price: 24.99,
    color: '#007185',
    features: [
      'Covers mechanical and electrical failures',
      'Accidental damage coverage',
      'Power surge protection',
      'No deductibles or hidden fees',
      '24/7 priority customer support',
      'Easy online claims process',
      'Transferable if you sell the item',
      'Free replacement if unrepairable',
    ],
  },
];

const FAQS = [
  { q: 'What does the protection plan cover?', a: 'Our plans cover mechanical and electrical failures, defects in materials and workmanship, and (on 2- and 3-year plans) accidental damage from everyday use.' },
  { q: 'When does coverage start?', a: 'Coverage begins at the end of the manufacturer\'s warranty, or immediately for accidental damage coverage.' },
  { q: 'How do I file a claim?', a: 'Visit your Orders page, find the protected item, and select "File a claim." You can also call our 24/7 support line.' },
  { q: 'Are there any deductibles?', a: 'No. There are zero deductibles, zero service fees, and no hidden costs when you file a claim.' },
];

function ProtectionPlans({ onBack }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
        <h1 className={styles.pageTitle}>🛡 Protection Plans</h1>
      </div>

      <div className={styles.layout}>
        {/* Hero */}
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>Protect what matters most</h2>
          <p className={styles.heroSub}>Add a protection plan to any eligible item at checkout and shop with confidence.</p>
        </div>

        {/* Plans */}
        <div className={styles.plansGrid}>
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`${styles.planCard} ${selected === i ? styles.planCardSelected : ''}`}
              style={{ '--plan-color': plan.color }}
            >
              {plan.badge && <div className={styles.planBadge}>{plan.badge}</div>}
              <div className={styles.planHeader} style={{ background: plan.color }}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.planPriceCurrency}>$</span>
                  <span className={styles.planPriceWhole}>{Math.floor(plan.price)}</span>
                  <span className={styles.planPriceFraction}>{(plan.price % 1).toFixed(2).slice(1)}</span>
                </div>
                <p className={styles.planPriceSub}>per eligible item</p>
              </div>
              <ul className={styles.planFeatures}>
                {plan.features.map((f, j) => (
                  <li key={j} className={styles.planFeature}>
                    <span className={styles.checkIcon}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className={selected === i ? styles.btnSelected : styles.btnYellow}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                {selected === i ? '✓ Selected' : 'Add to my items'}
              </button>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div className={styles.selectionBanner}>
            <span>✓ <strong>{PLANS[selected].name}</strong> added! It will apply to eligible items at checkout.</span>
            <button className={styles.bannerClose} onClick={() => setSelected(null)}>✕</button>
          </div>
        )}

        {/* How It Works */}
        <div className={styles.howSection}>
          <h3 className={styles.howTitle}>How it works</h3>
          <div className={styles.howSteps}>
            {[
              { num: '1', title: 'Add a plan', desc: 'Choose a plan and add it to any eligible item.' },
              { num: '2', title: 'Shop worry-free', desc: 'Your item is covered from the moment your manufacturer warranty ends.' },
              { num: '3', title: 'File a claim anytime', desc: 'If something goes wrong, file a claim online or by phone — 24/7.' },
              { num: '4', title: 'Get it fixed or replaced', desc: 'We\'ll repair or replace your item, fast and hassle-free.' },
            ].map(s => (
              <div key={s.num} className={styles.howStep}>
                <div className={styles.howNum}>{s.num}</div>
                <h4 className={styles.howStepTitle}>{s.title}</h4>
                <p className={styles.howStepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className={styles.faqSection}>
          <h3 className={styles.faqTitle}>Frequently asked questions</h3>
          {FAQS.map((faq, i) => (
            <div key={i} className={styles.faqItem} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className={styles.faqQ}>
                <span>{faq.q}</span>
                <span className={styles.faqArrow}>{openFaq === i ? '▲' : '▼'}</span>
              </div>
              {openFaq === i && <p className={styles.faqA}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProtectionPlans;
