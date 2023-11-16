![Esto es una imagen de express](https://dkrn4sk0rn31v.cloudfront.net/uploads/2020/12/o-que-e-o-express-js.png)

# Blog Api

## Descripción del proyecto

Este proyecto es una api de un blog, que permitira a los usuarios, registrarse, iniciar sesión
subir post, comentar post, ver post, se podra subir imagenes, ir al perfil de un usuario. La
aplicación esta construida utilizando node.js, express y utiliza como base de datos PostgreSQL para
almacenar la información.

## Caracteristicas principales

1. Crear Post
2. Subir imagenes
3. Registrar usuarios
4. Loguearse con un usuario
5. Utiliza websockets para cuando se cree un post, se emita ese post creado a todos los clientes.
6. Comentar Post
7. Eliminar post
8. Actualizar Post

## Tecnologías utilizadas

1. express: Un framework minimalista de Node.js que facilita la creación de aplicaciones web y APIs.
2. express-rate-limit: Middleware de Express que limita la cantidad de solicitudes que un cliente puede hacer en un período de tiempo especificado.
3. firebase: Una plataforma de desarrollo de aplicaciones móviles y web que proporciona herramientas para crear, mejorar y hacer crecer aplicaciones.
4. postgreSQL: Un sistema de gestión de bases de datos relacionales de código abierto.
5. Sequelize: Un ORM (Object-Relational Mapping) para bases de datos SQL que simplifica la interacción con la base de datos y proporciona una capa de abstracción sobre SQL.
6. jsonwebtokens: JWT (JSON Web Token) es un estándar qué está dentro del documento RFC 7519.
7. socket.io: Libreria que nos ayuda en la comunicacion en tiempo real

## Requisitos previos para utilizar el proyecto

1. Tener node instalado en el equipo
2. Tener postgreSQL instalado
3. Tener creada una base de datos en postgreSQL
4. Tener una instancia de firebase creada con almacenamiento en firestore

## Como ejecutar el proyecto

1. Clonar el repositorio
2. Ejecutar npm install:

```
  npm install
```

3. Crearse la base de datos local con postgreSQL
4. Crearse una app de firebase e inicializar firestore en ella
5. clonar el .env.template y renombrarlo a .env
6. llenar las variables de entorno
7. levantar el modo de desarrollo utilizando el comando:

```
  npm run start:dev
```
