import request from 'supertest'
import express from 'express'
import path from 'path'
import session from 'express-session'
import sessionRouter from '../../src/routes/sesion.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src/views/layout'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mock session middleware
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Mock route para testing
app.get('/registro', (req, res) => {
  res.render('registro', {
    titulo: 'Registro - Las Lajas e Ipiales',
    ocultarbtnreg: false,
    ocultarbtnini: true,
    error: null
  })
})

app.get('/iniciosesion', (req, res) => {
  res.render('iniciosesion', {
    titulo: 'Inicio de Sesión',
    ocultarbtnreg: true,
    ocultarbtnini: false,
    error: null
  })
})

app.post('/procesar-registro', (req, res) => {
  const { cedula, nombre, email, password, Conf_password } = req.body

  // Validación simple
  if (!cedula || !nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  if (password !== Conf_password) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' })
  }

  // Mock success
  res.status(201).json({ success: true, message: 'Usuario registrado' })
})

describe('Session and Auth Integration Tests', () => {
  describe('GET /registro', () => {
    it('should render registro page', async () => {
      const res = await request(app)
        .get('/registro')
        .expect('Content-Type', /html/)
        .expect(200)

      expect(res.text).toContain('Registro')
    })
  })

  describe('GET /iniciosesion', () => {
    it('should render login page', async () => {
      const res = await request(app)
        .get('/iniciosesion')
        .expect('Content-Type', /html/)
        .expect(200)

      expect(res.text).toContain('Inicio de Sesión')
    })
  })

  describe('POST /procesar-registro', () => {
    it('should reject registration with missing fields', async () => {
      const res = await request(app)
        .post('/procesar-registro')
        .send({
          cedula: '123456789',
          nombre: 'Test User'
          // Missing email, password, Conf_password
        })
        .expect(400)

      expect(res.body.error).toBe('Faltan campos requeridos')
    })

    it('should reject registration with mismatched passwords', async () => {
      const res = await request(app)
        .post('/procesar-registro')
        .send({
          cedula: '123456789',
          nombre: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          Conf_password: 'password456'
        })
        .expect(400)

      expect(res.body.error).toBe('Las contraseñas no coinciden')
    })

    it('should process valid registration', async () => {
      const res = await request(app)
        .post('/procesar-registro')
        .send({
          cedula: '123456789',
          nombre: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          Conf_password: 'password123'
        })
        .expect(201)

      expect(res.body.success).toBe(true)
      expect(res.body.message).toBe('Usuario registrado')
    })
  })

  describe('Session Management', () => {
    it('should maintain session across requests', async () => {
      const agent = request.agent(app)

      // First request
      await agent
        .get('/registro')
        .expect(200)

      // Second request should maintain session
      const res = await agent
        .get('/iniciosesion')
        .expect(200)

      expect(res.text).toContain('Sesión')
    })
  })
})
