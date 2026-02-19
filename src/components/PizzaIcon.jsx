/**
 * PizzaIcon - SVG pizza icons for profile completion levels
 * slice = single pizza slice
 * half = half pizza (semicircle)
 * full = full round pizza
 * All icons use the same square viewBox for consistent sizing
 */
function PizzaIcon({ level, size = 20 }) {
  if (level === 'full') {
    // Full round pizza
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#F4A623" />
        <circle cx="20" cy="20" r="18" fill="none" stroke="#D4882B" strokeWidth="3" />
        <circle cx="20" cy="20" r="15" fill="#E8553A" />
        <circle cx="14" cy="14" r="3" fill="#FFD54F" />
        <circle cx="26" cy="16" r="2.5" fill="#FFD54F" />
        <circle cx="20" cy="26" r="3" fill="#FFD54F" />
        <circle cx="12" cy="24" r="2" fill="#FFD54F" />
        <circle cx="28" cy="25" r="2" fill="#FFD54F" />
        <circle cx="16" cy="20" r="2.2" fill="#C62828" />
        <circle cx="24" cy="12" r="2" fill="#C62828" />
        <circle cx="25" cy="22" r="1.8" fill="#C62828" />
        <circle cx="18" cy="28" r="1.8" fill="#C62828" />
      </svg>
    )
  }

  if (level === 'half') {
    // Half pizza — centered in a square viewBox
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 2 A18 18 0 0 0 22 38 Z" fill="#F4A623" />
        <path d="M22 2 A18 18 0 0 0 22 38" fill="none" stroke="#D4882B" strokeWidth="3" />
        <line x1="22" y1="2" x2="22" y2="38" stroke="#D4882B" strokeWidth="2" />
        <path d="M22 5 A15 15 0 0 0 22 35 Z" fill="#E8553A" />
        <circle cx="14" cy="14" r="2.5" fill="#FFD54F" />
        <circle cx="10" cy="24" r="2.5" fill="#FFD54F" />
        <circle cx="17" cy="20" r="2" fill="#FFD54F" />
        <circle cx="12" cy="19" r="1.8" fill="#C62828" />
        <circle cx="16" cy="28" r="1.5" fill="#C62828" />
        <circle cx="15" cy="11" r="1.5" fill="#C62828" />
      </svg>
    )
  }

  // Single slice (default) — centered in a square viewBox
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 36 L6 8 A18 18 0 0 1 34 8 Z" fill="#F4A623" />
      <path d="M6 8 A18 18 0 0 1 34 8" fill="#D4882B" stroke="#D4882B" strokeWidth="1" />
      <path d="M7.5 10 A16 16 0 0 1 32.5 10 L20 34 Z" fill="#E8553A" />
      <circle cx="20" cy="16" r="2.5" fill="#FFD54F" />
      <circle cx="15" cy="22" r="2" fill="#FFD54F" />
      <circle cx="24" cy="21" r="1.8" fill="#FFD54F" />
      <circle cx="20" cy="20" r="1.8" fill="#C62828" />
      <circle cx="17" cy="27" r="1.5" fill="#C62828" />
    </svg>
  )
}

export default PizzaIcon
