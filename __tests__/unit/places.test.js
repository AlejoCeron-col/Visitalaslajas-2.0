/**
 * Filtra lugares turísticos por palabra clave
 * @param {Array} lugares - Array de lugares
 * @param {string} keyword - Palabra clave para buscar
 * @returns {Array} Lugares filtrados
 */
export const filterPlaces = (lugares, keyword) => {
  if (!keyword) return lugares
  const lowerKeyword = keyword.toLowerCase()
  return lugares.filter(lugar =>
    lugar.nombre.toLowerCase().includes(lowerKeyword) ||
    lugar.descripcion.toLowerCase().includes(lowerKeyword)
  )
}

/**
 * Calcula distancia entre dos puntos geográficos (Haversine)
 * @param {number} lat1 - Latitud 1
 * @param {number} lon1 - Longitud 1
 * @param {number} lat2 - Latitud 2
 * @param {number} lon2 - Longitud 2
 * @returns {number} Distancia en km
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Ordena lugares por distancia desde un punto
 * @param {Array} lugares - Array de lugares
 * @param {number} lat - Latitud del punto
 * @param {number} lon - Longitud del punto
 * @returns {Array} Lugares ordenados
 */
export const sortByDistance = (lugares, lat, lon) => {
  return [...lugares].sort((a, b) => {
    const distA = calculateDistance(lat, lon, a.coordenadas[0], a.coordenadas[1])
    const distB = calculateDistance(lat, lon, b.coordenadas[0], b.coordenadas[1])
    return distA - distB
  })
}

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
