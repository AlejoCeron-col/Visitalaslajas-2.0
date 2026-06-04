/**
 * Configuración de Swagger/OpenAPI para la documentación de API
 */

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Visita Las Lajas',
    description: 'Documentación de la API para el sistema de turismo en Las Lajas e Ipiales',
    version: '1.0.0',
    contact: {
      name: 'Equipo de Desarrollo',
      url: 'https://github.com/AlejoCeron-col/Visitalaslajas'
    },
    license: {
      name: 'ISC'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    },
    {
      url: 'https://api.visitalaslajas.com',
      description: 'Production server'
    }
  ],
  paths: {
    '/guia_turistica': {
      get: {
        tags: ['Guías Turísticas'],
        summary: 'Obtener página de guía turística',
        description: 'Retorna la página con el mapa interactivo de lugares turísticos y guías disponibles',
        responses: {
          200: {
            description: 'Página de guía turística renderizada exitosamente'
          }
        }
      }
    },
    '/consulta_reserva': {
      get: {
        tags: ['Reservas'],
        summary: 'Obtener página de consulta de reservas',
        description: 'Retorna la página para consultar reservas existentes',
        responses: {
          200: {
            description: 'Página de consulta de reservas'
          }
        }
      }
    },
    '/api/lugares': {
      get: {
        tags: ['Lugares'],
        summary: 'Listar todos los lugares turísticos',
        description: 'Retorna una lista de todos los lugares turísticos disponibles',
        responses: {
          200: {
            description: 'Lista de lugares turísticos',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Lugar'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/lugares/{id}': {
      get: {
        tags: ['Lugares'],
        summary: 'Obtener un lugar turístico específico',
        description: 'Retorna los detalles de un lugar turístico por su ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del lugar',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          200: {
            description: 'Detalles del lugar',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Lugar'
                }
              }
            }
          },
          404: {
            description: 'Lugar no encontrado'
          }
        }
      }
    },
    '/api/guias': {
      get: {
        tags: ['Guías'],
        summary: 'Listar todos los guías turísticos',
        description: 'Retorna una lista de todos los guías disponibles con sus ratings',
        responses: {
          200: {
            description: 'Lista de guías',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Guia'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/reserva': {
      post: {
        tags: ['Reservas'],
        summary: 'Crear una nueva reserva',
        description: 'Crea una nueva reserva de visita turística',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ReservaInput'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Reserva creada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Reserva'
                }
              }
            }
          },
          400: {
            description: 'Datos inválidos'
          }
        }
      }
    },
    '/registro': {
      get: {
        tags: ['Autenticación'],
        summary: 'Mostrar formulario de registro',
        description: 'Retorna la página de registro de nuevos usuarios',
        responses: {
          200: {
            description: 'Página de registro'
          }
        }
      },
      post: {
        tags: ['Autenticación'],
        summary: 'Registrar nuevo usuario',
        description: 'Registra un nuevo usuario en el sistema',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegistroInput'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuario registrado exitosamente'
          },
          400: {
            description: 'Datos inválidos o usuario ya existe'
          }
        }
      }
    },
    '/iniciosesion': {
      get: {
        tags: ['Autenticación'],
        summary: 'Mostrar formulario de login',
        description: 'Retorna la página de inicio de sesión',
        responses: {
          200: {
            description: 'Página de login'
          }
        }
      },
      post: {
        tags: ['Autenticación'],
        summary: 'Iniciar sesión',
        description: 'Autentica un usuario en el sistema',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginInput'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Sesión iniciada'
          },
          401: {
            description: 'Credenciales inválidas'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Lugar: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'santuario'
          },
          nombre: {
            type: 'string',
            example: 'Santuario de Las Lajas'
          },
          descripcion: {
            type: 'string',
            example: 'Basílica construida sobre un cañón'
          },
          coordenadas: {
            type: 'array',
            items: {
              type: 'number'
            },
            example: [0.8042, -77.5847]
          },
          color: {
            type: 'string',
            example: '#059669'
          }
        }
      },
      Guia: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'g1'
          },
          nombre: {
            type: 'string',
            example: 'Carlos Mendoza'
          },
          foto: {
            type: 'string',
            example: 'https://i.pravatar.cc/150?img=11'
          },
          rating: {
            type: 'integer',
            example: 5
          }
        }
      },
      ReservaInput: {
        type: 'object',
        required: ['usuario_id', 'lugar_id', 'fecha', 'hora'],
        properties: {
          usuario_id: {
            type: 'integer',
            example: 1
          },
          lugar_id: {
            type: 'integer',
            example: 1
          },
          fecha: {
            type: 'string',
            format: 'date',
            example: '2026-06-15'
          },
          hora: {
            type: 'string',
            format: 'time',
            example: '10:00'
          }
        }
      },
      Reserva: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          usuario_id: {
            type: 'integer',
            example: 1
          },
          lugar_id: {
            type: 'integer',
            example: 1
          },
          fecha: {
            type: 'string',
            format: 'date',
            example: '2026-06-15'
          },
          hora: {
            type: 'string',
            format: 'time',
            example: '10:00'
          },
          estado: {
            type: 'string',
            example: 'confirmada'
          }
        }
      },
      RegistroInput: {
        type: 'object',
        required: ['cedula', 'nombre', 'email', 'password'],
        properties: {
          cedula: {
            type: 'string',
            example: '1234567890'
          },
          nombre: {
            type: 'string',
            example: 'Juan Pérez'
          },
          fechanacimiento: {
            type: 'string',
            format: 'date',
            example: '1990-01-15'
          },
          telefono: {
            type: 'string',
            example: '3001234567'
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'juan@example.com'
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'SecurePassword123'
          }
        }
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'juan@example.com'
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'SecurePassword123'
          }
        }
      }
    }
  }
}

export default swaggerDefinition
