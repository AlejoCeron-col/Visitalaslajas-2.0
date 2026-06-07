import request from 'supertest'
import express from 'express'
import path from 'path'

// =========================
// MOCK (SIEMPRE PRIMERO)
// =========================
jest.mock('../../src/db/postgres.js', () => ({
  __esModule: true,
  default: {
    query: jest.fn()
  }
}))

import pool from '../../src/db/postgres.js'
import mapaRoutes from '../../src/routes/rutas.js'

// =========================
// APP SETUP
// =========================
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src/views/layout'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), 'public')))

// Mock session
app.use((req, res, next) => {
  req.session = { user: { id: 1, nombre: 'Usuario Test' } }
  next()
})

app.use(mapaRoutes)

// =========================
// CLEAN MOCK STATE
// =========================
beforeEach(() => {
  jest.clearAllMocks()
})

// =========================
// TESTS
// =========================
describe('Mapa Routes Integration Tests', () => {

  describe('GET /guia_turistica', () => {
    it('should render page', async () => {
      const res = await request(app)
        .get('/guia_turistica')
        .expect(200)

      expect(res.text.length).toBeGreaterThan(0)
    })
  })

  describe('GET /consulta_reserva', () => {

    it('should render consulta_reserva page', async () => {
      const res = await request(app)
        .get('/consulta_reserva')
        .expect(200)

      expect(res.text.length).toBeGreaterThan(0)
    })

    it('should get reservation by cedula', async () => {
      const cedula = '123456789'

      pool.query.mockResolvedValueOnce({
        rowCount: 1,
        rows: [{
          cedula,
          lugares_seleccionados: ['santuario'],
          guia_id: 'g1'
        }]
      })

      const res = await request(app)
        .get(`/api/reservas/${cedula}`)

      expect(res.status).toBe(200)
      expect(res.body.cedula).toBe(cedula)
      expect(res.body.lugaresInfo.length).toBeGreaterThan(0)
    })

    it('should return 404 for nonexistent reservation', async () => {
      pool.query.mockResolvedValueOnce({
        rowCount: 0,
        rows: []
      })

      const res = await request(app)
        .get('/api/reservas/999999')

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('No se encontraron reservas con esa cédula')
    })

    it('should delete reservation successfully', async () => {
      pool.query.mockResolvedValueOnce({
        rowCount: 1
      })

      const res = await request(app)
        .delete('/api/reservas/1')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })

    it('should return 404 when deleting nonexistent reservation', async () => {
      pool.query.mockResolvedValueOnce({
        rowCount: 0
      })

      const res = await request(app)
        .delete('/api/reservas/999999')

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('Reserva no encontrada')
    })

  })

  describe('Static files', () => {
    it('should serve CSS files', async () => {
      await request(app)
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