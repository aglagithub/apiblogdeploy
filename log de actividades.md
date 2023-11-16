Creado en Clases: S2-D3 -> ?
proyecto profesor: https://github.com/luismavlo/NODE-GEN-26
[2023-07-21]: Creación proyecto
[2023-07-21]: Creación db: blogdb. se creó por pgadmin.
por comando habria sido: **psql -U postgres**
CREATE DATABASE blogdb;
[2023-07-21]: inicializar un app de node: **npm init -y**
[2023-07-21]: Crear carpeta **src**
[2023-07-21]: instalar nodemon: **npm i nodemon --save-dev**
[2023-07-21]: instalar express
[2023-07-21]: Indicar archivo inicial en sección scripts de **package.json** :
**"start": "src/server.js",
"start:dev":"nodemon src/server.js"**
[2023-07-21]: Creación de carpetas para proyecto: middlewares, database,
models, routes, controllers  
[2023-07-21]: Correr con: **npm run start:dev**
[2023-07-21]: Instalar sequelize: **npm i sequelize**
[2023-07-21]: Instalar drivers para postgres: **npm i pg pg-hstore**
[2023-07-21]: Archivo de parametros de configuaración acceso a database. config.js
[2023-07-21]: db.authenticate() y db.sync() para acceso a db
[2023-07-21]: Configuracion prettier
[2023-07-24]: Instalacion, declaracion y configuración de archivo .env
[2023-07-24]: include para archivo .env
[2023-07-26]: Istalación de middleware cors **npm i cors**
[2023-07-24]: Creación modelo users
[2023-07-24]: Uso de Table plus y crecion de usuario manualmente
[2023-07-26]: Implementacuón de find All, find One, update, delete
[2023-07-26]: Istalación de middleware express-validator **npm i express-validator**
[2023-07-26]: Middleware para reducir código en implementaciones
[2023-07-27]: Captura de error por ruta inexistente
[2023-07-27]: middleware para manejo generalisado de errores
[2023-07-27]:Uso de next(..) para paso de mensajes entre etapas de loop de la aplicación
[2023-07-27]:correr app en modo producción "start:prod": "SET NODE_ENV=production&nodemon src/server.js"
[2023-07-28]: conceptos de autenticación
[2023-07-28]: instalacion de encripyacion de datos **npm i bcryptjs**
[2023-07-28]: instalacion de generador de tokens **npm i jsonwebtoken**
[2023-07-28]: Encriptador on line: https://smalldev.tools/base64-encoder-online
[2023-08-01]: rutas de signip y signup
[2023-08-01]: Generación de token
[2023-08-01]: Encriptación de contraseña
[2023-08-01]: Cambio de contraseña. Prevision para error de
[2023-08-01]: Prevision para error por dejar la misma contraseña.
[2023-08-01]: Posible mejora: verificar que no se usen contraseñas anteriores (ej las 6 útimas)
[2023-08-01]: Problema hasta ahora: cualquiera puede cambiar la contraseña de otro usuario!!. El usuario debe estar autenticado para poder hacerlo
[2023-08-01]: cambio contraseña: Nota: en el usuario 1 de prueba: password = pass12345

[2023-08-02]: Creación repo git hub:
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/aglagithub/blog.git
git push -u origin main
[2023-08-02]: Carga snippets del profesor
[2023-08-11]: Funcionalidad de posts para el blog: tabla en base de datos
[2023-08-11]: Creación y proteccion de rutas para los posts
[2023-08-11]: Creación de posts. findOnePost, updatePost,deletePost
[2023-08-11]: Middleware para encontrar si un post id es válido
[2023-08-12]: Creación de comments para posts
[2023-08-12]: Modelo para el comment
[2023-08-12]: Rutas para el comment
[2023-08-12]: Controller para el comment
[S4.D2-S4.D3]: Relaciones
[S4-D4] : Seguridad  
[S4-D4] : Express-rate-limit
[S4-D4] : Explicación de manejo de IPs y limitación de peticiones
[S4-D4] : Express-rate-limit en proyecto blog
[S4-D4] : Helmet
[S4-D4] : hpp
[S4-D4] : perfect-express-sanitizer
[S4-D4] : Notas:
• Los bancos No trabajas con JWT lo hacen generalmente con sessiones.
• Lee OWAP documents
• En el Header de las peticiones quedan consignadas todas las instalaciones. Aquí se pueden ver las aplicaciones de seguridad que se hna instalado
[S4-D5] : Tabla en DB para almacenar errores
[S4-D5] : Codigo para almacenar errores
[S4-D5] : Tests de logs de errores
[S4-D5] : Auditoria de errores
[S4-D5] : cronjobs
[S5-D1] : Multer para traer imagenes
[S5-D2] : Posts para la aplicación
[S5-D2] : Subida de imágemes a posts
[S5-D2] : Inclusion de url de fotos y comments en post
[S5-D2] : Obtención de las url de las imágenes Del perfil, de un post y
sus comentarios
[S5-D2] : Obtención de las url de las imágenes Del perfil, de todos los post y
sus comentarios
[S5-D3] : Winsocket Parte 1
[S5-D4] : Winsocket Parte 2. Ver proyecto "blog-react-main": Blog Client



