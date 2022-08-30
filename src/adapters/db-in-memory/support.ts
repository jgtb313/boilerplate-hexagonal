import { calculateSkip } from '@/ports/database/support'

export const paginate = <T>(data: T[], page: number, limit: number) => {
  const skip = calculateSkip(page, limit)

  const total = data.length

  const docs = data
    .filter((_, index) => index >= skip)
    .slice(0, limit)

  return {
    docs,
    page,
    limit,
    total,
  }
}
