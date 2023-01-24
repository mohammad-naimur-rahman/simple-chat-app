import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const ChatPage = () => {
  const [chats, setchats] = useState([])

  return (
    <div>
      <Helmet>
        <title>Chats | Chat App</title>
      </Helmet>
      <h1>Hello</h1>
    </div>
  )
}

export default ChatPage
