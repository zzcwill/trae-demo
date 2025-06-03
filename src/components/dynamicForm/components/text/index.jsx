import React from 'react'

export default function Text({
  value,
  text
}) {
  return (
    <div style={{ position: 'relative', top: 1 }}>{value || text}</div>
  )
}
