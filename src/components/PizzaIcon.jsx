/**
 * PizzaIcon - SVG pizza icons for profile completion levels
 * slice = single pizza slice
 * half = half pizza (semicircle)
 * full = full round pizza
 */
function PizzaIcon({ level, size = 20 }) {
  if (level === 'full') {
    // Full round pizza
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pizza base */}
        <circle cx="20" cy="20" r="18" fill="#F4A623" />
        {/* Crust ring */}
        <circle cx="20" cy="20" r="18" fill="none" stroke="#D4882B" strokeWidth="3" />
        {/* Sauce layer */}
        <circle cx="20" cy="20" r="15" fill="#E8553A" />
        {/* Cheese spots */}
        <circle cx="14" cy="14" r="3" fill="#FFD54F" />
        <circle cx="26" cy="16" r="2.5" fill="#FFD54F" />
        <circle cx="20" cy="26" r="3" fill="#FFD54F" />
        <circle cx="12" cy="24" r="2" fill="#FFD54F" />
        <circle cx="28" cy="25" r="2" fill="#FFD54F" />
        {/* Pepperoni */}
        <circle cx="16" cy="20" r="2.2" fill="#C62828" />
        <circle cx="24" cy="12" r="2" fill="#C62828" />
        <circle cx="25" cy="22" r="1.8" fill="#C62828" />
        <circle cx="18" cy="28" r="1.8" fill="#C62828" />
      </svg>
    )
  }

  if (level === 'half') {
    // Half pizza (left half)
    return (
      <svg width={size * 0.65} height={size} viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Half pizza base */}
        <path d="M24 20 A18 18 0 0 1 24 20 L24 2 A18 18 0 0 0 24 38 Z" fill="#F4A623" />
        <path d="M24 2 A18 18 0 0 0 24 38" fill="none" stroke="#D4882B" strokeWidth="3" />
        {/* Straight edge crust */}
        <line x1="24" y1="2" x2="24" y2="38" stroke="#D4882B" strokeWidth="2" />
        {/* Sauce */}
        <path d="M24 5 A15 15 0 0 0 24 35 Z" fill="#E8553A" />
        {/* Cheese */}
        <circle cx="16" cy="14" r="2.5" fill="#FFD54F" />
        <circle cx="12" cy="24" r="2.5" fill="#FFD54F" />
        <circle cx="19" cy="20" r="2" fill="#FFD54F" />
        {/* Pepperoni */}
        <circle cx="14" cy="19" r="1.8" fill="#C62828" />
        <circle cx="18" cy="28" r="1.5" fill="#C62828" />
        <circle cx="17" cy="11" r="1.5" fill="#C62828" />
      </svg>
    )
  }

  // Single slice (default)
  return (
    <svg width={size * 0.7} height={size} viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Slice shape - triangle with rounded top */}
      <path d="M14 38 L2 6 A16 16 0 0 1 26 6 Z" fill="#F4A623" />
      {/* Crust arc */}
      <path d="M2 6 A16 16 0 0 1 26 6" fill="#D4882B" stroke="#D4882B" strokeWidth="1" />
      <path d="M3 8 A14 14 0 0 1 25 8 L14 36 Z" fill="#E8553A" />
      {/* Cheese */}
      <circle cx="14" cy="14" r="2.5" fill="#FFD54F" />
      <circle cx="10" cy="22" r="2" fill="#FFD54F" />
      <circle cx="17" cy="20" r="1.8" fill="#FFD54F" />
      {/* Pepperoni */}
      <circle cx="14" cy="18" r="1.8" fill="#C62828" />
      <circle cx="12" cy="26" r="1.5" fill="#C62828" />
    </svg>
  )
}

export default PizzaIcon
