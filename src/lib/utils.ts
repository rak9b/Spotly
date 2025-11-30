import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats currency from cents (integer) to a display string.
 * Example: 5000 cents -> $50.00
 */
export function formatCurrency(amountCents: number, currency: string = "USD") {
  // Handle potential missing or null values safely
  const safeAmount = amountCents || 0;
  
  return new Intl.NumberFormat("en-GB", { // Defaulting to en-GB as per project rules
    style: "currency",
    currency,
  }).format(safeAmount / 100);
}

export function formatDate(dateString: string) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
