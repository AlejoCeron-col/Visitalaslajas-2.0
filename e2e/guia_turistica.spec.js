import { test, expect } from '@playwright/test'

test.describe('Guía Turística E2E', () => {
  test('should load and display tourist guide page', async ({ page }) => {
    await page.goto('/guia_turistica')
    
    // Verify page title
    await expect(page).toHaveTitle(/Mapa Turístico/)
    
    // Verify main heading exists
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('should display list of tourist places', async ({ page }) => {
    await page.goto('/guia_turistica')
    
    // Verify that places are rendered
    // Assuming places are in a list or grid structure
    const placesContainer = page.locator('[data-testid="places-list"], ul, .places-grid')
    
    // At minimum, verify the page has loaded content
    const pageContent = page.locator('body')
    await expect(pageContent).toContainText(/Santuario|Las Lajas|lugares/)
  })

  test('should display tour guides information', async ({ page }) => {
    await page.goto('/guia_turistica')
    
    // Verify guides are displayed
    const guideNames = page.locator('body')
    await expect(guideNames).toContainText(/Carlos|María|guía/)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('/guia_turistica')
    
    // Verify page is still functional on mobile
    await expect(page).toHaveTitle(/Mapa Turístico/)
    const pageContent = page.locator('body')
    await expect(pageContent).toBeVisible()
  })
})
