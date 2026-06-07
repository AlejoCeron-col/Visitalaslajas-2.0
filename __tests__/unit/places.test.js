import {
  calculateDistance,
  sortByDistance,
  filterPlaces
} from '../../src/utils.js'



describe('Places Utilities', () => {
  const mockPlaces = [
    {
      id: 'santuario',
      nombre: 'Santuario de Las Lajas',
      descripcion: 'Basílica construida sobre un cañón',
      coordenadas: [0.8042, -77.5847],
      color: '#059669'
    },
    {
      id: 'puente',
      nombre: 'Puente del Santuario',
      descripcion: 'Impresionante puente',
      coordenadas: [0.8048, -77.5842],
      color: '#0891b2'
    },
    {
      id: 'mirador',
      nombre: 'Mirador de Las Lajas',
      descripcion: 'Punto panorámico',
      coordenadas: [0.8055, -77.5838],
      color: '#7c3aed'
    }
  ]

  describe('filterPlaces', () => {
    it('should return all places when keyword is empty', () => {
      expect(filterPlaces(mockPlaces, '')).toEqual(mockPlaces)
      expect(filterPlaces(mockPlaces, null)).toEqual(mockPlaces)
    })

    it('should filter places by name', () => {
      const result = filterPlaces(mockPlaces, 'Mirador')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('mirador')
    })

    it('should filter places by description', () => {
      const result = filterPlaces(mockPlaces, 'Puente')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('puente')
    })

    it('should be case-insensitive', () => {
      const result = filterPlaces(mockPlaces, 'mirador')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('mirador')
    })
  })

  describe('calculateDistance', () => {
    it('should calculate correct distance between two points', () => {
      // Coordinates of two places in Las Lajas area
      const distance = calculateDistance(0.8042, -77.5847, 0.8048, -77.5842)
      expect(distance).toBeGreaterThan(0)
      expect(distance).toBeLessThan(1) // Should be less than 1km apart
    })

    it('should return 0 for same coordinates', () => {
      const distance = calculateDistance(0.8042, -77.5847, 0.8042, -77.5847)
      expect(distance).toBe(0)
    })
  })

  describe('sortByDistance', () => {
    it('should sort places by distance from reference point', () => {
      const referencePoint = [0.8042, -77.5847] // Santuario
      const sorted = sortByDistance(mockPlaces, referencePoint[0], referencePoint[1])
      expect(sorted[0].id).toBe('santuario')
    })

    it('should not modify original array', () => {
      const original = [...mockPlaces]
      sortByDistance(mockPlaces, 0.8042, -77.5847)
      expect(mockPlaces).toEqual(original)
    })
  })
})
