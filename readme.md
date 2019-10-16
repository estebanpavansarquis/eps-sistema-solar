# Sistema Solar - Resolución
### Tecnologías escojidas: 

- [NodeJS](https://nodejs.org/es/)
- [Express](https://expressjs.com/es/)
- [Mongoose](https://mongoosejs.com)

### Hosting:
- [Heroku](https://www.heroku.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)


## Información sobre la API

### Clima
Para poder utilizar el sistema como un servicio se brinda una API
REST de consulta sobre las condiciones meteorológicas de un día en particular.
````
GET  /clima?dia=566
````
__Respuesta:__
```
{
	"dia": 566,
	"clima": "Lluvia"    
}
```
