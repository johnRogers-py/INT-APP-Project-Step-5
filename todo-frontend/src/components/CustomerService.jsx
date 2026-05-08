import React, { useState } from 'react';
import styles from './CustomerService.module.css';

const TOPICS = [
  {
    icon: '📦',
    title: 'Track your package',
    desc: 'Get real-time updates on your delivery status.',
    detail: 'Visit Your Orders to track the status of a recent order. If tracking shows delivered but you haven\'t received the package, wait 48 hours and then contact us.',
  },
  {
    icon: '↩️',
    title: 'Returns & refunds',
    desc: 'Return or exchange an item you ordered.',
    detail: 'Most items can be returned within 30 days of delivery. Go to Your Orders, find the item, and select Return or Replace Items. Your refund will be processed within 3–5 business days.',
  },
  {
    icon: '💳',
    title: 'Payment & charges',
    desc: 'Questions about charges, gift cards, or promotions.',
    detail: 'If you see an unexpected charge, check your recent orders and digital purchases. Unrecognized charges may be from Amazon Prime, subscriptions, or digital content.',
  },
  {
    icon: '🔐',
    title: 'Account & login issues',
    desc: 'Trouble signing in or managing your account.',
    detail: 'If you can\'t sign in, use "Forgot your password?" on the sign-in page. For account security concerns, change your password immediately and review your recent account activity.',
  },
  {
    icon: '🚚',
    title: 'Shipping & delivery',
    desc: 'Shipping speeds, costs, and delivery options.',
    detail: 'Prime members get FREE Two-Day Delivery on millions of items. Standard shipping typically takes 5–8 business days. Expedited and one-day options are available at checkout.',
  },
  {
    icon: '🎁',
    title: 'Gift orders',
    desc: 'Send gifts or manage gift wrapping options.',
    detail: 'You can mark an order as a gift at checkout to hide the price and include a gift message. Gift cards are available in various denominations and can be emailed instantly.',
  },
];

function CustomerService({ onBack }) {
  const [openTopic, setOpenTopic] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
        <h1 className={styles.pageTitle}>Customer Service</h1>
      </div>

      <div className={styles.layout}>
        {/* Hero */}
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>Hello, how can we help you?</h2>
          <p className={styles.heroSub}>Browse the topics below or start a chat with us.</p>
          <button className={styles.chatBtn} onClick={() => setChatOpen(true)}>
            💬 Chat with us
          </button>
        </div>

        {/* Topics Grid */}
        <div className={styles.topicsGrid}>
          {TOPICS.map((topic, i) => (
            <div key={i} className={styles.topicCard} onClick={() => setOpenTopic(openTopic === i ? null : i)}>
              <div className={styles.topicIcon}>{topic.icon}</div>
              <div className={styles.topicBody}>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <p className={styles.topicDesc}>{topic.desc}</p>
                {openTopic === i && (
                  <p className={styles.topicDetail}>{topic.detail}</p>
                )}
              </div>
              <span className={styles.topicArrow}>{openTopic === i ? '▲' : '▼'}</span>
            </div>
          ))}
        </div>

        {/* Contact Options */}
        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>Still need help?</h3>
          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📞</div>
              <h4>Phone</h4>
              <p>Call us at 1-888-280-4331</p>
              <p className={styles.contactHours}>Available 24/7</p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>✉️</div>
              <h4>Email</h4>
              <p>We'll respond within 24 hours</p>
              <button className={styles.btnOutline}>Send email</button>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>💬</div>
              <h4>Chat</h4>
              <p>Chat with a customer service agent</p>
              <button className={styles.btnYellow} onClick={() => setChatOpen(true)}>Start chat</button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <>
          <div className={styles.overlay} onClick={() => setChatOpen(false)} />
          <div className={styles.chatModal}>
            <div className={styles.chatHeader}>
              <span>💬 Amazon Clone Support</span>
              <button className={styles.chatClose} onClick={() => setChatOpen(false)}>✕</button>
            </div>
            <div className={styles.chatBody}>
              <div className={styles.chatBubbleAgent}>
                Hi! I'm Amazon Clone's virtual assistant. How can I help you today?
              </div>
            </div>
            <div className={styles.chatFooter}>
              <input className={styles.chatInput} placeholder="Type your message…" />
              <button className={styles.chatSend}>Send</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerService;
