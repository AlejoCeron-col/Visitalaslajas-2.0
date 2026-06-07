import {
  formatDate,
  calculateAge,
  paginate
} from '../../src/utils.js'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date(2023, 4, 15) // Mayo 15, 2023 (local time)
      expect(formatDate(date)).toBe('15/05/2023')
    })

    it('should pad single digit days and months', () => {
      const date = new Date(2023, 0, 5) // Enero 5, 2023 (local time)
      expect(formatDate(date)).toBe('05/01/2023')
    })

    it('should return empty string for null or undefined', () => {
      expect(formatDate(null)).toBe('')
      expect(formatDate(undefined)).toBe('')
    })

    it('should handle string dates', () => {
      expect(formatDate('2023-12-25')).toMatch(/\d{2}\/\d{2}\/2023/)
    })
  })

  describe('calculateAge', () => {
    it('should calculate age correctly', () => {
      const birthDate = new Date()
      birthDate.setFullYear(birthDate.getFullYear() - 25)
      expect(calculateAge(birthDate)).toBe(25)
    })

    it('should handle string dates', () => {
      const age = calculateAge('2000-01-01')
      expect(age).toBeGreaterThan(20)
      expect(age).toBeLessThan(30)
    })
  })

  describe('paginate', () => {
    const items = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }))

    it('should paginate items correctly', () => {
      const result = paginate(items, 1, 10)
      expect(result.items).toHaveLength(10)
      expect(result.total).toBe(25)
      expect(result.pages).toBe(3)
      expect(result.current).toBe(1)
    })

    it('should handle different pages', () => {
      const page2 = paginate(items, 2, 10)
      expect(page2.items).toHaveLength(10)
      expect(page2.items[0].id).toBe(11)
    })

    it('should handle last page with remaining items', () => {
      const page3 = paginate(items, 3, 10)
      expect(page3.items).toHaveLength(5)
    })

    it('should handle non-array input', () => {
      const result = paginate(null, 1, 10)
      expect(result.items).toEqual([])
      expect(result.total).toBe(0)
    })
  })
})
