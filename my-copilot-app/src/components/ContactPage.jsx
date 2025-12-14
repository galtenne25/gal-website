import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
  const form = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('אנא מלא את כל שדות הטופס.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    emailjs.sendForm('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', form.current, 'YOUR_PUBLIC_KEY_HERE')
      .then(() => {
        setSubmitted(true)
        setName('')
        setEmail('')
        setMessage('')
        setLoading(false)
      })
      .catch((err) => {
        console.error('Email send failed:', err)
        setError('אירעה שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.')
        setLoading(false)
      })
  }

  return (
    <section className="contact">
      <h2 className="contact-title">דברו איתי</h2>
      <p className="contact-sub">יש לכם רעיון לפרויקט? שלחו הודעה ואחזור בהקדם.</p>

      {submitted ? (
        <div className="success-box">✓ תודה שפנית אליי, {name || 'חבר'}!</div>
      ) : (
        <form ref={form} className="form" onSubmit={handleSubmit} noValidate>
          {error && <div className="form-error">{error}</div>}
          <input className="input" name="user_name" placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" name="user_email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea className="textarea" name="message" placeholder="ההודעה שלך" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="btn" type="submit" disabled={loading}>{loading ? 'שולח...' : 'שלח הודעה'}</button>
        </form>
      )}
    </section>
  )
}
