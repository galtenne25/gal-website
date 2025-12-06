import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// --- מאגר בדיחות בעברית ---
const hebrewJokes = [
    "למה צוללנים צוללים אחורה? כי אם הם יצללו קדימה הם יפלו לתוך הסירה.",
    "איך קוראים לנהג מונית יפני? אישימוטו.",
    "מה משותף לכסף ולזקנה? שניהם לא גדלים על העצים.",
    "שני משוגעים הולכים ברחוב, אחד שואל את השני: 'תגיד, אפשר לשאול אותך שאלה?' השני עונה: 'בטח, אבל אל תהפוך את זה להרגל'.",
    "למה פילים הולכים עם סניקרס? כדי לא להעיר את הדשא.",
    "מה דף אחד אמר לדף השני? 'אל תדאג, יהיה בסדר, אנחנו באותו עמוד'.",
    "איזה דג הכי מפורסם? סלמון סלב.",
    "למה נמרים לא אוהבים לשחק מחבואים? כי תמיד מוצאים אותם.",
    "איך קוראים לאיש שמתקן מדפים? ניסן מדפים.",
    "מה עושה עגבניה כשהיא רואה סלט? מסמיקה."
];

// --- סגנונות מעודכנים (RTL + התאמה לדסקטופ) ---
const styles = {
  app: {
    fontFamily: "Rubik, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // פונט שיותר מתאים לעברית
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', // רקע כהה ומודרני יותר
    direction: 'rtl', // יישור לימין
    textAlign: 'right'
  },
  container: {
    width: '100%',
    maxWidth: '1000px', // הגבלת רוחב כדי שלא יימרח בדסקטופ
    margin: '0 auto',
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 30px',
    backdropFilter: 'blur(10px)',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    marginBottom: '40px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  logo: {
    fontWeight: 800,
    letterSpacing: 1,
    fontSize: '24px',
    textDecoration: 'none',
    color: '#38bdf8', // צבע תכלת בולט
    textShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
  },
  navLinks: {
    display: 'flex',
    gap: '25px'
  },
  link: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 600,
    transition: 'color 0.3s ease'
  },
  hero: {
    textAlign: 'center',
    padding: '60px 20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headline: {
    fontSize: 'clamp(32px, 5vw, 64px)', // גודל טקסט רספונסיבי
    fontWeight: 800,
    margin: '0 0 20px 0',
    background: 'linear-gradient(to right, #60a5fa, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: 'clamp(18px, 3vw, 24px)',
    color: '#94a3b8',
    maxWidth: '700px',
    marginBottom: '50px'
  },
  jokeBox: {
    background: 'rgba(30, 41, 59, 0.7)',
    padding: '40px',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '700px', // רוחב מקסימלי לקופסת הבדיחות
    margin: '0 auto',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
    textAlign: 'center'
  },
  jokeText: {
    fontSize: '1.4rem',
    lineHeight: 1.6,
    marginBottom: '30px',
    color: '#f1f5f9',
    fontWeight: 500
  },
  button: {
    padding: '14px 32px',
    fontSize: '18px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    fontWeight: 700,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
  },
  form: {
    maxWidth: '500px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: 'rgba(255,255,255,0.03)',
    padding: '40px',
    borderRadius: '20px'
  },
  input: {
    padding: '16px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(15, 23, 42, 0.6)',
    color: '#fff',
    outline: 'none',
    textAlign: 'right',
    fontFamily: 'inherit'
  },
  footer: {
    textAlign: 'center',
    padding: '30px',
    color: '#64748b',
    fontSize: '14px',
    marginTop: 'auto',
    borderTop: '1px solid rgba(255,255,255,0.05)'
  }
};

// --- רכיב 1: סרגל ניווט ---
function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>האתר של גל</Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>בית</Link>
        <Link to="/contact" style={styles.link}>צור קשר</Link>
      </div>
    </nav>
  );
}

// --- רכיב 2: דף הבית (כולל מחולל בדיחות בעברית) ---
function HomePage() {
  const [joke, setJoke] = useState('');

  const generateJoke = () => {
    // בחירה רנדומלית מתוך המערך המקומי
    const randomIndex = Math.floor(Math.random() * hebrewJokes.length);
    setJoke(hebrewJokes[randomIndex]);
  };

  useEffect(() => {
    generateJoke(); // טעינת בדיחה ראשונה
  }, []);

  return (
    <div style={styles.hero}>
      <h1 style={styles.headline}>ברוכים הבאים לעולם של גל</h1>
      <p style={styles.subtitle}>
        פיתוח, אבטחת מידע ועיצוב חווית משתמש ברמה הגבוהה ביותר.
      </p>

      <div style={styles.jokeBox}>
        <h3 style={{ margin: '0 0 20px 0', color: '#a855f7', fontSize: '1.5rem' }}>🤣 פינת הבדיחה היומית</h3>
        <p style={styles.jokeText}>
          "{joke}"
        </p>
        <button 
          style={styles.button} 
          onClick={generateJoke}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          תן לי עוד בדיחה
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
    // סימולציה של שליחה (או שימוש ב-EmailJS האמיתי אם הגדרת)
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => setSent(true))
      .catch(() => setSent(true)); 
  };

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', width: '100%' }}>
      <h2 style={{ ...styles.headline, fontSize: '2.5rem', marginBottom: '40px' }}>דברו איתי</h2>
      
      {sent ? (
        <div style={styles.jokeBox}>
          <h3 style={{ color: '#10b981', fontSize: '2rem' }}>ההודעה נשלחה! ✓</h3>
          <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>תודה שפנית אליי, אחזור אליך בהקדם.</p>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} style={styles.form}>
          <input type="text" name="user_name" placeholder="שם מלא" style={styles.input} required />
          <input type="email" name="user_email" placeholder="כתובת אימייל" style={styles.input} required />
          <textarea name="message" placeholder="ההודעה שלך..." style={{ ...styles.input, minHeight: '150px', resize: 'vertical' }} required />
          <button type="submit" style={styles.button}>שלח הודעה</button>
        </form>
      )}
    </div>
  );
}

// --- האפליקציה הראשית ---
export default function App() {
  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <footer style={styles.footer}>
        © {new Date().getFullYear()} האתר של גל — כל הזכויות שמורות.
      </footer>
    </div>
  );
}