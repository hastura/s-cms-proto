'use client'

import { usePathname } from 'next/navigation'
import {
  IconDashboard,
  IconPartners,
  IconUsers,
  IconEmail,
  IconSettings,
} from '@/components/icons'
import { SidebarNavItem } from './SidebarNavItem'

const navItems = [
  { label: 'Dashboard',     href: '/dashboard',     icon: <IconDashboard /> },
  { label: 'Clients',       href: '/clients',       icon: <IconPartners /> },
  { label: 'Users',         href: '/users',         icon: <IconUsers /> },
  { label: 'Email Preview', href: '/email-preview', icon: <IconEmail /> },
  { label: 'Settings',      href: '/settings',      icon: <IconSettings /> },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-0.5 px-3 pt-4" aria-label="Main navigation">
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          isActive={pathname.startsWith(item.href)}
        />
      ))}
    </nav>
  )
}
