import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const ChatPage = () => {
  const [chats, setchats] = useState([])

  return (
    <>
      <Helmet>
        <title>Chats | Chat App</title>
      </Helmet>
      <div style={{ width: '100%', height: '100vh', display: 'grid', placeItems: 'center' }}>
        <h1
          style={{
            textAlign: 'center',
            color: 'black',
            margin: '0 auto',
            display: 'block',
            fontSize: '10rem',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          }}>
          Protected Route
        </h1>
      </div>
    </>
  )
}

export default ChatPage
