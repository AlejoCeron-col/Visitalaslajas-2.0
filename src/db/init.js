

import pool from "./postgres.js"

export async function initDb() {
  // Recrear tablas para asegurar que estén correctas
  await pool.query(`DROP TABLE IF EXISTS usuarios`)
  await pool.query(`DROP TABLE IF EXISTS reservas`)

  await pool.query(`
    CREATE TABLE usuarios (
      id BIGSERIAL PRIMARY KEY,
      cedula TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      fechanacimiento DATE NOT NULL,
      telefono TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      fecha_registro TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE reservas (
      id BIGSERIAL PRIMARY KEY,
      cedula TEXT NOT NULL,
      nombre TEXT NOT NULL,
      email TEXT,
      telefono TEXT,
      fecha_visita DATE NOT NULL,
      lugares_seleccionados JSONB NOT NULL,
      guia_id TEXT,
      fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)
}
