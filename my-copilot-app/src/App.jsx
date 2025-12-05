import React, {useState} from 'react'

const styles = {
  app: {
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #081029 0%, #0b1226 30%, #4f46e5 65%, #8b5cf6 100%)',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '20px'
  },
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    backdropFilter: 'blur(6px)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))'
  },
  logo: {
    fontWeight: 700,
    letterSpacing: 1.5,
    fontSize: 20
  },
  navLinks: {
    display: 'flex',
    gap: 18,
    alignItems: 'center'
  },
  link: {
    color: 'rgba(255,255,255,0.92)',
    textDecoration: 'none',
    fontSize: 15
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '100px 20px 80px'
  },
  headline: {
    fontSize: 'clamp(28px, 6vw, 56px)',
    lineHeight: 1.05,
    margin: 0,
    fontWeight: 800,
    color: '#fff',
    textShadow: '0 6px 30px rgba(79,70,229,0.18)'
  },
  subheadline: {
    marginTop: 12,
    fontSize: 'clamp(14px, 2.5vw, 18px)',
    color: 'rgba(255,255,255,0.85)',
    maxWidth: 820
  },
  exploreBtn: (hover) => ({
    marginTop: 26,
    padding: '12px 22px',
    fontSize: 16,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    background: hover ? 'linear-gradient(90deg,#7c3aed,#3b82f6)' : 'linear-gradient(90deg,#3b82f6,#7c3aed)',
    boxShadow: hover ? '0 10px 30px rgba(59,130,246,0.18)' : '0 8px 22px rgba(124,58,237,0.12)',
    transition: 'transform 160ms ease, box-shadow 160ms ease',
    transform: hover ? 'translateY(-3px)' : 'translateY(0)'
  }),
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
    padding: '40px 0'
  },
  card: {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
    borderRadius: 14,
    padding: 22,
    minHeight: 160,
    boxShadow: '0 8px 30px rgba(2,6,23,0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontWeight: 700,
    fontSize: 18
  },
  cardDesc: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14
  },
  footer: {
    padding: '20px 0',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13
  },
  contact: {
    padding: '60px 20px',
    textAlign: 'center'
  },
  contactTitle: {
    fontSize: 'clamp(24px, 5vw, 42px)',
    fontWeight: 800,
    marginBottom: 12,
    color: '#fff'
  },
  contactSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
    maxWidth: 600,
    margin: '0 auto 32px'
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
    color: '#fff',
    fontFamily: 'inherit',
    transition: 'all 200ms ease'
  },
  submitBtn: (hover) => ({
    padding: '12px 24px',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    background: hover ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#059669,#10b981)',
    boxShadow: hover ? '0 10px 30px rgba(16,185,129,0.2)' : '0 8px 20px rgba(5,150,105,0.15)',
    transition: 'transform 160ms ease, box-shadow 160ms ease',
    transform: hover ? 'translateY(-2px)' : 'translateY(0)'
  }),
  successMessage: {
    padding: 24,
    borderRadius: 8,
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    color: '#10b981',
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    maxWidth: 500,
    margin: '0 auto'
  },
  // Responsive helper (will be applied inline via media query emulation)
  mobileCards: {
    gridTemplateColumns: '1fr'
  }
}

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>GAL</div>
      <div style={styles.navLinks}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#about" style={styles.link}>About</a>
        <a href="#tech" style={styles.link}>Tech</a>
        <a href="#contact" style={styles.link}>Contact</a>
      </div>
    </nav>
  )
}

function Hero() {
  const [hover, setHover] = useState(false)

  return (
    <header id="home" style={styles.hero}>
      <h1 style={styles.headline}>Welcome to Gal's World</h1>
      <p style={styles.subheadline}>Design-driven engineering, secure systems, and thoughtful innovation — crafted by Gal. Explore projects, thoughts, and tooling across security, development, and creative tech.</p>
      <button
        aria-label="Explore Gal's Website"
        style={styles.exploreBtn(hover)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Explore
      </button>
    </header>
  )
}

function Cards() {
  // Responsive inline style: detect window width at render-time (works serverless in browser)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 760
  const gridStyle = Object.assign({}, styles.cards, isMobile ? styles.mobileCards : {})

  const cardData = [
    {title: 'Security', icon: '🛡️', desc: 'Robust architecture, threat modeling, and secure-by-design thinking.'},
    {title: 'Development', icon: '💻', desc: 'Clean code, modern stacks, and developer experience at heart.'},
    {title: 'Innovation', icon: '🚀', desc: 'Experimentation, rapid prototyping, and product-thinking.'}
  ]

  return (
    <section style={gridStyle} id="about">
      {cardData.map((c) => (
        <article key={c.title} style={styles.card}>
          <div>
            <div style={styles.cardTitle}><span style={{fontSize:22}}>{c.icon}</span>{c.title}</div>
            <div style={styles.cardDesc}>{c.desc}</div>
          </div>
          <div style={{marginTop:16, textAlign:'right'}}>
            <a href="#contact" style={{...styles.link, fontSize:13}}>Learn more →</a>
          </div>
        </article>
      ))}
    </section>
  )
}

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      setSubmitted(true)
      setName('')
      setEmail('')
    }
  }

  return (
    <section id="contact" style={styles.contact}>
      <h2 style={styles.contactTitle}>Get In Touch</h2>
      <p style={styles.contactSubtitle}>Have a project idea or just want to say hello? I'd love to hear from you.</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <SubmitButton />
        </form>
      ) : (
        <div style={styles.successMessage}>
          ✓ Thanks for reaching out, {name}!
        </div>
      )}
    </section>
  )
}

function SubmitButton() {
  const [hover, setHover] = useState(false)

  return (
    <button
      type="submit"
      style={styles.submitBtn(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Send Message
    </button>
  )
}

function Footer() {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} Gal's Website — All rights reserved.
    </footer>
  )
}

export default function App() {
  // Simple resize listener to trigger re-render for responsive inline grid
  const [, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  React.useEffect(() => {
    function onResize() { setW(window.innerWidth) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <Navbar />
        <Hero />
        <Cards />
        <Contact />
      </div>
      <div style={{width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 20px'}}>
        <Footer />
      </div>
    </div>
  )
}