import request from 'supertest'
import express from 'express'

const app = express()

app.use(express.json())

// Mock endpoints para API REST
app.get('/api/lugares', (req, res) => {
  const lugares = [
    { id: 1, nombre: 'Santuario', coordenadas: [0.8042, -77.5847] },
    { id: 2, nombre: 'Puente', coordenadas: [0.8048, -77.5842] },
    { id: 3, nombre: 'Mirador', coordenadas: [0.8055, -77.5838] }
  ]
  res.json(lugares)
})

app.get('/api/lugares/:id', (req, res) => {
  const lugar = {
    id: req.params.id,
    nombre: 'Santuario de Las Lajas',
    coordenadas: [0.8042, -77.5847],
    descripcion: 'Basílica construida'
  }
  res.json(lugar)
})

app.get('/api/guias', (req, res) => {
  const guias = [
    { id: 'g1', nombre: 'Carlos Mendoza', rating: 5 },
    { id: 'g2', nombre: 'María López', rating: 4 }
  ]
  res.json(guias)
})

app.post('/api/reserva', (req, res) => {
  const { usuario_id, lugar_id, fecha, hora } = req.body

  if (!usuario_id || !lugar_id || !fecha || !hora) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  res.status(201).json({
    id: 1,
    usuario_id,
    lugar_id,
    fecha,
    hora,
    estado: 'confirmada'
  })
})

describe('API Integration Tests', () => {
  describe('GET /api/lugares', () => {
    it('should return list of tourist places', async () => {
      const res = await request(app)
        .get('/api/lugares')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBe(3)
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

  describe('GET /api/lugares/:id', () => {
    it('should return specific place by id', async () => {
      const res = await request(app)
        .get('/api/lugares/1')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body.id).toBe('1')
      expect(res.body).toHaveProperty('nombre')
      expect(res.body).toHaveProperty('descripcion')
    })
  })

  describe('GET /api/guias', () => {
    it('should return list of tour guides', async () => {
      const res = await request(app)
        .get('/api/guias')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBe(2)
      expect(res.body[0]).toHaveProperty('nombre')
      expect(res.body[0]).toHaveProperty('rating')
    })
  })

  describe('POST /api/reserva', () => {
    it('should create a reservation with valid data', async () => {
      const res = await request(app)
        .post('/api/reserva')
        .send({
          usuario_id: 1,
          lugar_id: 1,
          fecha: '2026-06-15',
          hora: '10:00'
        })
        .expect('Content-Type', /json/)
        .expect(201)

      expect(res.body).toHaveProperty('id')
      expect(res.body.estado).toBe('confirmada')
      expect(res.body.usuario_id).toBe(1)
    })

    it('should reject reservation with missing fields', async () => {
      const res = await request(app)
        .post('/api/reserva')
        .send({
          usuario_id: 1,
          // Missing lugar_id, fecha, hora
        })
        .expect('Content-Type', /json/)
        .expect(400)

      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Faltan campos requeridos')
    })

    it('should validate all required fields', async () => {
      const requiredFields = ['usuario_id', 'lugar_id', 'fecha', 'hora']

      for (const field of requiredFields) {
        const payload = {
          usuario_id: 1,
          lugar_id: 1,
          fecha: '2026-06-15',
          hora: '10:00'
        }
        delete payload[field]

        const res = await request(app)
          .post('/api/reserva')
          .send(payload)
          .expect(400)

        expect(res.body.error).toBe('Faltan campos requeridos')
      }
    })
  })
})
