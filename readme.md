# Proyecto Musiker.

#### Sebastián González
###### Comunidad IT - 2019 - Proyecto de cierre.

## Acerca de

Proyecto **Musiker.** nace con la necesidad de compleción del curso de Javascript-Node.js en ComIT, para lo que debimos elegir una idea personal y desarrollarla. Así surgió este concepto de red social/foro que nucleara a músicos en el aspecto de la búsqueda y el encuentro mediante.

#### Especificidades
En base a esa premisa Musiker. permite registro de usuario, login, ver un feed común de búsquedas, realizar un posteo sobre búsqueda de músico y realizar una búsqueda por término arrojando resultados pertinentes.



## Cómo correr la app

** Es necesario tener instalado:
* El entorno de ejecución Node.js. Descargable desde https://nodejs.org/es/ 
* Base de datos mongoDB. Descargable desde https://www.mongodb.com/download-center/community

#### Pasos
1. Posicionarse en la carpeta dónde está el archivo server.js
2. Abrir CMD, ejecutar el siguiente comando para descargar las librerías asociadas a la app
>`npm update` 
3. Una vez existosamente descargadas las librerías, podemos montar el servidor en línea. Para ello ejecutar el siguiente comando
>`npm start`
4. Una vez que se obtiene el mensaje "servidor en línea" ya se encuentra montado y podemos proceder a usar nuestra app. Registrar un usuario, logearse, Ver el feed, etc.

## Especificidades técnicas

* Para la parte del server se ha utilizado la librería Express, inclutyendo ExpressSession para manejo de sesión, y expressHbs para manejo de habldebars; 
* Tanto el login como el registro funcionan con requests AJAX (POST) y entrega de HTMLs correspondientes. Para el front-end se usó CSS y BOOTSTRAP. Los datos son enviados a, asentados y/o validados en una base de datos de MongoDB 
* El Home funciona con requests GET desde el navegador y render de Handlebars. Front-end con Matarialize y CSS. También conecta a dicha Base de datos.
* La función de Búsqueda funciona con query-strings y requests GET a la base de datos. También render con Handlebars.

## Mejoras a implementar

* Optimizar front-end de todas las secciones
* Carga de imágenes a perfil de usuario
* Carga de imágenes de Posts
* Mensajería privada entre usuarios (inbox)
* Sección de usuario: solapa a la derecha del Feed
* Diversificar posteos en búsquedas y ofrecimientos




