- [Entidades relacionadas](/back/img/relacionEntidades.png)

### 2️⃣ ENTIDAD: REGIÓN

**Descripción:** Regiones culturales y gastronómicas de Colombia (Caribe, Andina, Pacífica, Orinoquía, Amazonia).

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(100) | UNIQUE, NOT NULL | Nombre región |
| `descripcion` | TEXT | NOT NULL | Descripción cultural y gastronómica |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen representativa |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- 1:N con CIUDAD (región contiene ciudades)
- 1:N con PLATO (región contiene platos)



---

### 3️⃣ ENTIDAD: CIUDAD

**Descripción:** Ciudades principales de cada región con restaurantes.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(100) | NOT NULL | Nombre de la ciudad |
| `regionId` | UUID | FK, NOT NULL | Referencia a REGIÓN |
| `descripcion` | TEXT | Nullable | Descripción turística |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con REGIÓN (muchas ciudades en una región)
- 1:N con RESTAURANTE (ciudad contiene restaurantes)



### 4️⃣ ENTIDAD: PLATO TÍPICO

**Descripción:** Platos tradicionales de cada región colombiana.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(150) | NOT NULL | Nombre del plato |
| `descripcion` | TEXT | NOT NULL | Descripción breve del plato |
| `historia` | TEXT | NOT NULL | Historia y origen cultural del plato |
| `ingredientes` | TEXT | NOT NULL | Lista de ingredientes principales |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen del plato |
| `regionId` | UUID | FK, NOT NULL | Referencia a REGIÓN |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con REGIÓN (muchos platos en una región)
- N:M con RESTAURANTE (vía PLATO_RESTAURANTE)

---

### 5️⃣ ENTIDAD: RESTAURANTE

**Descripción:** Establecimientos gastronómicos donde se sirven platos típicos.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(150) | NOT NULL | Nombre del restaurante |
| `descripcion` | TEXT | NOT NULL | Descripción del lugar |
| `direccion` | VARCHAR(255) | NOT NULL | Dirección física |
| `telefono` | VARCHAR(20) | NOT NULL | Teléfono de contacto |
| `ciudadId` | UUID | FK, NOT NULL | Referencia a CIUDAD |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen del restaurante |
| `horario` | VARCHAR(100) | NOT NULL | Horario de atención |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con CIUDAD (muchos restaurantes en una ciudad)
- N:M con PLATO (vía PLATO_RESTAURANTE)

---

### 6️⃣ ENTIDAD: PLATO_RESTAURANTE (Many-to-Many)

**Descripción:** Tabla de cruce que relaciona platos con restaurantes.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `platoId` | UUID | FK, NOT NULL | Referencia a PLATO |
| `restauranteId` | UUID | FK, NOT NULL | Referencia a RESTAURANTE |
| `precio` | DECIMAL(10,2) | NOT NULL | Precio del plato en restaurante |
| `disponible` | BOOLEAN | DEFAULT true | Disponibilidad actual |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Restricciones:**
- UNIQUE(`platoId`, `restauranteId`)
