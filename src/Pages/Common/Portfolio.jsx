import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_SERVER_URI, {
  query: { userId: '12345' },
})

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([])

  useEffect(() => {
    socket.on('portfolioUpdate', (data) => {
      setPortfolio(data)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((asset) => (
        <div key={asset._id}>
          <p>
            {asset.symbol}: {asset.currentPrice} USD
          </p>
          <p>Total Value: {asset.totalValue} USD</p>
        </div>
      ))}
    </div>
  )
}

export default Portfolio
