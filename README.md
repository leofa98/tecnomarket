# Proyecto de fin de ciclo DAW

Enlace al proyecto: https://tecnomarket2.vercel.app/

## Descripción

Este proyecto consiste en una tienda de electrónica desarrollada utilizando una API REST con Symfony, un frontend en Vue y una base de datos relacional mariadb. La aplicación permite la gestión de productos permitiendo a los usuarios navegar, buscar y comprar productos de manera sencilla y rápida.

Además de las funciones básicas de compra, la aplicación ofrece funcionalidades de administración que permiten:

- Añadir, modificar y eliminar productos.
- Gestionar usuarios, permitiendo activar y desactivar cuentas y habilitar y deshabilitar usuarios como administradores.
- Gestionar pedidos, incluyendo la actualización de su estado.

## Uso

**Registro e inicio de sesión:**

- Accede al modal de registro para crear una cuenta.
- Inicia sesión con tu nueva cuenta.

![Inicio Sesión](/doc/img/captura-inicio-sesion.jpeg)
![Registro](/doc/img/captura-registro.jpeg)

**Exploración de productos:**

- Navega por las diferentes categorías de productos (o desde la barra de navegación o desde la barra lateral en caso de los dispositivos móviles).
- Utiliza la barra de búsqueda para encontrar productos concretos.

![Búsqueda](/doc/img/captura-busqueda.jpeg)
![Categoría](/doc/img/captura-categoria.jpeg)

**Detalles del producto:**

- Haz clic en cualquier producto para ver un producto en detalle.

![Detalle producto](/doc/img/captura-producto-detalle.jpeg)

**Añadir al carrito:**

- Selecciona la cantidad deseada y añade el producto a tu carrito.

![Carrito](/doc/img/captura-carrito.jpeg)

**Proceso de compra:**

- Accede a tu carrito para revisar los productos seleccionados.
- Accede a la pasarela de pago pulsando el botón de "finalizar compra".
- Continúa con el proceso de compra proporcionando la información necesaria para el envío y pago.

![Pasarela](/doc/img/captura-pasarela.jpeg)

**Datos de usuario**

- Accede a tu perfil para revisar tus datos y consultar tus pedidos.

![Perfil](/doc/img/captura-perfil.jpeg)
![Pedidos](/doc/img/captura-pedidos.jpeg)
![Pedido detalle](/doc/img/captura-pedido-detalle.jpeg)
**Gestión de inventario (administradores):**

- Añadir, modificar y eliminar productos desde el panel de administración.

![Gestión Inventario](/doc/img/captura-gestion-inventario.jpeg)

**Gestión de usuarios (administradores):**

- Desactivar cuentas de usuarios o habilitar usuarios como administradores.

![Gestión Usuarios](/doc/img/captura-gestion-usuarios.jpeg)

**Gestión de pedidos (administradores):**

- Cambiar el estado de los pedidos según el proceso de gestión.

![Gestión Pedidos](/doc/img/captura-gestion-pedidos.jpeg)

## Sobre a persoa autora

Soy Leonardo, estudiante de Desarrollo de Aplicaciones Web (DAW) con experiencia en tecnologías como Symfony (PHP), Vue.js (Javascript) y bases de datos relacionales.

El objetivo de este proyecto es desarrollar una web que abarque la mayor parte de la materia impartida a lo largo del ciclo. Por esta razón, he decidido crear un tienda web, que incluya tanto el frontend (Vue) como el backend (Symfony), siendo esta la primera vez que abordo ambos aspectos en un mismo proyecto.

Puedes contactarme a través de mi correo electrónico: `a22leonardofa@iessanclemente.net`

## Licencia

Consulta el archivo [LICENSE](LICENSE.md) en la raíz del repositorio.

## Guía de contribución

Puedes contribuir en este proyecto:

- Añadiendo nuevas funcionalidades.
- Corrigiendo errores u optimizando el código existente.
- Integrando una plataforma de pago.
- Mejorando la seguridad de la aplicación.

## Memoria

1. [Estudio preliminar](doc/templates/1_estudo_preliminar.md)
2. [Análisis](doc/templates/2_analise.md)
3. [Diseño](doc/templates/3_deseno.md)
4. [Planificación y Presupuesto](doc/templates/a3_orzamento.md)
5. [Codificación y Pruebas](doc/templates/4_codificacion_probas.md)
6. [Mantenimiento](doc/templates/5_manuais.md)
