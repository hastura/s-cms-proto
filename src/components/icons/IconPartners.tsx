interface IconProps {
  size?: number
  className?: string
}

export function IconPartners({ size = 18, className }: IconProps) {
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
      <circle cx="7" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M1.5 15C1.5 12.5147 4.02944 10.5 7 10.5C9.97056 10.5 12.5 12.5147 12.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 4C13.3807 4 14.5 5.11929 14.5 6.5C14.5 7.88071 13.3807 9 12 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 13C15.8093 13.5 16.5 14.2 16.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
