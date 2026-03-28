interface IconProps {
  size?: number
  className?: string
}

export function IconSettings({ size = 18, className }: IconProps) {
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
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 1.5V3M9 15V16.5M1.5 9H3M15 9H16.5M3.697 3.697L4.757 4.757M13.243 13.243L14.303 14.303M3.697 14.303L4.757 13.243M13.243 4.757L14.303 3.697"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
