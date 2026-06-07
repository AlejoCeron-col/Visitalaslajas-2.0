import bcrypt from 'bcryptjs'

import {
  validateEmail,
  validateCedula,
  validatePhoneNumber,
  validatePassword,
} from '../../src/utils.js'

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

})
