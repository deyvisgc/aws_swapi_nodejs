# Descripción del Sistema

Este repositorio contiene el código fuente de una API desarrollada en Node.js con el framework Serverless para su despliegue en AWS. La API se encarga de proporcionar información sobre personajes de StarWars, traducida al español, y de almacenarla en una base de datos MySQL alojada en AWS RDS.

## Funcionamiento de la API
# Endpoint GET characters/{id}
* Este endpoint recibe un parámetro {id} que representa el número de una persona.
* Cuando se hace una solicitud a este endpoint, el sistema realiza una llamada a la API de SWAPI para obtener la información del personaje correspondiente al ID proporcionado.
* Después de obtener la información del personaje de SWAPI, el sistema traduce los nombres de los atributos al español.
* La información traducida se devuelve como respuesta al cliente que realizó la solicitud.
 Puedes acceder a este endpoint aquí: [[GET /characters/{id}]([https://dndikr8nak.execute-api.us-east-1.amazonaws.com/api/v1/characters/30](https://dndikr8nak.execute-api.us-east-1.amazonaws.com/api/v1/characters/30))]
# Endpoint POST api/v1/characters
* Este endpoint se utiliza para cargar información de personajes en una base de datos MySQL.
* Los datos necesarios para este endpoint son los mismos que se obtienen del endpoint GET mencionado anteriormente, pero ya traducidos al español.
* Cuando se realiza una solicitud POST a este endpoint, el sistema toma los datos proporcionados y los inserta en la base de datos MySQL alojada en AWS RDS.
Puedes acceder a este endpoint aquí: [POST /characters] [[https://dndikr8nak.execute-api.us-east-1.amazonaws.com/api/v1/characters]](https://dndikr8nak.execute-api.us-east-1.amazonaws.com/api/v1/characters) 
# Endpoint GET api/v1/characters/get-swapi
* Este endpoint se utiliza para recuperar la información de personajes almacenada en la base de datos MySQL.
* Al hacer una solicitud a este endpoint, el sistema realiza una consulta a la base de datos para obtener la información de todos los personajes almacenados.
* La información recuperada se devuelve como respuesta al cliente que realizó la solicitud.
Puedes acceder a este endpoint aquí: [GET /characters/get-swapi][ [https://dndikr8nak.execute-api.us-east-1.amazonaws.com/api/v1/characters/get-swapi]](https://dndikr8nak.execute-api.us-east-1.amazonaws.com/api/v1/characters/get-swapi)

## Configuración de Variables de Entorno

Para configurar las variables de entorno en modo de producción, sigue estos pasos:

1. Crea un archivo `.env.prod` en la raíz del proyecto.
2. Define las variables de entorno necesarias en el archivo `.env.prod`, por ejemplo:

* DB_HOST=tu-host
* DB_USER=tu-usuario
* DB_PASSWORD=tu-contraseña
* DB_DATABASE=tu-base-de-datos
## Despliegue en AWS

* Los tres endpoints mencionados anteriormente fueron desplegados en AWS utilizando el framework Serverless.
* Cada función Lambda asociada a un endpoint fue implementada y configurada en AWS Lambda.
* La infraestructura de API Gateway se configuró para exponer los endpoints a través de una API HTTP.
* Para la base de datos MySQL, se utilizó AWS RDS (Relational Database Service) para alojarla en la nube de AWS.
* Para desplegar la API en AWS, sigue estos pasos:

1. Asegúrate de tener configuradas tus credenciales de AWS en tu máquina local.
2. Ejecuta el siguiente comando en la raíz del proyecto para desplegar la API:

```bash
serverless deploy --stage dev o prod --verbose


