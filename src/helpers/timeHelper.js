const formatTime = (num) => {
  return `${Math.floor(num/60).toString().padStart(2, '0')}:${(num%60).toString().padStart(2, '0')}`
}

export { formatTime }