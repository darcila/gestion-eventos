## Servicio de Autenticación

Este servicio proporciona un conjunto de endpoints para la autenticación de usuarios y la gestión de cuentas de usuario.

Aquí tienes una descripción de cada endpoint:

**Autenticar un usuario:**

* **Endpoint:** `/auth`
* **Método:** POST
* **Descripción:** Autentica a un usuario con las credenciales proporcionadas en el cuerpo de la solicitud.
* **Cuerpo de la solicitud:** Requiere `usuario` y `clave`.
* **Respuesta exitosa:** Devuelve un objeto con un token JWT (`token`) que se puede usar para autenticar solicitudes posteriores a otros servicios.
* **Códigos de error:** 401 (Unauthorized) si las credenciales son inválidas.

**Crear un nuevo usuario:**

* **Endpoint:** `/usuarios`
* **Método:** POST
* **Descripción:** Crea una nueva cuenta de usuario con la información proporcionada en el cuerpo de la solicitud.
* **Cuerpo de la solicitud:** Requiere `usuario` y `clave`, con restricciones de longitud para ambos.
* **Respuesta exitosa:** Devuelve un objeto con la información del usuario creado (puede incluir el ID u otros datos relevantes).
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida (por ejemplo, si el usuario ya existe o si las credenciales no cumplen con las restricciones de longitud).

**Esquemas de validación:**

Los esquemas `autenticacionSchema` y `crearUsuarioSchema` definen las validaciones para cada endpoint, incluyendo los tipos de datos, campos requeridos y restricciones de longitud. También especifican las respuestas esperadas para cada código de estado.


## Servicio Consumo Asistentes

Este servicio proporciona un conjunto de endpoints para gestionar asistentes. Permite crear, obtener, actualizar y eliminar asistentes. Cada asistente se identifica de forma única por su `identificación`.

Aquí tienes una descripción de cada endpoint:

**Crear un asistente:**

* **Endpoint:** `/asistentes`
* **Método:** POST
* **Descripción:** Crea un nuevo asistente con la información proporcionada en el cuerpo de la solicitud.
* **Cuerpo de la solicitud:** Requiere `identificacion`, `nombre`, `direccion`, `telefono`, `correo` y `ciudad`. Opcionalmente, se pueden especificar `categorias`.
* **Respuesta exitosa:** Devuelve un objeto con la información del asistente creado.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Obtener un asistente por su identificación:**

* **Endpoint:** `/asistentes/{identificacion}`
* **Método:** GET
* **Descripción:** Obtiene la información del asistente con la `identificacion` especificada en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con la información del asistente.
* **Códigos de error:** 400 (Bad Request) si la `identificacion` es inválida, 404 (Not Found) si no se encuentra un asistente con esa `identificacion`.

**Actualizar un asistente por su identificación:**

* **Endpoint:** `/asistentes`
* **Método:** PUT
* **Descripción:** Actualiza la información del asistente con la `identificacion` especificada en el cuerpo de la solicitud.
* **Cuerpo de la solicitud:** Requiere `identificacion`. Opcionalmente, se pueden actualizar `nombre`, `direccion`, `telefono`, `correo` y `categorias`.
* **Respuesta exitosa:** Devuelve un objeto con la información del asistente actualizado.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida, 404 (Not Found) si no se encuentra un asistente con esa `identificacion`.

**Borrar un asistente:**

* **Endpoint:** `/asistentes/{identificacion}`
* **Método:** DELETE
* **Descripción:** Elimina el asistente con la `identificacion` especificada en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con un mensaje de confirmación.
* **Códigos de error:** 404 (Not Found) si no se encuentra un asistente con esa `identificacion`.

**Encabezados:**

Todos los endpoints requieren un encabezado `Authorization` con un token de autenticación en el formato `Bearer <token>`.

**Esquemas de validación:**

Los esquemas `createAsistenteSchema`, `getAsistentePorIdentificacionSchema`, `updateAsistenteSchema` y `deleteAsistenteSchema` definen las validaciones para cada endpoint, incluyendo los tipos de datos, campos requeridos, formatos y longitudes máximas. También especifican las respuestas esperadas para cada código de estado.


## Servicio para los Eventos

Este servicio proporciona un conjunto de endpoints para gestionar eventos, incluyendo la creación, consulta, actualización y eliminación de eventos, así como la obtención de información relacionada con los asistentes y lugares cercanos.

Aquí tienes una descripción de cada endpoint:

**Obtener un evento:**

* **Endpoint:** `/eventos/{id}`
* **Método:** GET
* **Descripción:** Obtiene la información de un evento específico mediante su ID.
* **Parámetros:** `id` (numérico) en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con la información del evento, incluyendo nombre, descripción, lugar, ciudad, fecha, hora, valor y capacidad.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Obtener lugares cercanos al evento:**

* **Endpoint:** `/eventos/lugares`
* **Método:** GET
* **Descripción:** Obtiene una lista de 5 lugares cercanos a la ubicación del evento.
* **Parámetros:** `tipo` (cadena de texto) y `evento` (numérico) en la cadena de consulta.
* **Respuesta exitosa:** Devuelve una lista de objetos, cada uno con el nombre y la dirección de un lugar cercano.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Obtener eventos cercanos a una dirección:**

* **Endpoint:** `/eventos/cercanos`
* **Método:** GET
* **Descripción:** Obtiene una lista de eventos cercanos a una dirección dada, dentro de una distancia especificada.
* **Parámetros:** `direccion` (cadena de texto), `distancia` (numérico en kilómetros) y `ciudad` (cadena de texto) en la cadena de consulta.
* **Respuesta exitosa:** Devuelve una lista de objetos, cada uno con el nombre, dirección, fecha, valor y distancia de un evento cercano.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Crear un evento:**

* **Endpoint:** `/eventos`
* **Método:** POST
* **Descripción:** Crea un nuevo evento con la información proporcionada en el cuerpo de la solicitud.
* **Cuerpo de la solicitud:** Requiere `nombre`, `descripcion`, `lugar`, `ciudad`, `fecha` y `hora`. Opcionalmente, se pueden especificar `categoria`, `capacidad` y `valor`.
* **Respuesta exitosa:** Devuelve un objeto con la información del evento creado.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Actualizar un evento:**

* **Endpoint:** `/eventos`
* **Método:** PATCH
* **Descripción:** Actualiza la información de un evento existente.
* **Cuerpo de la solicitud:** Requiere `id`. Opcionalmente, se pueden actualizar `nombre`, `fecha`, `hora`, `capacidad` y `valor`.
* **Respuesta exitosa:** Devuelve un objeto con la información del evento actualizado.
* **Códigos de error:** 404 (Not Found) si el evento no se encuentra.

**Borrar un evento:**

* **Endpoint:** `/eventos/{id}`
* **Método:** DELETE
* **Descripción:** Elimina un evento específico mediante su ID.
* **Parámetros:** `id` (numérico) en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con un mensaje de confirmación.
* **Códigos de error:** 404 (Not Found) si el evento no se encuentra.

**Obtener el total de asistentes a un evento:**

* **Endpoint:** `/eventos/{id}/asistentes`
* **Método:** GET
* **Descripción:** Obtiene el número total de asistentes a un evento específico.
* **Parámetros:** `id` (numérico) en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con la información del evento y el total de asistentes.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Subir un archivo Excel con información de eventos:**

* **Endpoint:** `/eventos/upload`
* **Método:** POST
* **Descripción:** Permite subir un archivo Excel con información de eventos para su procesamiento.
* **Cuerpo de la solicitud:** Requiere un archivo en formato binario (`file`).
* **Respuesta exitosa:** Devuelve un objeto con el ID del proceso.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida, 404 (Not Found) si ocurre un error durante el procesamiento.

**Obtener el estado de un proceso:**

* **Endpoint:** `/eventos/process/{jobId}`
* **Método:** GET
* **Descripción:** Obtiene el estado de un proceso de carga de eventos mediante su ID.
* **Parámetros:** `jobId` (cadena de texto) en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con el estado del proceso (en cola, procesando, completado, error).
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida, 404 (Not Found) si el proceso no se encuentra.

**Obtener el total de asistentes a un evento por día:**

* **Endpoint:** `/eventos/asistentes/dia`
* **Método:** GET
* **Descripción:** Obtiene el total de asistentes a un evento por día de la semana.
* **Respuesta exitosa:** Devuelve un objeto con el día de la semana y el total de asistentes para ese día.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Encabezados:**

Todos los endpoints requieren un encabezado `Authorization` con un token de autenticación en el formato `Bearer <token>`.

**Esquemas de validación:**

Los esquemas definen las validaciones para cada endpoint, incluyendo los tipos de datos, campos requeridos, formatos, longitudes máximas, etc. También especifican las respuestas esperadas para cada código de estado.


## Servicio para las Reservas

Este servicio proporciona un conjunto de endpoints para gestionar reservas de eventos, incluyendo la creación, consulta, actualización y eliminación de reservas.

Aquí tienes una descripción de cada endpoint:

**Crear una reserva:**

* **Endpoint:** `/reservas`
* **Método:** POST
* **Descripción:** Crea una nueva reserva para un evento.
* **Cuerpo de la solicitud:** Requiere `asistente_id`, `evento_id` y `cantidad_boletos`.
* **Respuesta exitosa:** Devuelve un objeto con la información de la reserva creada, incluyendo  `id`, `asistente_id`, `evento_id`, `fecha_reserva`, `cantidad_boletos` y `estado`.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida, 409 (Conflict) si no hay suficientes boletos disponibles.

**Obtener una reserva:**

* **Endpoint:** `/reservas/{id}`
* **Método:** GET
* **Descripción:** Obtiene la información de una reserva específica mediante su ID.
* **Parámetros:** `id` (numérico) en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con la información de la reserva.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida.

**Confirmar o cancelar una reserva:**

* **Endpoint:** `/reservas`
* **Método:** PUT
* **Descripción:** Actualiza el estado de una reserva a "confirmada" o "cancelada".
* **Cuerpo de la solicitud:** Requiere `id` y `estado` ("confirmada" o "cancelada").
* **Respuesta exitosa:** Devuelve un objeto con el ID de la reserva actualizada.
* **Códigos de error:** 400 (Bad Request) si la solicitud es inválida, 404 (Not Found) si la reserva no se encuentra.

**Eliminar una reserva:**

* **Endpoint:** `/reservas/{id}`
* **Método:** DELETE
* **Descripción:** Elimina una reserva específica mediante su ID.
* **Parámetros:** `id` (numérico) en la ruta.
* **Respuesta exitosa:** Devuelve un objeto con un mensaje de confirmación.
* **Códigos de error:** 404 (Not Found) si la reserva no se encuentra.


**Encabezados:**

Todos los endpoints requieren un encabezado `Authorization` con un token de autenticación en el formato `Bearer <token>`.

**Esquemas de validación:**

Los esquemas `createReservaSchema`, `getReservaSchema`, `updateReservaSchema` y `deleteReservaSchema` definen las validaciones para cada endpoint, incluyendo los tipos de datos, campos requeridos, formatos y valores permitidos. También especifican las respuestas esperadas para cada código de estado.
