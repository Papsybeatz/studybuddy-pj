import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  /** Optional icon shown to the left of the title */
  icon?: ReactNode
  className?: string
}

export default function Card({ title, children, icon, className = '' }: CardProps) {
  return (
    <div
      className={`academic-card bg-white rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-xl leading-none">{icon}</span>}
        <h3 className="font-merriweather text-lg font-bold text-[#0A1A3A]">{title}</h3>
      </div>
      {children}
    </div>
  )
}
