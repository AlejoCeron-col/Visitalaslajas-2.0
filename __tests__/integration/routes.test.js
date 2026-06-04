import request from 'supertest'
import express from 'express'
import path from 'path'
import mapaRoutes from '../../src/routes/rutas.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src/views/layout'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), 'public')))

// Mock session
app.use((req, res, next) => {
  req.session = { user: null }
  next()
})

app.use(mapaRoutes)

describe.skip('Mapa Routes Integration Tests', () => {
  describe('GET /guia_turistica', () => {
    it('should render guia_turistica page successfully', async () => {
      const res = await request(app)
        .get('/guia_turistica')
        .expect('Content-Type', /html/)
        .expect(200)

      // Check that the page is rendered (contains HTML)
      expect(res.text.length).toBeGreaterThan(0)
    })

    it('should return HTML response for tourism guide', async () => {
      const res = await request(app)
        .get('/guia_turistica')
        .expect(200)

      // Check that it returns HTML content
      expect(res.text).toContain('html')
    })

    it('should not return error on tourism guide request', async () => {
      const res = await request(app)
        .get('/guia_turistica')
        .expect(200)

      // Verify no error message
      expect(res.status).not.toBe(500)
    })
  })

  describe('GET /consulta_reserva', () => {
    it('should render consulta_reserva page', async () => {
      const res = await request(app)
        .get('/consulta_reserva')
        .expect('Content-Type', /html/)
        .expect(200)

      expect(res.text).toContain('Consulta')
    })
  })

  describe('Static files', () => {
    it('should serve CSS files', async () => {
      const res = await request(app)
        .get('/css/style.css')
        .expect(200)
    })
  })
})

describe('Routes Error Handling', () => {
  it('should return 404 for non-existent route', async () => {
    await request(app)
      .get('/no-existe')
      .expect(404)
  })
})
