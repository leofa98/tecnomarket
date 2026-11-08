# TecnoMarket
 
Proyecto de fin de ciclo del ciclo formativo de grado superior en Desarrollo de Aplicaciones Web (DAW).
 
> **Estado del proyecto:** TecnoMarket **ya no está desplegado**. Este repositorio conserva el código, la documentación y las capturas de pantalla.
 
## Descripción
 
TecnoMarket es una tienda de electrónica que desarrollé como proyecto final de mi ciclo de DAW. Está construida con una API REST en Symfony, un frontend en Vue y una base de datos relacional MariaDB. Permite a los usuarios navegar por el catálogo, buscar productos y comprarlos.
 
Además de las funciones básicas de compra, incluye un panel de administración con el que se puede:
 
- Añadir, modificar y eliminar productos.
- Gestionar usuarios, permitiendo activar y desactivar cuentas y habilitar y deshabilitar usuarios como administradores.
- Gestionar pedidos, incluyendo la actualización de su estado.
- Valorar los productos con puntuación y comentarios.
## Funcionamiento de la aplicación
 
A continuación se muestra, con capturas de pantalla, cómo funciona la aplicación.
 
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
 
![Gestión Inventario](/doc/img/captura-gestion-inventario-2.jpeg)
 
**Gestión de usuarios (administradores):**
 
- Desactivar cuentas de usuarios o habilitar usuarios como administradores.
![Gestión Usuarios](/doc/img/captura-gestion-usuarios.jpeg)
 
**Gestión de pedidos (administradores):**
 
- Cambiar el estado de los pedidos según el proceso de gestión.
![Gestión Pedidos](/doc/img/captura-gestion-pedidos.jpeg)
 
![Gestión Pedidos](/doc/img/captura-gestion-pedidos-2.jpeg)
 
 
## Sobre el proyecto y su autor
 
Soy Leonardo y este es el proyecto con el que cerré mi ciclo de DAW. Mi objetivo era aplicar lo aprendido durante el ciclo en una tienda web completa. Fue la primera vez que integré en un mismo proyecto un backend con Symfony (PHP) y un frontend con Vue.js (JavaScript), conectados mediante una API REST y una base de datos relacional.
 
Es un proyecto académico, así que tiene limitaciones propias de ese contexto. Por ejemplo, no hay una plataforma de pago real integrada y la seguridad de la aplicación se puede mejorar.
 
Si quieres contactarme, puedes escribirme a leonarfer@hotmail.es
 
## Licencia
 
Consulta el archivo [LICENSE](LICENSE.md) en la raíz del repositorio.
 
## Posibles mejoras
 
Cosas que quedaron fuera del alcance del proyecto y que se podrían añadir:
 
- Integrar una plataforma de pago real.
- Reforzar la seguridad de la aplicación.
- Optimizar el código existente y corregir errores.
## Memoria
 
1. [Estudio preliminar](doc/fases_desarrollo/1_estudio_preliminar.md)
2. [Análisis](doc/fases_desarrollo/2_analisis.md)
3. [Diseño](doc/fases_desarrollo/3_disenho.md)
4. [Planificación y Presupuesto](doc/fases_desarrollo/a3_presupuesto.md)
5. [Codificación y Pruebas](doc/fases_desarrollo/4_codificacion_pruebas.md)
6. [Mantenimiento](doc/fases_desarrollo/5_manuales.md)
 
