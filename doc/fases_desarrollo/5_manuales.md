# Implantación

https://tecnomarket2.vercel.app/

# Diagrama de despliegue y Diagrama de Componentes de software

## Diagrama de componentes
![Diagrama componentes](/doc/img/diagrama-componentes.svg)

## Diagrama de despliegue
![Diagrama despliegue](/doc/img/diagrama-despliegue.svg)

# Manual técnico

## Manual de puesta en producción

He empleado Docker para desplegar un entorno LEMP (API REST, base de datos y servidor nginx) dentro de una instancia (droplet) de Digital Ocean. Para desplegar el frontend he optado por Vercel. En el caso de Digital Ocean, me he registrado a través de GitHub para obtener un crédito de 200$ como estudiante y así poder crear la instancia de manera gratuita.

He exportado una base de datos inicial con algo de contenido para que al iniciarse el contenedor con la base de datos se añada de forma automática a la misma.

## Manual entorno de desarrollo
- **Prerrequisitos hardware:** Un ordenador con un rendimiento medio.
- **Software que debe ser instalado:** Git, Xampp, Symfony, Node.js, npm y un editor de código con los plugins de Vue correspondientes. Además, se deben ejecutar los comandos `composer install --ignore-platform-reqs` y `npm install` en el proyecto Symfony y en el de Vue respectivamente para instalar las librerías necesarias.
- **Estructura final da BD**.

![Base de datos](/doc/img/basededatos.svg)

- **La estructura del proyecto y los directorios más relevantes son los siguientes:**

    - **Proyecto**
        - **backend**
            - **`config`**: Archivos de configuración.
            - **`public`**: Directorio raíz.
            - **`src`**: Código fuente de la aplicación.
                - **`Controller`**: Controladores de la aplicación.
                - **`Entity`**: Entidades del modelo de datos.
                - **`Repository`**: Repositorios con métodos para acceder a los datos de la base.
            - **`vendor`**: Dependencias instaladas.
            - **`migrations`**: Archivos de migraciones de base de datos.
            - **`composer.json`**: Define las dependencias del proyecto y scripts.
            - **`.env`**: Variables de entorno para producción.
            - **`.env.local`**: Variables de entorno locales para desarrollo.
            - **`.gitignore`**: Archivos y directorios ignorados por Git.

        - **frontend**
            - **`node_modules`**: Directorio dependencias y módulos de Node que necesita el proyecto para funcionar.
            - **`public`**: Directorio raíz donde se guardan las imágenes no editables (las que no son productos).
            - **`src`**: Directorio que contiene el código fuente de la aplicación.
                - **`assets`**: Archivos estáticos. Aquí están los estilos que aplico a toda la página.
                - **`components`**: Componentes individuales para construir la aplicación.
                    - **`busqueda`**: Componentes que presentan los productos filtrados por nombre, categoría...
                    - **`generales`**: Pueden ser utilizados en varios ámbitos (producto simple, producto carrito, encabezado de la página, rótulo de 'acceso denegado'...)
                    - **`home`**: Componentes de la página de inicio.
                    - **`modales`**: Ventanas modales.
                    - **`navegacion`**: Componentes relacionados con la navegación (barra de navegación y barra lateral).
                    - **`panelGestion`**: Componentes relacionados con el panel de gestión.
                    - **`pasarelaPago`**: Componentes relacionados con la pasarela de pago.
                    - **`perfil`**: Componentes relacionados con la vista del perfil del usuario.
                    - **`productos`**: Componentes relacionados con la vista detallada del producto.
            - **`views`**: Contiene las distintas vistas de la aplicación.
            - **`router`**: Contiene un `index.js` que define la configuración de las rutas de la aplicación.
            - **`index.html`**: Archivo empleado para toda la página.
            - **`App.js`**: Componente raíz de la aplicación.
            - **`package.json`**: Define las dependencias del proyecto y scripts de npm.
            - **`.env`**: Variables de entorno de producción (base de datos y API).
            - **`.gitignore`**: Archivos y directorios ignorados por Git.
            - **`.env.local`**: Variables de entorno locales para desarrollo.

- **Claves de acceso**:
    - **Cliente**
        - Usuario: `usuario@gmail.com`
        - Contraseña: `abc123.`
    - **Gestor/Administrador**
        - Usuario: `admin@gmail.com`
        - Contraseña: `abc123.`
        
- **Otra información**: Es necesario crear un archivo `.env.local` basado en el `.env` en ambos proyectos con las direcciones locales.
