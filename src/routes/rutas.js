import { oc } from "date-fns/locale/oc"
import express from "express"
import { Router } from "express"
import pool from "../db/postgres.js"

const router = Router()

const lugaresTuristicos = [
  {
    id: "santuario",
    nombre: "Santuario de Las Lajas",
    descripcion: "Basílica construida sobre un cañón, una de las iglesias más hermosas del mundo",
    coordenadas: [0.8042, -77.5847],
    color: "#059669",
    icono: "/img/catalogo-lugares.jpg",
  },
  {
    id: "puente-santuario",
    nombre: "Puente del Santuario",
    descripcion: "Impresionante puente que conecta con el Santuario sobre el río Guáitara",
    coordenadas: [0.8048, -77.5842],
    color: "#0891b2",
    icono: "/img/catalogo-lugares.jpg",
  },
  {
    id: "mirador-lajas",
    nombre: "Mirador de Las Lajas",
    descripcion: "Punto panorámico con vistas espectaculares del cañón y el santuario",
    coordenadas: [0.8055, -77.5838],
    color: "#7c3aed",
    icono: "/img/catalogo-lugares.jpg",
  },
  {
    id: "centro-ipiales",
    nombre: "Centro Histórico de Ipiales",
    descripcion: "Zona histórica con arquitectura colonial y calles tradicionales",
    coordenadas: [0.8281, -77.6394],
    color: "#dc2626",
    icono: "/img/catalogo-lugares.jpg",
  },
  {
    id: "catedral-ipiales",
    nombre: "Catedral de Ipiales",
    descripcion: "Catedral principal de la ciudad con arquitectura neoclásica",
    coordenadas: [0.8278, -77.6389],
    color: "#ca8a04",
    icono: "/img/catalogo-lugares.jpg",
  },
  {
    id: "parque-santander",
    nombre: "Parque Santander",
    descripcion: "Plaza principal de Ipiales, centro de actividad social y cultural",
    coordenadas: [0.8283, -77.6391],
    color: "#16a34a",
    icono: "/img/catalogo-lugares.jpg",
  },
  {
    id: "plaza-mercado",
    nombre: "Plaza de Mercado",
    descripcion: "Mercado tradicional con productos locales y artesanías de la región",
    coordenadas: [0.8295, -77.6378],
    color: "#ea580c",
    icono: "/img/catalogo-lugares.jpg",
  },
  {
    id: "rumichaca",
    nombre: "Puente Internacional de Rumichaca",
    descripcion: "Puente fronterizo entre Colombia y Ecuador sobre el río Carchi",
    coordenadas: [0.8134, -77.6652],
    color: "#2563eb",
    icono: "/img/catalogo-lugares.jpg",
  },
]


const guiasTuristicos = [
  { id: 'g1', nombre: 'Carlos Mendoza', foto: 'https://i.pravatar.cc/150?img=11', rating: 5 },
  { id: 'g2', nombre: 'María López', foto: 'https://i.pravatar.cc/150?img=12', rating: 4 },
  { id: 'g3', nombre: 'Jorge Ramírez', foto: 'https://i.pravatar.cc/150?img=13', rating: 5 },
  { id: 'g4', nombre: 'Ana Torres', foto: 'https://i.pravatar.cc/150?img=14', rating: 4 },
  { id: 'g5', nombre: 'Luis Fernández', foto: 'https://i.pravatar.cc/150?img=15', rating: 3 },
  { id: 'g6', nombre: 'Sofía Rojas', foto: 'https://i.pravatar.cc/150?img=16', rating: 5 },
  { id: 'g7', nombre: 'Andrés Calderón', foto: 'https://i.pravatar.cc/150?img=17', rating: 4 },
  { id: 'g8', nombre: 'Paula Guerrero', foto: 'https://i.pravatar.cc/150?img=18', rating: 5 },
  { id: 'g9', nombre: 'Diego Castro', foto: 'https://i.pravatar.cc/150?img=19', rating: 3 },
  { id: 'g10', nombre: 'Laura Peña', foto: 'https://i.pravatar.cc/150?img=20', rating: 4 },
]

router.get("/guia_turistica", (req, res) => {
  res.render("guia_turistica", {
    titulo: "Mapa Turístico - Las Lajas e Ipiales",
    lugares: lugaresTuristicos,
    guias: guiasTuristicos,
    ocultarbtnreg: true,
    ocultarbtnini: true,
    usuario: req.session.user
  })
})

router.get("/consulta_reserva", (req, res) => {
  res.render("consulta_reserva", {
    titulo: "Consultar Reserva - Las Lajas e Ipiales",
    lugares: lugaresTuristicos,
    ocultarbtnreg: true,
    ocultarbtnini: true,
    reserva: null,
    error: null,
    usuario: req.session.user
  })
})



router.post("/api/reservas", async (req, res) => {
  try {
    const { cedula, nombre, email, telefono, fechaVisita, lugaresSeleccionados, guiaId } = req.body

    if (!cedula || !nombre || !lugaresSeleccionados || lugaresSeleccionados.length === 0 || !guiaId) {
      return res.status(400).json({ error: "Faltan datos requeridos. Asegúrese de seleccionar un guía y al menos un lugar." })
    }

    const fecha = fechaVisita || new Date().toISOString().split("T")[0]
    const result = await pool.query(
      `INSERT INTO reservas (cedula, nombre, email, telefono, fecha_visita, lugares_seleccionados, guia_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [cedula, nombre, email || "", telefono || "", fecha, JSON.stringify(lugaresSeleccionados), guiaId || null]
    )

    const nuevaReserva = result.rows[0]
    res.json({ success: true, reserva: nuevaReserva })
  } catch (error) {
    console.error("Error en POST /api/reservas:", error)
    res.status(500).json({ error: "Error al guardar la reserva" })
  }
})

router.get("/api/reservas/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params
    const result = await pool.query(
      `SELECT * FROM reservas WHERE cedula = $1 ORDER BY fecha_creacion ASC`,
      [cedula]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No se encontraron reservas con esa cédula" })
    }

    const ultimaReserva = result.rows[result.rows.length - 1]
    const lugaresCompletos = ultimaReserva.lugares_seleccionados
      .map((id) => lugaresTuristicos.find((l) => l.id === id))
      .filter(Boolean)

    const guiaInfo = ultimaReserva.guia_id ? guiasTuristicos.find((g) => g.id === ultimaReserva.guia_id) : null

    res.json({
      ...ultimaReserva,
      lugaresInfo: lugaresCompletos,
      guiaInfo
    })
  } catch (error) {
    console.error("Error en GET /api/reservas/:cedula:", error)
    res.status(500).json({ error: "Error al consultar la reserva" })
  }
})

// API para obtener lugares
router.get("/api/lugares", (req, res) => {
  res.json(lugaresTuristicos)
})

// Eliminar reserva por id
router.delete('/api/reservas/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`DELETE FROM reservas WHERE id = $1`, [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }
    res.json({ success: true })
  } catch (error) {
    console.error("Error en DELETE /api/reservas/:id:", error)
    res.status(500).json({ error: 'Error al eliminar la reserva' })
  }
})



export default router