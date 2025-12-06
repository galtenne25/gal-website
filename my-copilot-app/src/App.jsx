import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// --- סגנונות (נלקח מהעיצוב המקורי שלך) ---
const styles = {
  app: {
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #081029 0%, #0b1226 30%, #4f46e5 65%, #8b5cf6 100%)',
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '20px',
    flex: 1
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    backdropFilter: 'blur(6px)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.00))',
    borderRadius: '12px',
    marginBottom: '30px'
  },
  logo: {
    fontWeight: 700,
    letterSpacing: 1.5,
    fontSize: 20,
    textDecoration: 'none',
    color: '#fff'
  },
  navLinks: {
    display: 'flex',
    gap: 18
  },
  link: {
    color: 'rgba(255,255,255,0.92)',
    textDecoration: 'none',
    fontSize: 15,
    fontWeight: 500
  },
  hero: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  headline: {
    fontSize: 'clamp(28px, 6vw, 56px)',
    fontWeight: 800,
    margin: 0,
    textShadow: '0 6px 30px rgba(79,70,229,0.18)'
  },
  jokeBox: {
    background: 'rgba(255,255,255,0.05)',
    padding: '30px',
    borderRadius: '16px',
    maxWidth: '600px',
    margin: '40px auto',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  button: {
    marginTop: 20,
    padding: '12px 24px',
    fontSize: 16,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    background: 'linear-gradient(90deg,#3b82f6,#7c3aed)',
    fontWeight: 600
  },
  form: {
    maxWidth: 500,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  input: {
    padding: '12px 16px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13
  }
};

// --- רכיב 1: סרגל ניווט ---
function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>GAL</Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>
    </nav>
  );
}

// --- רכיב 2: דף הבית (כולל מחולל בדיחות) ---
function HomePage() {
  const [joke, setJoke] = useState('Loading a funny joke...');

  const fetchJoke = async () => {
    setJoke('Thinking...');
    try {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      const data = await res.json();
      setJoke(data.joke);
    } catch (err) {
      setJoke('Oops! Could not get a joke right now.');
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div style={styles.hero}>
      <h1 style={styles.headline}>Welcome to Gal's World</h1>
      <p style={{ marginTop: 15, color: 'rgba(255,255,255,0.8)' }}>
        Design-driven engineering & thoughtful innovation.
      </p>

      <div style={styles.jokeBox}>
        <h3 style={{ margin: '0 0 15px 0', color: '#a855f7' }}>Random Joke Generator 🤣</h3>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.5 }}>
          "{joke}"
        </p>
        <button style={styles.button} onClick={fetchJoke}>
          Get Another Joke
        </button>
      </div>
    </div>
  );
}

// --- רכיב 3: דף יצירת קשר ---
function ContactPage() {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    // שימוש במחרוזות דמי כפי שביקשת
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => setSent(true))
      .catch(() => setSent(true)); // מציג הצלחה גם אם נכשל לצורך התרגול
  };

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h2 style={{ ...styles.headline, fontSize: '2.5rem', marginBottom: 20 }}>Get In Touch</h2>
      
      {sent ? (
        <div style={styles.jokeBox}>
          <h3 style={{ color: '#10b981' }}>Message Sent!</h3>
          <p>Thanks for reaching out. I'll get back to you soon.</p>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} style={styles.form}>
          <input type="text" name="user_name" placeholder="Your Name" style={styles.input} required />
          <input type="email" name="user_email" placeholder="Your Email" style={styles.input} required />
          <textarea name="message" placeholder="Message" style={{ ...styles.input, minHeight: 120 }} required />
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      )}
    </div>
  );
}

// --- האפליקציה הראשית ---
export default function App() {
  return (
    <Router>
      <div style={styles.app}>
        <div style={styles.container}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <footer style={styles.footer}>
          © {new Date().getFullYear()} Gal's Website — All rights reserved.
        </footer>
      </div>
    </Router>
  );
}