import React from 'react'
import { useState } from 'react'

export const DescriptionButton = () => {
    const [count, setCount] = useState(0)
    const lowestCount = () => {
      if (count > 0) {
        setCount(count - 1)
      }
    }
    return (
    <div>
        <button onClick={lowestCount}>-</button>
        {count}
        <button onClick={() => setCount((count) => count + 1)}>+</button>
    </div>
  )
}
