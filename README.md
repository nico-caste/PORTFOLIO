# Personal Full-Stack con Panel de Admin
Este repositorio contiene el código fuente de un portfolio web personal, diseñado para ser moderno, rápido, dinámico y fácil de mantener a través de un panel de administración personalizado.



## Características Principales

- **Contenido 100% dinamico:** Toda la información (perfil, proyectos, formación, etc.) se obtiene en tiempo real desde una base de datos MongoDB.

- **Arquitectura Full-Stack con Next.js:** Utiliza Next.js tanto para el frontend (con renderizado del lado del servidor para un rendimiento óptimo) como para el backend (a través de API Routes).

- **Panel de Administración (CMS):** Incluye una sección `/admin` privada para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre todo el contenido del sitio sin necesidad de tocar el código.

- **Autenticación Segura:** El panel de administración está protegido por un sistema de autenticación basado en JWT (JSON Web Tokens) y cookies httpOnly.

- **Gestión de Imágenes en la Nube:** Las imágenes (como los certificados) se suben a Cloudinary, optimizando su almacenamiento y entrega a través de una CDN global.

- **Diseño Moderno y Responsivo:** La interfaz está construida con Tailwind CSS, siguiendo una línea de diseño moderna y adaptándose perfectamente a cualquier dispositivo (móvil, tablet, escritorio).

## Stack Tecnológico

**Framework Principal:** Next.js (con React 18)

**Lenguaje:** TypeScript

**Base de Datos:** MongoDB Atlas

**ORM / Conector DB:** Mongoose

**Estilos:** Tailwind CSS

**Backend (API):** Next.js API Routes

**Autenticación:** JWT (con la librería jose), Cookies

**Gestión de Imágenes:** Cloudinary (almacenamiento) y Multer (procesamiento de subida)

**Íconos:** React Icons


## Estructura del Proyecto

El código está organizado de manera modular para facilitar su mantenimiento y escalabilidad:

`/src/components`: Contiene todos los componentes reutilizables de React, divididos en:

`/layout`: Componentes estructurales como Header, Footer y Layout.

`/admin`: Formularios y componentes específicos para el panel de administración.

`/src/lib`: Helpers y funciones auxiliares, como el conector a la base de datos (mongodb.ts) y la lógica de sincronización de aptitudes.

`/src/models`: Define los esquemas de datos de Mongoose y los tipos de TypeScript para cada colección de la base de datos (Profile, Projects, Formation).

`/src/pages`: Contiene todas las rutas de la aplicación.

`/index.tsx`, `/proyectos.tsx`, etc.: Páginas públicas del portfolio.

`/admin`: Todas las páginas relacionadas con el panel de administración.

`/api`: Todos los endpoints del backend que manejan la lógica de negocio (CRUD, login, subida de imágenes).

`/middleware.ts`: Middleware de Next.js que protege las rutas del panel de administración, verificando el token de autenticación en cada petición.