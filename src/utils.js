/**
 * @fileoverview Middleware y funciones de utilidad para el sistema de turismo.
 * Incluye funciones de validación, formateo y cálculos geográficos.
 */

/**
 * Valida que el email tenga un formato correcto
 * @param {string} email - Dirección de correo electrónico
 * @returns {boolean} True si el email es válido, false en caso contrario
 * @example
 * validateEmail('user@example.com') // true
 * validateEmail('invalid.email') // false
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida que la cédula tenga un formato correcto
 * @param {string|number} cedula - Número de cédula
 * @returns {boolean} True si la cédula es válida, false en caso contrario
 * @example
 * validateCedula('1234567890') // true
 * validateCedula('123') // false
 */
export const validateCedula = (cedula) => {
  if (!cedula) return false
  const cedulaStr = cedula.toString()
  return cedulaStr.length >= 8 && /^\d+$/.test(cedulaStr)
}

/**
 * Valida el formato de teléfono
 * @param {string} telefono - Número telefónico
 * @returns {boolean} True si el teléfono es válido
 * @example
 * validatePhoneNumber('3001234567') // true
 * validatePhoneNumber('+57 300 123 4567') // true
 */
export const validatePhoneNumber = (telefono) => {
  if (!telefono || typeof telefono !== 'string') return false
  return /^[\d\s\-\+()]+$/.test(telefono) && telefono.length >= 8
}

/**
 * Valida que la contraseña cumpla requisitos mínimos
 * @param {string} password - Contraseña a validar
 * @returns {boolean} True si la contraseña es válida
 * @example
 * validatePassword('SecurePass123') // true
 * validatePassword('123') // false
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return false
  return password.length >= 6
}

/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula Haversine
 * @param {number} lat1 - Latitud del primer punto
 * @param {number} lon1 - Longitud del primer punto
 * @param {number} lat2 - Latitud del segundo punto
 * @param {number} lon2 - Longitud del segundo punto
 * @returns {number} Distancia en kilómetros
 * @example
 * calculateDistance(0.8042, -77.5847, 0.8048, -77.5842) // ~0.65 km
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radio de la Tierra en kilómetros
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
 * Ordena un array de lugares por distancia desde un punto de referencia
 * @param {Array<Object>} lugares - Array de lugares con propiedad 'coordenadas'
 * @param {number} lat - Latitud del punto de referencia
 * @param {number} lon - Longitud del punto de referencia
 * @returns {Array<Object>} Array ordenado de lugares (copia, no modifica original)
 * @example
 * sortByDistance(places, 0.8042, -77.5847)
 */
export const sortByDistance = (lugares, lat, lon) => {
  return [...lugares].sort((a, b) => {
    const distA = calculateDistance(lat, lon, a.coordenadas[0], a.coordenadas[1])
    const distB = calculateDistance(lat, lon, b.coordenadas[0], b.coordenadas[1])
    return distA - distB
  })
}

/**
 * Filtra lugares turísticos por palabra clave en nombre o descripción
 * @param {Array<Object>} lugares - Array de lugares a filtrar
 * @param {string} keyword - Palabra clave para búsqueda (case-insensitive)
 * @returns {Array<Object>} Array filtrado de lugares
 * @example
 * filterPlaces(allPlaces, 'Santuario')
 * // Retorna lugares que contengan 'Santuario' en nombre o descripción
 */
export const filterPlaces = (lugares, keyword) => {
  if (!keyword || keyword.trim() === '') return lugares
  const lowerKeyword = keyword.toLowerCase()
  return lugares.filter(lugar =>
    (lugar.nombre && lugar.nombre.toLowerCase().includes(lowerKeyword)) ||
    (lugar.descripcion && lugar.descripcion.toLowerCase().includes(lowerKeyword))
  )
}

/**
 * Formatea una fecha en formato DD/MM/YYYY
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada como DD/MM/YYYY o string vacío si es inválida
 * @example
 * formatDate(new Date('2026-06-03')) // '03/06/2026'
 * formatDate('2026-01-05') // '05/01/2026'
 */
export const formatDate = (date) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  } catch {
    return ''
  }
}

/**
 * Calcula la edad en años basada en la fecha de nacimiento
 * @param {Date|string} birthDate - Fecha de nacimiento
 * @returns {number} Edad en años
 * @example
 * calculateAge('2000-01-15') // ~26 años (en 2026)
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0
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
 * Pagina un array de items
 * @param {Array} items - Items a paginar
 * @param {number} page - Número de página (1-indexado, default: 1)
 * @param {number} pageSize - Cantidad de items por página (default: 10)
 * @returns {Object} Objeto con propiedades: items, total, pages, current
 * @example
 * paginate(allPlaces, 2, 15)
 * // { items: [...15 places], total: 45, pages: 3, current: 2 }
 */
export const paginate = (items, page = 1, pageSize = 10) => {
  if (!Array.isArray(items)) {
    return { items: [], total: 0, pages: 0, current: page }
  }
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

/**
 * Sanitiza entrada de texto para prevenir inyección de código
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 * @example
 * sanitizeInput('<script>alert("XSS")</script>') // Retorna texto sin tags
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export default {
  validateEmail,
  validateCedula,
  validatePhoneNumber,
  validatePassword,
  calculateDistance,
  sortByDistance,
  filterPlaces,
  formatDate,
  calculateAge,
  paginate,
  sanitizeInput
}
