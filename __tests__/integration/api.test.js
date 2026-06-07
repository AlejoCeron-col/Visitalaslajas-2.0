import request from 'supertest'
import express from 'express'
import rutasRouter from '../../src/routes/rutas.js'
import path from 'path'
import pool from '../../src/db/postgres.js'



const app = express()

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src/views/layout'))

app.use((req, res, next) => {
  req.session = { user: null }
  next()
})

app.use((err, req, res, next) => {
  console.error('ERROR TEST:', err)
  next(err)
})

app.response.render = function(view, options) {
  this.status(200).send(`<html>${view}</html>`)
}

app.use(rutasRouter)




describe('API Integration Tests', () => {
  describe('GET /api/lugares', () => {
    it('should return list of tourist places', async () => {
      const res = await request(app)
        .get('/api/lugares')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThan(0)
      expect(res.body[0]).toHaveProperty('nombre')
      expect(res.body[0]).toHaveProperty('coordenadas')
    })

    it('should have valid place objects', async () => {
      const res = await request(app)
        .get('/api/lugares')
        .expect(200)

      res.body.forEach(lugar => {
        expect(lugar).toHaveProperty('id')
        expect(lugar).toHaveProperty('nombre')
        expect(lugar).toHaveProperty('coordenadas')
        expect(Array.isArray(lugar.coordenadas)).toBe(true)
        expect(lugar.coordenadas).toHaveLength(2)
      })
    })
  })

  describe('GET /api/lugares', () => {
  it('should return tourist places', async () => {
    const res = await request(app)
      .get('/api/lugares')
      .expect(200)

    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('GET /guia_turistica', () => {
  it('should render page', async () => {
    const res = await request(app)
      .get('/guia_turistica')
      .expect(200)

    expect(res.text).toContain('guia_turistica')
  })
})

describe('GET /consulta_reserva', () => {
  it('should render page', async () => {
    const res = await request(app)
      .get('/consulta_reserva')
      .expect(200)

    expect(res.text.length).toBeGreaterThan(0)
  })
})

  it('should create a reservation with valid data', async () => {
  const res = await request(app)
    .post('/api/reservas')
    .send({
      cedula: '123456789',
      nombre: 'Usuario Test',
      email: 'test@test.com',
      telefono: '3001234567',
      fechaVisita: '2026-06-15',
      lugaresSeleccionados: ['santuario'],
      guiaId: 'g1'
    })

  expect(res.status).toBe(200)
  expect(res.body.success).toBe(true)
})

    it('should reject reservation with missing fields', async () => {
      const res = await request(app)
        .post('/api/reservas')
        .send({
          usuario_id: 1,
          // Missing lugar_id, fecha, hora
        })
        .expect('Content-Type', /json/)
        .expect(400)

      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toContain('Faltan datos requeridos')
    })

    it('should validate all required fields', async () => {
      const requiredFields = ['cedula','nombre','lugaresSeleccionados','guiaId']

      for (const field of requiredFields) {
        const payload = {
          cedula: '123456789',
          nombre: 'Usuario Test',
          fechaVisita: '2026-06-15',
          lugaresSeleccionados: ['santuario'],
          guiaId: 'g1'
        }
        delete payload[field]

        const res = await request(app)
          .post('/api/reservas')
          .send(payload)
          .expect(400)

        expect(res.body.error).toContain('Faltan datos requeridos')
      }
    })
  })

afterAll(async () => {
  await pool.end()
})