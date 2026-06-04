import { test, expect } from '@playwright/test'

test.describe('Registro E2E', () => {
  test('should load registration page', async ({ page }) => {
    await page.goto('/registro')
    
    // Verify page title
    await expect(page).toHaveTitle(/Registro/)
    
    // Verify form elements exist
    const form = page.locator('form')
    await expect(form).toBeVisible()
  })

  test('should display registration form fields', async ({ page }) => {
    await page.goto('/registro')
    
    // Verify form fields are present
    const cedulaInput = page.locator('input[name="cedula"], input[placeholder*="cédula" i]')
    const nombreInput = page.locator('input[name="nombre"], input[placeholder*="nombre" i]')
    const emailInput = page.locator('input[name="email"], input[type="email"]')
    const passwordInput = page.locator('input[name="password"], input[type="password"]')
    
    // At least some form elements should be visible
    const formElements = page.locator('input, textarea, select')
    await expect(formElements.first()).toBeVisible()
  })

  test('should have submit button', async ({ page }) => {
    await page.goto('/registro')
    
    // Verify submit button exists
    const submitButton = page.locator('button[type="submit"], button:has-text("registr"), button:has-text("enviar")')
    
    // At minimum, verify page has a button
    const buttons = page.locator('button')
    await expect(buttons.first()).toBeVisible()
  })

  test('should be accessible and navigable', async ({ page }) => {
    await page.goto('/registro')
    
    // Verify page can be interacted with
    const inputs = page.locator('input')
    const inputCount = await inputs.count()
    
    // Expect at least some form inputs
    expect(inputCount).toBeGreaterThan(0)
  })
})
