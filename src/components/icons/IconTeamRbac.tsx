interface IconProps {
  size?: number
  className?: string
}

export function IconTeamRbac({ size = 18, className }: IconProps) {
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
      <circle cx="9" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15C3.5 12.5147 6.02944 10.5 9 10.5C9.68 10.5 10.333 10.613 10.932 10.82"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 10.5L10.5 11.5V14C10.5 15.3807 11.6193 16.5 13 16.5C14.3807 16.5 15.5 15.3807 15.5 14V11.5L13 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
