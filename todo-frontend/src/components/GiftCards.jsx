import React, { useState } from 'react';
import styles from './GiftCards.module.css';

const AMOUNTS = [25, 50, 100, 150, 200];
const DESIGNS = [
  { id: 'birthday', label: '🎂 Birthday', bg: 'linear-gradient(135deg,#FF6B6B,#FFE66D)', text: '#333' },
  { id: 'holiday', label: '🎄 Holiday', bg: 'linear-gradient(135deg,#1a472a,#c41e3a)', text: '#fff' },
  { id: 'thankyou', label: '🙏 Thank You', bg: 'linear-gradient(135deg,#667eea,#764ba2)', text: '#fff' },
  { id: 'congrats', label: '🎉 Congrats', bg: 'linear-gradient(135deg,#f093fb,#f5576c)', text: '#fff' },
  { id: 'classic', label: '⭐ Classic', bg: 'linear-gradient(135deg,#131921,#37475A)', text: '#FF9900' },
  { id: 'floral', label: '🌸 Floral', bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', text: '#333' },
];

function GiftCards({ onBack }) {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('birthday');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const design = DESIGNS.find(d => d.id === selectedDesign);
  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  function handleSend(e) {
    e.preventDefault();
    if (recipientEmail && finalAmount > 0) setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
        </div>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>🎁</div>
          <h2 className={styles.successTitle}>Gift Card Sent!</h2>
          <p className={styles.successSub}>
            A <strong>${finalAmount.toFixed(2)}</strong> gift card has been sent to <strong>{recipientEmail}</strong>.
            {recipientName && ` ${recipientName} will receive it shortly.`}
          </p>
          <div className={styles.giftCardPreview} style={{ background: design.bg, color: design.text }}>
            <div className={styles.previewLogo}>amazon<span>.clone</span></div>
            <div className={styles.previewAmount}>${finalAmount.toFixed(2)}</div>
            <div className={styles.previewLabel}>Gift Card</div>
          </div>
          <button className={styles.btnYellow} onClick={onBack}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
        <h1 className={styles.pageTitle}>🎁 Gift Cards</h1>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftCol}>

          {/* Design Picker */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Choose a design</h2>
            <div className={styles.designsGrid}>
              {DESIGNS.map(d => (
                <button
                  key={d.id}
                  className={`${styles.designBtn} ${selectedDesign === d.id ? styles.designBtnActive : ''}`}
                  style={{ background: d.bg, color: d.text }}
                  onClick={() => setSelectedDesign(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </section>

          {/* Amount Picker */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Select an amount</h2>
            <div className={styles.amountRow}>
              {AMOUNTS.map(a => (
                <button
                  key={a}
                  className={`${styles.amountBtn} ${selectedAmount === a && !customAmount ? styles.amountBtnActive : ''}`}
                  onClick={() => { setSelectedAmount(a); setCustomAmount(''); }}
                >
                  ${a}
                </button>
              ))}
            </div>
            <div className={styles.customRow}>
              <label className={styles.customLabel}>Or enter a custom amount:</label>
              <div className={styles.customInputWrap}>
                <span className={styles.customDollar}>$</span>
                <input
                  className={styles.customInput}
                  type="number"
                  min="1"
                  max="2000"
                  placeholder="1.00 – 2,000.00"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Recipient */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Recipient details</h2>
            <form onSubmit={handleSend} className={styles.form}>
              <label className={styles.formLabel}>
                Recipient's name (optional)
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Their name"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                />
              </label>
              <label className={styles.formLabel}>
                Recipient's email *
                <input
                  className={styles.formInput}
                  type="email"
                  placeholder="their@email.com"
                  value={recipientEmail}
                  onChange={e => setRecipientEmail(e.target.value)}
                  required
                />
              </label>
              <label className={styles.formLabel}>
                Personal message (optional)
                <textarea
                  className={styles.formTextarea}
                  placeholder="Write a personal message…"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={3}
                />
              </label>
              <button type="submit" className={styles.btnYellow}>
                Send ${finalAmount > 0 ? finalAmount.toFixed(2) : '—'} Gift Card
              </button>
            </form>
          </section>
        </div>

        {/* Preview */}
        <aside className={styles.preview}>
          <h3 className={styles.previewTitle}>Preview</h3>
          <div className={styles.giftCardPreview} style={{ background: design.bg, color: design.text }}>
            <div className={styles.previewLogo}>amazon<span style={{ color: design.id === 'classic' ? '#FF9900' : 'inherit', opacity: 0.7 }}>.clone</span></div>
            <div className={styles.previewAmount}>${finalAmount > 0 ? finalAmount.toFixed(2) : '0.00'}</div>
            <div className={styles.previewLabel}>Gift Card</div>
            {message && <div className={styles.previewMessage}>"{message}"</div>}
          </div>
          <p className={styles.previewNote}>
            Gift cards never expire and can be used on any item in our store.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default GiftCards;
