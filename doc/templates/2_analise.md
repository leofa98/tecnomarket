# Análise: Requirimentos do sistema

## Descripción general

Mi aplicación consistirá en una tienda online en la que los clientes o administradores podrán buscar, comprar y gestionar productos, además de compartir sus valoraciones sobre los mismos.

## Enumerar e indicar una descripción breve de cada una de las funcionalidades.

Las funcionalidades que ofrecerá la web son las siguientes:

- **Iniciar sesión:** Los clientes y administradores pueden iniciar sesión
- **Cerrar sesión:** Los clientes y administradores pueden cerrar sesión
- **Registrarse:** Cuando no hay sesiones iniciadas el usuario invitado puede registrarse como cliente
- **Editar perfil:** Los clientes podrán editar sus datos de usuario
- **Buscar productos:** Todos usuarios podrán buscar productos por nombre o categoría.
- **Añadir productos al carrito:** Los clientes y usuarios invitados podrán agregar productos a su carrito de compras
- **Realizar pedidos:** Los clientes podrán realizar pedidos tras añadirlos al carrito
- **Gestionar productos:** Los administradores podrán agregar, editar y eliminar productos de la tienda.
- **Gestionar pedidos:** Los administradores podrán cambiar el estado de los pedidos.
- **Gestionar usuarios:** Los administradores podrán gestionar cuentas de usuarios.
- **Valorar productos**: Los clientes podrán dejar valoraciones y reseñas sobre los productos.

## Requerimientos funcionales: requerimientos sobre rendimiento, seguridad, etc.

Las contraseñas se guardarán codificadas en la base de datos.

## Tipos de usuarios.

- **Cliente:** Sólo podrá comprar, buscar y valorar porductos
- **Administrador:** Usuario con permisos para gestionar el inventario y cuentas de usuario
- **Invitado:** Usuario que accede a la página sin iniciar sesión

## Entorno operacional: estimación de plataformas hardware y software necesarias para la implantación.

La aplicación se compondrá de un frontend desarrollado en Vue, el cual obtendrá datos de una base de datos MySQL mediante una API REST construida con Symfony.

## Interfaces externas: de usuario, software, hardware. Esta sección describe como interaciona el sistema con su entorno, especialmente con sus usuarios humanos.

Dado que se trata de una aplicación web, estará accesible a través de navegadores web y será utilizable tanto en dispositivos táctiles como en ordenadores mediante el uso de teclado y ratón. La navegación se realizará principalmente a través de una barra de navegación entre la que se podrá acceder a las distintas secciones, buscar productos o iniciar sesión.

## Mejoras futuras: las versiones futuras del sistema podrían incorporar mejoras.

En futuras versiones del sistema, se pueden contemplar mejoras adicionales que podrían incluir:

- Refuerzo de la seguridad en la gestión de contraseñas y sesiones para garantizar una protección más sólida de los datos de los usuarios.

- Integración de una plataforma de pago para facilitar transacciones seguras dentro de la aplicación, lo que podría mejorar la experiencia del usuario y permitir nuevas funcionalidades comerciales.
