interface IconProps {
  size?: number
  className?: string
}

export function IconUsers({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14 11c1.86 0 3 1.07 3 2.5V15h-2v-1.5c0-.83-.67-1.5-1.5-1.5H7.5c-.83 0-1.5.67-1.5 1.5V15H4v-1.5C4 12.07 5.14 11 7 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="6.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 8.5a2 2 0 000-4M4 8.5a2 2 0 010-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
