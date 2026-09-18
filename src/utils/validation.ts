export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[0-9\s-]{7,15}$/.test(phone.trim())
}

export function cleanUsername(input: string): string {
  return input.trim().replace(/^@+/, '')
}
