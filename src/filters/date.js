export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(['th'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
  })
}

// .toISOString().substr(0, 10)
