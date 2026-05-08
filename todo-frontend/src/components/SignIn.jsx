import React, { useState } from 'react';
import styles from './SignIn.module.css';

function SignIn({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('email'); // 'email' | 'password' | 'done'
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  function handleContinue(e) {
    e.preventDefault();
    if (step === 'email' && email) setStep('password');
  }

  function handleSignIn(e) {
    e.preventDefault();
    if (password) setStep('done');
  }

  function handleCreate(e) {
    e.preventDefault();
    if (name && email && password) setStep('done');
  }

  if (step === 'done') {
    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
        </div>
        <div className={styles.card}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>
            {creating ? 'Account created!' : 'You\'re signed in!'}
          </h2>
          <p className={styles.successSub}>
            Welcome{name ? `, ${name}` : ''}! You now have access to your account, orders, and more.
          </p>
          <button className={styles.btnYellow} onClick={onBack}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
      </div>

      <div className={styles.card}>
        <div className={styles.logo}>amazon<span>.clone</span></div>

        {!creating ? (
          <>
            <h1 className={styles.title}>Sign in</h1>

            {step === 'email' ? (
              <form onSubmit={handleContinue} className={styles.form}>
                <label className={styles.label}>
                  Email or mobile phone number
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoFocus
                  />
                </label>
                <button type="submit" className={styles.btnYellow}>Continue</button>
                <p className={styles.terms}>
                  By continuing, you agree to Amazon Clone's{' '}
                  <a href="#" className={styles.link}>Conditions of Use</a> and{' '}
                  <a href="#" className={styles.link}>Privacy Notice</a>.
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignIn} className={styles.form}>
                <p className={styles.emailDisplay}>
                  {email} <button type="button" className={styles.changeLink} onClick={() => setStep('email')}>Change</button>
                </p>
                <label className={styles.label}>
                  Password
                  <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    autoFocus
                  />
                </label>
                <button type="submit" className={styles.btnYellow}>Sign in</button>
                <a href="#" className={styles.forgotLink}>Forgot your password?</a>
              </form>
            )}

            <div className={styles.divider}><span>New to Amazon Clone?</span></div>
            <button className={styles.btnOutline} onClick={() => { setCreating(true); setStep('email'); }}>
              Create your Amazon Clone account
            </button>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Create account</h1>
            <form onSubmit={handleCreate} className={styles.form}>
              <label className={styles.label}>
                Your name
                <input
                  className={styles.input}
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="First and last name"
                  required
                  autoFocus
                />
              </label>
              <label className={styles.label}>
                Email
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className={styles.label}>
                Password
                <input
                  className={styles.input}
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
              </label>
              <button type="submit" className={styles.btnYellow}>Create your Amazon Clone account</button>
              <p className={styles.terms}>
                By creating an account, you agree to Amazon Clone's{' '}
                <a href="#" className={styles.link}>Conditions of Use</a> and{' '}
                <a href="#" className={styles.link}>Privacy Notice</a>.
              </p>
            </form>
            <div className={styles.divider}><span>Already have an account?</span></div>
            <button className={styles.btnOutline} onClick={() => setCreating(false)}>Sign in</button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignIn;
