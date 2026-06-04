# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: guia_turistica.spec.js >> Guía Turística E2E >> should load and display tourist guide page
- Location: e2e\guia_turistica.spec.js:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1, h2, .title')
Expected: visible
Error: strict mode violation: locator('h1, h2, .title') resolved to 5 elements:
    1) <h2>Construye tu recorrido turistico</h2> aka getByRole('heading', { name: 'Construye tu recorrido' })
    2) <h1 class="titlugares">Selecciona los lugares que quieres visitar</h1> aka getByRole('heading', { name: 'Selecciona los lugares que' })
    ...

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h1, h2, .title')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - img [ref=e4]
    - navigation [ref=e8]:
      - link "Inicio" [ref=e10] [cursor=pointer]:
        - /url: /
      - link "Lugares para visitar" [ref=e12] [cursor=pointer]:
        - /url: /lugares_visita
      - link "Hoteles" [ref=e14] [cursor=pointer]:
        - /url: /hoteles
      - link "Restaurantes" [ref=e16] [cursor=pointer]:
        - /url: /restaurantes
      - link "Guia turistica" [ref=e18] [cursor=pointer]:
        - /url: /guia_turistica
      - link "Consulta tu reservacion" [ref=e20] [cursor=pointer]:
        - /url: /consulta_reserva
    - generic [ref=e21]:
      - link "Registrarse" [ref=e22] [cursor=pointer]:
        - /url: /registro
      - link "Iniciar sesion" [ref=e23] [cursor=pointer]:
        - /url: /iniciosesion
  - main [ref=e24]:
    - generic [ref=e25]:
      - generic [ref=e27]:
        - heading "Construye tu recorrido turistico" [level=2] [ref=e28]
        - main [ref=e29]:
          - generic [ref=e30]:
            - generic:
              - generic [ref=e31]:
                - button "Zoom in" [ref=e32] [cursor=pointer]: +
                - button "Zoom out" [ref=e33] [cursor=pointer]: −
              - generic [ref=e34]:
                - link "Leaflet" [ref=e35] [cursor=pointer]:
                  - /url: https://leafletjs.com
                  - img [ref=e36]
                  - text: Leaflet
                - text: "| ©"
                - link "OpenStreetMap" [ref=e40] [cursor=pointer]:
                  - /url: https://www.openstreetmap.org/copyright
      - generic [ref=e42]:
        - heading "Selecciona los lugares que quieres visitar" [level=1] [ref=e43]
        - generic [ref=e44]:
          - generic [ref=e46]:
            - generic [ref=e47]: Santuario de Las Lajas
            - img [ref=e48]
            - generic [ref=e49]: Basílica construida sobre un cañón, una de las iglesias más hermosas del mundo
          - generic [ref=e54]:
            - generic [ref=e55]: Puente del Santuario
            - img [ref=e56]
            - generic [ref=e57]: Impresionante puente que conecta con el Santuario sobre el río Guáitara
          - generic [ref=e62]:
            - generic [ref=e63]: Mirador de Las Lajas
            - img [ref=e64]
            - generic [ref=e65]: Punto panorámico con vistas espectaculares del cañón y el santuario
          - generic [ref=e70]:
            - generic [ref=e71]: Centro Histórico de Ipiales
            - img [ref=e72]
            - generic [ref=e73]: Zona histórica con arquitectura colonial y calles tradicionales
          - generic [ref=e78]:
            - generic [ref=e79]: Catedral de Ipiales
            - img [ref=e80]
            - generic [ref=e81]: Catedral principal de la ciudad con arquitectura neoclásica
          - generic [ref=e86]:
            - generic [ref=e87]: Parque Santander
            - img [ref=e88]
            - generic [ref=e89]: Plaza principal de Ipiales, centro de actividad social y cultural
          - generic [ref=e94]:
            - generic [ref=e95]: Plaza de Mercado
            - img [ref=e96]
            - generic [ref=e97]: Mercado tradicional con productos locales y artesanías de la región
          - generic [ref=e102]:
            - generic [ref=e103]: Puente Internacional de Rumichaca
            - img [ref=e104]
            - generic [ref=e105]: Puente fronterizo entre Colombia y Ecuador sobre el río Carchi
      - generic [ref=e110]:
        - heading "Selecciona el guía que prefieras" [level=2] [ref=e111]
        - generic [ref=e112]:
          - generic [ref=e113] [cursor=pointer]:
            - generic [ref=e114]: Carlos Mendoza
            - img "Carlos Mendoza" [ref=e115]
            - generic [ref=e116]: ★ ★ ★ ★ ★
          - generic [ref=e120] [cursor=pointer]:
            - generic [ref=e121]: María López
            - img "María López" [ref=e122]
            - generic [ref=e123]: ★ ★ ★ ★ ☆
          - generic [ref=e127] [cursor=pointer]:
            - generic [ref=e128]: Jorge Ramírez
            - img "Jorge Ramírez" [ref=e129]
            - generic [ref=e130]: ★ ★ ★ ★ ★
          - generic [ref=e134] [cursor=pointer]:
            - generic [ref=e135]: Ana Torres
            - img "Ana Torres" [ref=e136]
            - generic [ref=e137]: ★ ★ ★ ★ ☆
          - generic [ref=e141] [cursor=pointer]:
            - generic [ref=e142]: Luis Fernández
            - img "Luis Fernández" [ref=e143]
            - generic [ref=e144]: ★ ★ ★ ☆ ☆
          - generic [ref=e148] [cursor=pointer]:
            - generic [ref=e149]: Sofía Rojas
            - img "Sofía Rojas" [ref=e150]
            - generic [ref=e151]: ★ ★ ★ ★ ★
          - generic [ref=e155] [cursor=pointer]:
            - generic [ref=e156]: Andrés Calderón
            - img "Andrés Calderón" [ref=e157]
            - generic [ref=e158]: ★ ★ ★ ★ ☆
          - generic [ref=e162] [cursor=pointer]:
            - generic [ref=e163]: Paula Guerrero
            - img "Paula Guerrero" [ref=e164]
            - generic [ref=e165]: ★ ★ ★ ★ ★
          - generic [ref=e169] [cursor=pointer]:
            - generic [ref=e170]: Diego Castro
            - img "Diego Castro" [ref=e171]
            - generic [ref=e172]: ★ ★ ★ ☆ ☆
          - generic [ref=e176] [cursor=pointer]:
            - generic [ref=e177]: Laura Peña
            - img "Laura Peña" [ref=e178]
            - generic [ref=e179]: ★ ★ ★ ★ ☆
      - heading "Inicia secion para realizar una reservacion" [level=2] [ref=e184]
  - contentinfo [ref=e185]:
    - generic [ref=e186]: Contactanos
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Guía Turística E2E', () => {
  4  |   test('should load and display tourist guide page', async ({ page }) => {
  5  |     await page.goto('/guia_turistica')
  6  |     
  7  |     // Verify page title
  8  |     await expect(page).toHaveTitle(/Mapa Turístico/)
  9  |     
  10 |     // Verify main heading exists
  11 |     const heading = page.locator('h1, h2, .title')
> 12 |     await expect(heading).toBeVisible()
     |                           ^ Error: expect(locator).toBeVisible() failed
  13 |   })
  14 | 
  15 |   test('should display list of tourist places', async ({ page }) => {
  16 |     await page.goto('/guia_turistica')
  17 |     
  18 |     // Verify that places are rendered
  19 |     // Assuming places are in a list or grid structure
  20 |     const placesContainer = page.locator('[data-testid="places-list"], ul, .places-grid')
  21 |     
  22 |     // At minimum, verify the page has loaded content
  23 |     const pageContent = page.locator('body')
  24 |     await expect(pageContent).toContainText(/Santuario|Las Lajas|lugares/)
  25 |   })
  26 | 
  27 |   test('should display tour guides information', async ({ page }) => {
  28 |     await page.goto('/guia_turistica')
  29 |     
  30 |     // Verify guides are displayed
  31 |     const guideNames = page.locator('body')
  32 |     await expect(guideNames).toContainText(/Carlos|María|guía/)
  33 |   })
  34 | 
  35 |   test('should be responsive on mobile', async ({ page }) => {
  36 |     // Set mobile viewport
  37 |     await page.setViewportSize({ width: 375, height: 667 })
  38 |     
  39 |     await page.goto('/guia_turistica')
  40 |     
  41 |     // Verify page is still functional on mobile
  42 |     await expect(page).toHaveTitle(/Mapa Turístico/)
  43 |     const pageContent = page.locator('body')
  44 |     await expect(pageContent).toBeVisible()
  45 |   })
  46 | })
  47 | 
```