## 📊 ESPECIFICACIÓN DE ENTIDADES



### 1️⃣ ENTIDAD: USUARIO

**Descripción:** Gestiona usuarios del sistema con roles diferenciados (usuario, administrador).

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(255) | NOT NULL | Nombre completo del usuario |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email único para login |
| `contraseña` | VARCHAR(255) | NOT NULL | Contraseña hasheada con bcrypt |
| `rol` | ENUM | DEFAULT 'usuario' | 'usuario' \| 'administrador' |
| `activo` | BOOLEAN | DEFAULT true | Estado de la cuenta |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de última actualización |

**Relaciones:**
- 1:N con REGIÓN (crear/editar)
- 1:N con CIUDAD (crear/editar)
- 1:N con PLATO (crear/editar)
- 1:N con RESTAURANTE (crear/editar)

---

## Entidades

### 1. USUARIO
- id (UUID, PK)
- nombre (VARCHAR 255)
- email (VARCHAR 255, UNIQUE)
- contraseña (VARCHAR 255, hasheada)
- rol (ENUM: 'usuario', 'administrador')
- activo (BOOLEAN, default: true)
- createdAt, updatedAt

### 2. REGIÓN
- id (UUID, PK)
- nombre (VARCHAR 100, UNIQUE)
- descripcion (TEXT)
- imagenUrl (VARCHAR 500)
- createdAt, updatedAt

**Relaciones:**
- 1:N con CIUDAD
- 1:N con PLATO

### 3. CIUDAD
- id (UUID, PK)
- nombre (VARCHAR 100)
- regionId (UUID, FK)
- descripcion (TEXT)
- createdAt, updatedAt

**Relaciones:**
- N:1 con REGIÓN
- 1:N con RESTAURANTE

### 4. PLATO TÍPICO
- id (UUID, PK)
- nombre (VARCHAR 150)
- descripcion (TEXT)
- historia (TEXT)
- ingredientes (TEXT)
- imagenUrl (VARCHAR 500)
- regionId (UUID, FK)
- createdAt, updatedAt

**Relaciones:**
- N:1 con REGIÓN
- N:M con RESTAURANTE (vía PLATO_RESTAURANTE)

### 5. RESTAURANTE
- id (UUID, PK)
- nombre (VARCHAR 150)
- descripcion (TEXT)
- direccion (VARCHAR 255)
- telefono (VARCHAR 20)
- ciudadId (UUID, FK)
- imagenUrl (VARCHAR 500)
- horario (VARCHAR 100)
- createdAt, updatedAt

**Relaciones:**
- N:1 con CIUDAD
- N:M con PLATO (vía PLATO_RESTAURANTE)

### 6. PLATO_RESTAURANTE
- id (UUID, PK)
- platoId (UUID, FK)
- restauranteId (UUID, FK)
- precio (DECIMAL 10,2)
- disponible (BOOLEAN, default: true)
- createdAt, updatedAt

**Restricciones:**
- UNIQUE(platoId, restauranteId)


