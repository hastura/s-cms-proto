import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default:    'bg-neutral-100 text-neutral-700',
        primary:    'bg-primary-50 text-primary-700',
        'on-track': 'bg-success-50 text-success-500',
        'at-risk':  'bg-warning-50 text-warning-500',
        'off-track':'bg-danger-50 text-danger-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  className?: string
  children: React.ReactNode
}

export function Badge({ variant, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  )
}
