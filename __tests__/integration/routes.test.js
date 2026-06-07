import request from 'supertest'
import express from 'express'
import path from 'path'
import mapaRoutes from '../../src/routes/rutas.js'
import pool from '../../src/db/postgres.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src/views/layout'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), 'public')))

jest.mock('../../src/db/postgres.js', () => ({
  __esModule: true,
  default: {
    query: jest.fn()
  }
}))


// Mock session
app.use((req, res, next) => {
  req.session = {
    user: {
      id: 1,
      nombre: 'Usuario Test'
    }
  }
  next()
})
app.use(mapaRoutes)

describe('Mapa Routes Integration Tests', () => {
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


    it('should get reservation by cedula', async () => {
  const cedula = Date.now().toString()

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
    .get('/api/reservas/99999999999')

  expect(res.status).toBe(404)
})

it('should delete reservation', async () => {

  pool.query
    .mockResolvedValueOnce({
      rows: [{ id: 1 }]
    })
    .mockResolvedValueOnce({
      rowCount: 1
    })

  const create = await request(app)
    .post('/api/reservas')
    .send({
      cedula: Date.now().toString(),
      nombre: 'Usuario Test',
      lugaresSeleccionados: ['santuario'],
      guiaId: 'g1'
    })

  const id = create.body.reserva.id

  const res = await request(app)
    .delete(`/api/reservas/${id}`)

  expect(res.status).toBe(200)
  expect(res.body.success).toBe(true)
})

beforeEach(() => {
  jest.clearAllMocks()
})

it('should return 404 when deleting nonexistent reservation', async () => {
  pool.query.mockResolvedValueOnce({
  rowCount: 0
})
  const res = await request(app)
    .delete('/api/reservas/999999')

  expect(res.status).toBe(404)
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
