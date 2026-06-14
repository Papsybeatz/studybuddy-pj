import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  /** Optional emoji or JSX icon shown to the left of the title */
  icon?: ReactNode
  className?: string
}

export default function Card({ title, children, icon, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-xl leading-none">{icon}</span>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  )
}
