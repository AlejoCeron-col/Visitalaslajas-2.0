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
    3) <h2 class="titlugares">Selecciona el guía que prefieras</h2> aka getByRole('heading', { name: 'Selecciona el guía que' })
    4) <h2>Inicia secion para realizar una reservacion</h2> aka getByRole('heading', { name: 'Inicia secion para realizar' })
    5) <h2 class="modal-title">Registro guardado con éxito</h2> aka getByText('Registro guardado con éxito')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h1, h2, .title')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - img [ref=e4]
    - navigation [ref=e10]:
      - link "Inicio" [ref=e12]:
        - /url: /
      - link "Lugares para visitar" [ref=e14]:
        - /url: /lugares_visita
      - link "Hoteles" [ref=e16]:
        - /url: /hoteles
      - link "Restaurantes" [ref=e18]:
        - /url: /restaurantes
      - link "Guia turistica" [ref=e20]:
        - /url: /guia_turistica
      - link "Consulta tu reservacion" [ref=e22]:
        - /url: /consulta_reserva
    - generic [ref=e23]:
      - link "Registrarse" [ref=e24]:
        - /url: /registro
      - link "Iniciar sesion" [ref=e25]:
        - /url: /iniciosesion
  - main [ref=e26]:
    - generic [ref=e27]:
      - generic [ref=e29]:
        - heading "Construye tu recorrido turistico" [level=2] [ref=e30]
        - main [ref=e31]:
          - generic [ref=e32]:
            - generic:
              - generic [ref=e33]:
                - button "Zoom in" [ref=e34]: +
                - button "Zoom out" [ref=e35]: −
              - generic [ref=e36]:
                - link "Leaflet" [ref=e37]:
                  - /url: https://leafletjs.com
                  - img [ref=e38]
                  - text: Leaflet
                - text: "| ©"
                - link "OpenStreetMap" [ref=e42]:
                  - /url: https://www.openstreetmap.org/copyright
      - generic [ref=e44]:
        - heading "Selecciona los lugares que quieres visitar" [level=1] [ref=e45]
        - generic [ref=e46]:
          - generic [ref=e48]:
            - generic [ref=e49]: Santuario de Las Lajas
            - img [ref=e50]
            - generic [ref=e51]: Basílica construida sobre un cañón, una de las iglesias más hermosas del mundo
          - generic [ref=e56]:
            - generic [ref=e57]: Puente del Santuario
            - img [ref=e58]
            - generic [ref=e59]: Impresionante puente que conecta con el Santuario sobre el río Guáitara
          - generic [ref=e64]:
            - generic [ref=e65]: Mirador de Las Lajas
            - img [ref=e66]
            - generic [ref=e67]: Punto panorámico con vistas espectaculares del cañón y el santuario
          - generic [ref=e72]:
            - generic [ref=e73]: Centro Histórico de Ipiales
            - img [ref=e74]
            - generic [ref=e75]: Zona histórica con arquitectura colonial y calles tradicionales
          - generic [ref=e80]:
            - generic [ref=e81]: Catedral de Ipiales
            - img [ref=e82]
            - generic [ref=e83]: Catedral principal de la ciudad con arquitectura neoclásica
          - generic [ref=e88]:
            - generic [ref=e89]: Parque Santander
            - img [ref=e90]
            - generic [ref=e91]: Plaza principal de Ipiales, centro de actividad social y cultural
          - generic [ref=e96]:
            - generic [ref=e97]: Plaza de Mercado
            - img [ref=e98]
            - generic [ref=e99]: Mercado tradicional con productos locales y artesanías de la región
          - generic [ref=e104]:
            - generic [ref=e105]: Puente Internacional de Rumichaca
            - img [ref=e106]
            - generic [ref=e107]: Puente fronterizo entre Colombia y Ecuador sobre el río Carchi
      - generic [ref=e112]:
        - heading "Selecciona el guía que prefieras" [level=2] [ref=e113]
        - generic [ref=e114]:
          - generic [ref=e115] [cursor=pointer]:
            - generic [ref=e116]: Carlos Mendoza
            - img "Carlos Mendoza" [ref=e117]
            - generic [ref=e118]: ★ ★ ★ ★ ★
          - generic [ref=e122] [cursor=pointer]:
            - generic [ref=e123]: María López
            - img "María López" [ref=e124]
            - generic [ref=e125]: ★ ★ ★ ★ ☆
          - generic [ref=e129] [cursor=pointer]:
            - generic [ref=e130]: Jorge Ramírez
            - img "Jorge Ramírez" [ref=e131]
            - generic [ref=e132]: ★ ★ ★ ★ ★
          - generic [ref=e136] [cursor=pointer]:
            - generic [ref=e137]: Ana Torres
            - img "Ana Torres" [ref=e138]
            - generic [ref=e139]: ★ ★ ★ ★ ☆
          - generic [ref=e143] [cursor=pointer]:
            - generic [ref=e144]: Luis Fernández
            - img "Luis Fernández" [ref=e145]
            - generic [ref=e146]: ★ ★ ★ ☆ ☆
          - generic [ref=e150] [cursor=pointer]:
            - generic [ref=e151]: Sofía Rojas
            - img "Sofía Rojas" [ref=e152]
            - generic [ref=e153]: ★ ★ ★ ★ ★
          - generic [ref=e157] [cursor=pointer]:
            - generic [ref=e158]: Andrés Calderón
            - img "Andrés Calderón" [ref=e159]
            - generic [ref=e160]: ★ ★ ★ ★ ☆
          - generic [ref=e164] [cursor=pointer]:
            - generic [ref=e165]: Paula Guerrero
            - img "Paula Guerrero" [ref=e166]
            - generic [ref=e167]: ★ ★ ★ ★ ★
          - generic [ref=e171] [cursor=pointer]:
            - generic [ref=e172]: Diego Castro
            - img "Diego Castro" [ref=e173]
            - generic [ref=e174]: ★ ★ ★ ☆ ☆
          - generic [ref=e178] [cursor=pointer]:
            - generic [ref=e179]: Laura Peña
            - img "Laura Peña" [ref=e180]
            - generic [ref=e181]: ★ ★ ★ ★ ☆
      - heading "Inicia secion para realizar una reservacion" [level=2] [ref=e186]
  - contentinfo [ref=e187]:
    - generic [ref=e188]: Contactanos
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