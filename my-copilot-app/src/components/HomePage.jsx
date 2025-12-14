import React, { useState, useEffect, useRef } from 'react'
import { hebrewJokes } from '../data/jokes'

export default function HomePage() {
  const [joke, setJoke] = useState('')
  const prevIndex = useRef(null)

  // Prevent consecutive repeats
  const generateJoke = () => {
    if (!hebrewJokes || hebrewJokes.length === 0) {
      setJoke('אין בדיחות זמינות כרגע.')
      return
    }

    if (hebrewJokes.length === 1) {
      setJoke(hebrewJokes[0])
      prevIndex.current = 0
      return
    }

    let idx
    do {
      idx = Math.floor(Math.random() * hebrewJokes.length)
    } while (idx === prevIndex.current)

    prevIndex.current = idx
    setJoke(hebrewJokes[idx])
  }

  // Optional: fetch a random English dad joke to show alongside
  const [remoteJoke, setRemoteJoke] = useState('')
  const [remoteLoading, setRemoteLoading] = useState(true)
  const [remoteError, setRemoteError] = useState(null)

  useEffect(() => {
    generateJoke()

    fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
      .then((res) => res.json())
      .then((data) => {
        setRemoteJoke(data?.joke || '')
        setRemoteLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setRemoteError('לא ניתן לטעון בדיחה חיצונית כרגע.')
        setRemoteLoading(false)
      })
  }, [])

  return (
    <section className="hero">
      <h1 className="headline">ברוכים הבאים לעולם של גל</h1>
      <p className="subtitle">פיתוח, אבטחת מידע ועיצוב חווית משתמש ברמה הגבוהה ביותר.</p>

      <div className="joke-box">
        <h3 className="joke-title">🤣 פינת הבדיחה היומית</h3>
        <p className="joke-text">"{joke}"</p>
        <button className="btn" onClick={generateJoke}>תן לי עוד בדיחה</button>
      </div>

      <div className="joke-box" style={{ marginTop: 24 }}>
        <h4 className="joke-title">Random dad joke</h4>
        {remoteLoading ? (
          <p className="joke-text">טוען...</p>
        ) : remoteError ? (
          <p className="joke-text error">{remoteError}</p>
        ) : (
          <p className="joke-text">"{remoteJoke}"</p>
        )}
      </div>
    </section>
  )
}
