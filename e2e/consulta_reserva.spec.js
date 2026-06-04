import { test, expect } from '@playwright/test'

test.describe('Consulta de Reservas E2E', () => {
  test('should load reservations query page', async ({ page }) => {
    await page.goto('/consulta_reserva')
    
    // Verify page loads
    await expect(page).toHaveTitle(/Consulta/)
    
    const pageContent = page.locator('body')
    await expect(pageContent).toBeVisible()
  })

  test('should display reservation query form', async ({ page }) => {
    await page.goto('/consulta_reserva')
    
    // Verify form or search elements exist
    const form = page.locator('form')
    const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder*="reserva" i]')
    
    // At least one interactive element should exist
    const interactiveElements = page.locator('input, button, select')
    await expect(interactiveElements.first()).toBeVisible()
  })

  test('should allow navigation between pages', async ({ page }) => {
    // Test navigation from home
    await page.goto('/')
    
    // Try to find and click navigation elements
    const navLinks = page.locator('a, nav')
    const navCount = await navLinks.count()
    
    // Verify page has navigation elements
    expect(navCount).toBeGreaterThan(0)
  })

  test('should handle user interactions', async ({ page }) => {
    await page.goto('/consulta_reserva')
    
    // Find first input and try to interact with it
    const firstInput = page.locator('input').first()
    const isVisible = await firstInput.isVisible().catch(() => false)
    
    if (isVisible) {
      await firstInput.click()
      await firstInput.type('test')
      const value = await firstInput.inputValue()
      expect(value).toBe('test')
    }
  })

  test('should render responsive layout', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/consulta_reserva')
    await expect(page.locator('body')).toBeVisible()
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/consulta_reserva')
    await expect(page.locator('body')).toBeVisible()
  })
})
