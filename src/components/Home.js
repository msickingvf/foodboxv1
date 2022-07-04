import React from 'react'

export default function Home() {
  return (
    <div>
      <h2>{sessionStorage.getItem('welcomeMessage')}</h2>
    </div>
  )
}
