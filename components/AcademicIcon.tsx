import type { ReactNode, SVGProps } from 'react'

export type AcademicIconName =
  | 'book'
  | 'beaker'
  | 'bolt'
  | 'calendar'
  | 'chart'
  | 'check'
  | 'compass'
  | 'crown'
  | 'flask'
  | 'folder'
  | 'graduation'
  | 'heart'
  | 'lightbulb'
  | 'lock'
  | 'settings'
  | 'spark'
  | 'target'
  | 'warning'

const paths: Record<AcademicIconName, ReactNode> = {
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20M8 7h8M8 10h6" /></>,
  beaker: <><path d="M9 3v5l-5.2 9.1A2 2 0 0 0 5.5 20h9a2 2 0 0 0 1.7-2.9L11 8V3M7 3h6M6.5 15h7" /></>,
  bolt: <path d="m13 2-8 11h6l-1 9 8-11h-6l1-9Z" />,
  calendar: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M7 2.5v4M17 2.5v4M3 9h18M7 13h.01M11 13h.01M15 13h.01M7 17h.01M11 17h.01" /></>,
  chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 3-4 3 2 5-7" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  crown: <path d="m4 7 4 4 4-7 4 7 4-4-2 11H6L4 7Zm3 14h10" />,
  flask: <><path d="M9 3v5l-5.2 9.1A2 2 0 0 0 5.5 20h13a2 2 0 0 0 1.7-2.9L15 8V3M7 3h10M7 15h10" /></>,
  folder: <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2h6.5A2.5 2.5 0 0 1 21 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15.5v-9Z" />,
  graduation: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 11.2V16c2.8 2.3 7.2 2.3 10 0v-4.8M21 9v6" /></>,
  heart: <path d="M20.8 8.8c0 5.1-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />,
  lightbulb: <><path d="M9 18h6M10 21h4M8.5 14.5A6 6 0 1 1 15.5 14c-.8.8-1.3 1.5-1.5 2.5h-4c-.2-1-.7-1.7-1.5-2.5Z" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L9 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H7.6v-2h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L9 9l1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h2v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L20 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2h-.2a1.7 1.7 0 0 0-1.8 1Z" /></>,
  spark: <><path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  warning: <><path d="m12 3 9 16H3L12 3Z" /><path d="M12 9v4M12 16h.01" /></>,
}

export default function AcademicIcon({ name, size = 20, strokeWidth = 1.8, ...props }: SVGProps<SVGSVGElement> & { name: AcademicIconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
