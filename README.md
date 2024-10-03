## Despliegue de la Plataforma de Gestión de Eventos con Docker

Este documento describe los pasos para desplegar la plataforma de gestión de eventos utilizando Docker. La aplicación se ha dockerizado para facilitar su despliegue y asegurar la consistencia entre diferentes entornos.

### Resumen de la Entrega

Se ha desarrollado una API RESTful para la gestión de eventos, cumpliendo con los requisitos del reto técnico. La aplicación permite a los usuarios crear, promocionar y gestionar eventos, registrar asistentes, consultar información y ubicaciones cercanas. Se ha utilizado Node.js con Express.js, PostgreSQL, Mapbox, Redis y Bull.js para implementar las funcionalidades requeridas. La arquitectura de la aplicación se basa en Clean Architecture para asegurar la modularidad y escalabilidad. Se han implementado pruebas unitarias, un flujo de CI/CD y un sistema de monitoreo para garantizar la calidad y disponibilidad de la aplicación.

### Repositorio GitHub

El código fuente de la aplicación se encuentra en el siguiente repositorio de GitHub:

[https://github.com/darcila/gestion-eventos](https://github.com/darcila/gestion-eventos)

### Requisitos

*   Docker instalado en su sistema.
*   Docker Compose instalado en su sistema.
*   Clonar el repositorio de GitHub.

### Pasos para el Despliegue

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/darcila/gestion-eventos.git
    ```

2.  **Navegar al directorio del proyecto:**

    ```bash
    cd gestion-eventos
    ```

3.  **Iniciar la aplicación:**

    ```bash
    docker-compose up -d --build
    ```

    Este comando construirá las imágenes Docker necesarias y  las ejecutará en segundo plano.

4.  **Verificar el estado de los contenedores:**

    ```bash
    docker-compose ps
    ```

    Este comando mostrará el estado de los contenedores en ejecución.

### Detener la aplicación

Para detener la aplicación y eliminar los contenedores, puedes usar uno de los siguientes comandos:

```bash
docker-compose down --remove-orphans
```

o

```bash
docker-compose down
```

### Ver los logs de la aplicación

Para ver los logs de la aplicación en tiempo real, puedes usar el siguiente comando:

```bash
docker-compose logs -f --tail="100"
```

Este comando mostrará las últimas 100 líneas de los logs y continuará mostrando los nuevos logs a medida que se generen.


### Comandos adicionales de Docker

*   **Listar imágenes Docker:**

    ```bash
    docker images
    ```

*   **Eliminar una imagen Docker:**

    ```bash
    docker rmi <nombre_de_la_imagen>
    ```

*   **Listar contenedores Docker:**

    ```bash
    docker ps -a
    ```

*   **Eliminar un contenedor Docker:**

    ```bash
    docker rm <id_del_contenedor>
    ```

*   **Acceder a la consola de un contenedor Docker:**

    ```bash
    docker exec -it <id_del_contenedor> bash
    ```

### Notas adicionales

*   La aplicación se ejecuta en el puerto 85 por defecto. Puedes acceder a la API a través de la URL `http://localhost:85`.
*   Puedes modificar las variables de entorno en el archivo `.env` para configurar la aplicación.
