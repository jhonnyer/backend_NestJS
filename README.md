# Financial Service API - NestJS + MongoDB

Este proyecto es una API REST construida con **NestJS** que gestiona funcionalidades de autenticación y productos. Utiliza **MongoDB** como base de datos, la cual se ejecuta a través de un contenedor Docker.

## Características principales

- Registro e inicio de sesión de usuarios con JWT.
- CRUD de productos.
- Validaciones con DTOs.
- Documentación con Swagger.
- Interfaz para pruebas disponible en Postman.
- Proyecto dockerizado 100% => docker-compose up --build

## ¿Cómo levantar el servicio?

### 1. Clonar el repositorio

```bash
git https://github.com/jhonnyer/backend_NestJS.git 
```

## Instalar dependencias
npm install

## Levantar MongoDB con Docker

docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongo_data:/data/db \
  mongo:6

## Ejecutar el servidor NestJS
npm run start:dev

## Documentación de la API
Una vez ejecutado el servicio, se puede acceder a la documentación de Swagger en:

	* http://localhost:3000/api/swagger

Allí  se encuentran todos los endpoints, sus descripciones, parámetros y respuestas esperadas.

## Pruebas con Postman
Se puede probar fácilmente los endpoints importando la colección Postman:

	* Archivo: Backend_NestJs.postman_collection

Cómo importar:
	* Abre Postman
	* Clic en Importar
	* Selecciona el archivo Backend_NestJs.postman_collection
	* Comienza a probar los endpoints

## Estructura del proyecto
financial-service/
│
├── src/
│   ├── auth/              # Módulo de autenticación
│   │   ├── applications/
│   │   ├── domain/
│   │   ├── infraestructure/
│   │   ├── interfaces/
│   │
│   ├── products/          # Módulo de productos
│   │   ├── applications/
│   │   ├── domain/
│   │   ├── infraestructure/
│   │   ├── interfaces/
│   │
│   ├── shared/            # Código compartido
│   │   └── utils/         # Funciones utilitarias (helpers, mappers, etc.)
│   │
│   └── main.ts            # Punto de entrada de la app
│
├── .env                   # Variables de entorno
├── package.json
├── tsconfig.json
└── README.md



## Endpoints principales

Auth
	* POST /auth/register - Registrar nuevo usuario
	* POST /auth/login - Iniciar sesión

Productos
	
	* GET /productos - Obtener todos los productos
	* POST /productos - Crear un nuevo producto
	* GET /productos/:id - Obtener producto por ID
	* PATCH /productos/:id - Actualizar un producto
	* DELETE /productos/:id - Eliminar producto

## Tecnologías utilizadas

* NestJS
* MongoDB
* Mongoose
* Swagger
* Postman
* Docker Container

## Pruebas Unitarias
#Este proyecto cuenta con pruebas unitarias implementadas utilizando el framework de testing nativo de NestJS basado en Jest.

#Se ha priorizado la cobertura de funcionalidades críticas, tales como autenticación (auth) y operaciones CRUD de productos (products).

Se han cubierto principalmente:
	* Casos de uso (auth.service.ts, productos.service.ts)
	* Controladores (auth.controller.ts, productos.controller.ts)
	* Validaciones y lógica de negocio esencial

# Ejecutar pruebas unitarias
	* npm run test

#Ver reporte de cobertura
	* npm run test:cov

El reporte detallado de cobertura se genera en la carpeta coverage/.

Reporte de logs estructurados con WINSTON se almacenan en la carpeta logs/
	* combined.log 
	* error.log

## Generar estructura del proyecto
  * tree .\src /F /A > estructura.txt

##############################################################
##################		IMPORTANTE    ########################
##############################################################
####  EJECUTAR PROYECTO DOCKERIZADO EN DOCKER CONTAINER  #####
##############################################################
	* docker-compose up --build

#Lanzar nuevamente el proyecto Dockerizado después de construido los container del proyecto.
	* docker-compose up

# NOTA: Lanzar comando anterior en la raíz del proyecto: financial-service

## Autor
Desarrollado por Jhonnyer Fernando Galíndez Zemanate - jhonfergaze@hotmail.com - '3122636230'


