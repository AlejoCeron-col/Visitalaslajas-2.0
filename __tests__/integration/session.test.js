import request from 'supertest'
import express from 'express'
import path from 'path'
import session from 'express-session'
import sessionRouter, { verificarAutenticacion } from '../../src/routes/sesion.js'

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

app.use('/', sessionRouter)



describe('Session and Auth Integration Tests', () => {

  describe('Static pages', () => {
  it('should render lugares_visita page', async () => {
    const res = await request(app)
      .get('/lugares_visita')

    expect(res.status).toBe(200)
  })
})

it('should render restaurantes page', async () => {
  const res = await request(app)
    .get('/restaurantes')

  expect(res.status).toBe(200)
})

it('should render hoteles page', async () => {
  const res = await request(app)
    .get('/hoteles')

  expect(res.status).toBe(200)
})

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

      expect(res.text).toContain('Iniciar Sesión - Las Lajas e Ipiales')
    })
  })

  describe('POST /registrar-usuario', () => {
    it('should reject registration with missing fields', async () => {
      const res = await request(app)
        .post('/registrar-usuario')
        .send({
          cedula: `${Date.now()}`,
          nombre: 'Test User',
          fechanacimiento: '2000-01-01'
          // Missing email, password, Conf_password
        })
        .expect(400)

      expect(res.text).toContain('Todos los campos son requeridos')
    })

    it('should reject registration with mismatched passwords', async () => {
      const res = await request(app)
        .post('/registrar-usuario')
        .send({
          cedula: `${Date.now()}`,
          nombre: 'Test User',
          fechanacimiento: '2000-01-01',
          telefono: '3001234567',
          email: `test${Date.now()}@test.com`,
          password: 'password123',
          Conf_password: 'password456'
        })
        .expect(400)

      expect(res.text).toContain('Las contraseñas no coinciden')
    })

    it('should reject invalid birth date', async () => {
  const res = await request(app)
    .post('/registrar-usuario')
    .send({
      cedula: '123',
      nombre: 'Test',
      fechanacimiento: 'fecha-invalida',
      telefono: '3001234567',
      email: 'test@test.com',
      password: '123456',
      Conf_password: '123456'
    })

  expect(res.status).toBe(400)
})

it('should reject duplicated email', async () => {
  await request(app)
    .post('/registrar-usuario')
    .send({
      cedula: Date.now().toString(),
      nombre: 'Test',
      fechanacimiento: '2000-01-01',
      telefono: '3001234567',
      email: 'duplicado@test.com',
      password: '123456',
      Conf_password: '123456'
    })

  const res = await request(app)
    .post('/registrar-usuario')
    .send({
      cedula: (Date.now() + 1).toString(),
      nombre: 'Test',
      fechanacimiento: '2000-01-01',
      telefono: '3001234567',
      email: 'duplicado@test.com',
      password: '123456',
      Conf_password: '123456'
    })

  expect(res.status).toBe(400)
})

it('should reject duplicated cedula', async () => {
  const cedula = Date.now().toString()

  await request(app)
    .post('/registrar-usuario')
    .send({
      cedula,
      nombre: 'Test',
      fechanacimiento: '2000-01-01',
      telefono: '3001234567',
      email: `a${cedula}@test.com`,
      password: '123456',
      Conf_password: '123456'
    })

  const res = await request(app)
    .post('/registrar-usuario')
    .send({
      cedula,
      nombre: 'Test',
      fechanacimiento: '2000-01-01',
      telefono: '3001234567',
      email: `b${cedula}@test.com`,
      password: '123456',
      Conf_password: '123456'
    })

  expect(res.status).toBe(400)
})

    it('should process valid registration', async () => {
    const res = await request(app)
      .post('/registrar-usuario')
      .send({
        cedula: `${Date.now()}`,
        nombre: 'Test User',
        fechanacimiento: '2000-01-01',
        telefono: '3001234567',
        email: `test${Date.now()}@test.com`,
        password: 'password123',
        Conf_password: 'password123'
      })

      expect(res.status).toBe(302)
      expect(res.headers.location).toBe('/registro?registro=ok')
    })
  })

  describe('Session Management', () => {
  it('should redirect after successful registration', async () => {
    const res = await request(app)
      .post('/registrar-usuario')
      .send({
        cedula: `${Date.now()}`,
        nombre: 'Usuario Test',
        fechanacimiento: '2000-01-01',
        telefono: '3001234567',
        email: `test${Date.now()}@test.com`,
        password: 'password123',
        Conf_password: 'password123'
      })

    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/registro?registro=ok')
  })

  it('should login successfully', async () => {
  const email = `login${Date.now()}@test.com`

  await request(app)
    .post('/registrar-usuario')
    .send({
      cedula: Date.now().toString(),
      nombre: 'Login Test',
      fechanacimiento: '2000-01-01',
      telefono: '3001234567',
      email,
      password: '123456',
      Conf_password: '123456'
    })

  const res = await request(app)
    .post('/iniciar-sesion')
    .send({
      email,
      password: '123456'
    })

  expect(res.status).toBe(302)
})

it('should reject login without credentials', async () => {
  const res = await request(app)
    .post('/iniciar-sesion')
    .send({})

  expect(res.status).toBe(400)
})

it('should reject nonexistent user', async () => {
  const res = await request(app)
    .post('/iniciar-sesion')
    .send({
      email: 'noexiste@test.com',
      password: '123456'
    })

  expect(res.status).toBe(401)
})

it('should reject invalid password', async () => {
  const email = `wrong${Date.now()}@test.com`

  await request(app)
    .post('/registrar-usuario')
    .send({
      cedula: Date.now().toString(),
      nombre: 'Test',
      fechanacimiento: '2000-01-01',
      telefono: '3001234567',
      email,
      password: '123456',
      Conf_password: '123456'
    })

  const res = await request(app)
    .post('/iniciar-sesion')
    .send({
      email,
      password: 'incorrecta'
    })

  expect(res.status).toBe(401)
})

it('should logout user', async () => {
  const res = await request(app)
    .get('/logout')

  expect(res.status).toBe(302)
})

})
})

describe('Authentication Middleware', () => {
  it('should redirect if user is not authenticated', () => {
    const req = { session: {} }
    const res = { redirect: jest.fn() }
    const next = jest.fn()

    verificarAutenticacion(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith('/iniciar-sesion')
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next when user is authenticated', () => {
    const req = {
      session: {
        user: { id: 1 }
      }
    }

    const res = { redirect: jest.fn() }
    const next = jest.fn()

    verificarAutenticacion(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.redirect).not.toHaveBeenCalled()
  })
})