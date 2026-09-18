export function FlameIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2c.6 3-1.8 4.6-3.2 6.4C7.2 10.4 6 12.3 6 14.5 6 18.6 8.7 21 12 21s6-2.4 6-6.5c0-2.8-1.8-4.8-3-6.6-.3 1.6-1 2.4-1.7 2.9C13.7 8 13.5 4.6 12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.3 14.8c0 1.3.9 2.4 2 2.4s2-1 2-2.3c0-1-.6-1.6-1-2.2-.1.7-.4 1-.8 1.3-.2-.8-.3-1.6-1-2.4-.5 1-1.2 1.9-1.2 3.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}
