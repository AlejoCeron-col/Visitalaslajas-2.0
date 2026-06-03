import express from "express"
import bcrypt from "bcryptjs"
import pool from "../db/postgres.js"

const router = express.Router()

async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email])
  return result.rows[0]
}

async function findUserByCedula(cedula) {
  const result = await pool.query(`SELECT * FROM usuarios WHERE cedula = $1`, [cedula])
  return result.rows[0]
}

async function insertUser(usuario) {
  const result = await pool.query(
    `INSERT INTO usuarios (cedula, nombre, fechanacimiento, telefono, email, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      usuario.cedula,
      usuario.nombre,
      usuario.fechanacimiento,
      usuario.telefono,
      usuario.email,
      usuario.passwordHash
    ]
  )
  return result.rows[0]
}

// Ruta para mostrar formulario de registro
router.get("/registro", (req, res) => {
  res.render("registro", {
    titulo: "Registro - Las Lajas e Ipiales",
    ocultarbtnreg: false,
    ocultarbtnini: true,
    error: null
  })
})

// Ruta para procesar registro
router.post("/registrar-usuario", async (req, res) => {
  try {
    const { cedula, nombre, fechanacimiento, telefono, email, password, Conf_password } = req.body

    console.log("Datos recibidos:", { cedula, nombre, fechanacimiento, telefono, email, password: password ? "***" : null })

    // Validar formato de fecha
    const fechaValida = new Date(fechanacimiento)
    if (isNaN(fechaValida.getTime())) {
      console.log("Fecha inválida:", fechanacimiento)
      return res.status(400).send(`
    <script>
      alert("La fecha de nacimiento no es válida");
      window.history.back();
    </script>
  `)}

    // Validaciones
    if (!cedula || !nombre || !fechanacimiento || !telefono || !email || !password) {
      console.log("Faltan campos requeridos")
      return res.status(400).send(`
    <script>
      alert("Todos los campos son requeridos");
      window.history.back();
    </script>
  `)}

    if (password !== Conf_password) {
      console.log("Contraseñas no coinciden")
      return res.status(400).send(`
    <script>
      alert("Las contraseñas no coinciden");
      window.history.back();
    </script>
    `)}

    const usuarioExistente = await findUserByEmail(email)
    if (usuarioExistente) {
      console.log("Email ya registrado:", email)
      return res.status(400).send(`
    <script>
      alert("El email ya esta registrado");
      window.history.back();
    </script>
    `)}

    const cedulaExistente = await findUserByCedula(cedula)
    if (cedulaExistente) {
      console.log("Cédula ya registrada:", cedula)
      return res.status(400).send(`
    <script>
      alert("La cedula ya esta registrada");
      window.history.back();
    </script>
    `)}

    const passwordHash = await bcrypt.hash(password, 10)
    console.log("Insertando usuario...")

    const nuevoUsuario = await insertUser({
      cedula,
      nombre,
      fechanacimiento,
      telefono,
      email,
      passwordHash
    })

    console.log("Usuario insertado:", nuevoUsuario.id)

    req.session.user = {
      id: nuevoUsuario.id,
      cedula: nuevoUsuario.cedula,
      nombre: nuevoUsuario.nombre,
      fechanacimiento: nuevoUsuario.fechanacimiento,
      telefono: nuevoUsuario.telefono,
      email: nuevoUsuario.email
    }

    return res.redirect("/registro?registro=ok");
  } catch (error) {
    console.error("Error en registro:", error)
    console.error("Stack:", error.stack)
    res.status(500).send(`
    <script>
      alert("Error al registrar el usuario: ${error.message}");
      window.history.back();
    </script>
    `)}
})

// Ruta para mostrar formulario de login
router.get("/iniciosesion", (req, res) => {
  res.render("iniciosesion", {
    titulo: "Iniciar Sesión - Las Lajas e Ipiales",
    ocultarbtnreg: true,
    ocultarbtnini: false,
    error: null
  })
})

// Ruta para procesar login
router.post("/iniciar-sesion", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send(`
    <script>
      alert("Email y Contraseña son requeridos");
      window.history.back();
    </script>
    `)}

    const usuario = await findUserByEmail(email)

    if (!usuario) {
      return res.status(401).send(`
    <script>
      alert("Email o Contraseña incorrectos");
      window.history.back();
    </script>
    `)}

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password_hash)

    if (!passwordValida) {
      return res.status(401).send(`
    <script>
      alert("Email o Contraseña incorrectos");
      window.history.back();
    </script>
    `)}

    // Crear sesión
    req.session.user = {
      id: usuario.id,
      cedula: usuario.cedula,
      nombre: usuario.nombre,
      fechanacimiento: usuario.fechanacimiento,
      telefono: usuario.telefono,
      email: usuario.email
    }

    return res.redirect("/iniciosesion?inicio=ok");
  } catch (error) {
    console.error("Error en login:", error)
    res.status(500).send(`
    <script>
      alert("Error al iniciar sesion");
      window.history.back();
    </script>
    `)}
})

// Ruta para logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err)
    }
    res.redirect("/")
  })
})

// Middleware para proteger rutas
export function verificarAutenticacion(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/iniciar-sesion")
  }
  next()
}

// Ruta lugare_visitar
router.get("/lugares_visita", (req, res) => {
  res.render("lugares_visita", {
    
    titulo: "Lugares para visitar - Las Lajas e Ipiales",
    ocultarbtnreg: true,
    ocultarbtnini: true,
    img: "/img/catalogo-lugares.jpg",
    text_desc: "Descripcion corta del lugar turistico a visitar",
    tit_cont: "Nombre del lugar turistico",
    error: null    
  })
})

//Ruta restaurantes
router.get("/restaurantes", (req, res) => {
  res.render("restaurantes", {
    
    titulo: "Restaurantes - Las Lajas e Ipiales",
    ocultarbtnreg: true,
    ocultarbtnini: true,
    img: "/img/restaurantes.jpg",
    text_desc: "Ubicacion del restaurante <br> Telefono del restaurante <br> Contacto del restaurante",
    tit_cont: "Nombre del restaurante",
    error: null    
  })
})

//Ruta hoteles
router.get("/hoteles", (req, res) => {
  res.render("hoteles", {
    
    titulo: "Hoteles - Las Lajas e Ipiales",
    ocultarbtnreg: true,
    ocultarbtnini: true,
    img: "/img/hoteles.jpg",
    text_desc: "Ubicacion del hotel <br> Telefono del hotel <br> Contacto del hotel",
    tit_cont: "Nombre del hotel",
    error: null    
  })
})



export default router
