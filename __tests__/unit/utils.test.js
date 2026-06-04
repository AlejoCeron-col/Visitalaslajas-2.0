/**
 * Formatea fecha a formato DD/MM/YYYY
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Calcula edad en años
 * @param {Date|string} birthDate - Fecha de nacimiento
 * @returns {number} Edad en años
 */
export const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

/**
 * Pagina un array
 * @param {Array} items - Items a paginar
 * @param {number} page - Número de página (1-indexed)
 * @param {number} pageSize - Tamaño de página
 * @returns {Object} { items, total, pages, current }
 */
export const paginate = (items, page = 1, pageSize = 10) => {
  if (!Array.isArray(items)) return { items: [], total: 0, pages: 0, current: page }
  const total = items.length
  const pages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    items: items.slice(start, end),
    total,
    pages,
    current: page
  }
}

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
