interface IconProps {
  size?: number
  className?: string
}

export function IconPricingEngine({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9.586 2.586A2 2 0 0 0 8.172 2H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414l6.828 6.828a2 2 0 0 0 2.828 0l4.172-4.172a2 2 0 0 0 0-2.828L9.586 2.586Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  )
}
