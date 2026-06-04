import bcrypt from 'bcryptjs'

/**
 * Valida el correo electrónico
 * @param {string} email - Correo a validar
 * @returns {boolean} True si es válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida el formato de la cédula
 * @param {string} cedula - Cédula a validar
 * @returns {boolean} True si es válida
 */
export const validateCedula = (cedula) => {
  if (!cedula) return false
  const cedulaStr = cedula.toString()
  return cedulaStr.length >= 8 && /^\d+$/.test(cedulaStr)
}

/**
 * Valida el teléfono
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} True si es válido
 */
export const validatePhoneNumber = (telefono) => {
  if (!telefono) return false
  return /^[\d\s\-\+()]+$/.test(telefono) && telefono.length >= 8
}

/**
 * Valida la contraseña
 * @param {string} password - Contraseña a validar
 * @returns {boolean} True si cumple requisitos
 */
export const validatePassword = (password) => {
  if (!password) return false
  return password.length >= 6
}

/**
 * Compara una contraseña con su hash
 * @param {string} password - Contraseña en texto plano
 * @param {string} hash - Hash de la contraseña
 * @returns {boolean} True si coinciden
 */
export const comparePasswords = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

describe('Auth Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      expect(validateEmail('user@example.com')).toBe(true)
      expect(validateEmail('test.user@domain.co')).toBe(true)
    })

    it('should reject invalid email format', () => {
      expect(validateEmail('invalid.email')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validateCedula', () => {
    it('should validate correct cedula format', () => {
      expect(validateCedula('1234567890')).toBe(true)
      expect(validateCedula('12345678')).toBe(true)
    })

    it('should reject invalid cedula format', () => {
      expect(validateCedula('123')).toBe(false)
      expect(validateCedula('12345abc')).toBe(false)
      expect(validateCedula('')).toBe(false)
      expect(validateCedula(null)).toBe(false)
    })
  })

  describe('validatePhoneNumber', () => {
    it('should validate correct phone number format', () => {
      expect(validatePhoneNumber('3001234567')).toBe(true)
      expect(validatePhoneNumber('+57 300 123 4567')).toBe(true)
      expect(validatePhoneNumber('(300) 123-4567')).toBe(true)
    })

    it('should reject invalid phone number format', () => {
      expect(validatePhoneNumber('123')).toBe(false)
      expect(validatePhoneNumber('abc123')).toBe(false)
      expect(validatePhoneNumber('')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate password with minimum length', () => {
      expect(validatePassword('password123')).toBe(true)
      expect(validatePassword('123456')).toBe(true)
    })

    it('should reject password too short', () => {
      expect(validatePassword('12345')).toBe(false)
      expect(validatePassword('')).toBe(false)
      expect(validatePassword(null)).toBe(false)
    })
  })

  describe('comparePasswords', () => {
    it('should return true for matching passwords', async () => {
      const password = 'myPassword123'
      const hash = await bcrypt.hash(password, 10)
      const result = await comparePasswords(password, hash)
      expect(result).toBe(true)
    })

    it('should return false for non-matching passwords', async () => {
      const password = 'myPassword123'
      const hash = await bcrypt.hash(password, 10)
      const result = await comparePasswords('wrongPassword', hash)
      expect(result).toBe(false)
    })
  })
})
