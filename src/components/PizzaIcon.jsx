/**
 * PieChart - SVG pie chart icons for profile completion levels
 * slice = 1/4 pie (basic profile)
 * half = 1/2 pie (overview completed)
 * full = full pie (has video - super)
 * Uses Milk Green (#D5CC8E) from SM logo
 */
function PizzaIcon({ level, size = 20 }) {
  const milkGreen = '#D5CC8E'
  const bgColor = '#E8E8E8'

  if (level === 'full') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill={milkGreen} />
      </svg>
    )
  }

  if (level === 'half') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill={bgColor} />
        <path d="M20 2 A18 18 0 0 1 20 38 Z" fill={milkGreen} />
      </svg>
    )
  }

  // Quarter pie (default - basic/slice)
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill={bgColor} />
      <path d="M20 20 L20 2 A18 18 0 0 1 38 20 Z" fill={milkGreen} />
    </svg>
  )
}

export default PizzaIcon
