# ToDo_backend

WebService para aplicacion de [ToDo_APP](https://github.com/castrocarlos313/ToDo_frontend) hecha express.

# Contenido

- [ToDo_backend](#todo_backend)
- [Contenido](#contenido)
- [Tecnologia usadas](#tecnologia-usadas)
- [Launch](#launch)
- [Entradas de la api](#entradas-de-la-api)
  - [GET /usuario ObtenerUsuario](#get-usuario-obtenerusuario)
  - [POST /usuario CrearUsuario](#post-usuario-crearusuario)
  - [POST /auth iniciarSesion](#post-auth-iniciarsesion)
  - [POST /folder crearFolder](#post-folder-crearfolder)
  - [GET /folder crearFolder](#get-folder-crearfolder)
  - [PUT /folder/:id modificarFolder](#put-folderid-modificarfolder)
  - [DELETE /folder/:id eliminarFolder](#delete-folderid-eliminarfolder)
  - [POST /folder crearTask](#post-folder-creartask)
  - [GET /task/:folderId obtenerTask](#get-taskfolderid-obtenertask)
  - [PUT /task/:id modificarTask](#put-taskid-modificartask)
  - [DELETE /task/:id eliminarTask](#delete-taskid-eliminartask)

# Tecnologia usadas

- [Typescript](https://www.typescriptlang.org/)
- [Eslint](https://eslint.org/)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)

# Launch

Antes de correr esta aplicacion se debe crear un archivo _.env_ y agregar la variables de entorno `DB_MONGO`(URI del DB) y `SECRETA` para JWT, y ejecutar los siguientes comando:

```
$ npm install
$ npm run dev
```

El servidor se ejecuta por defecto en le puerto 5000

# Entradas de la api

- [GET ObtenerUsuario](#get-usuario-obtenerusuario)

- [POST CrearUsuario](#post-usuario-crearusuario)

- [POST iniciarSesion](#post-auth-iniciarsesion)

- [POST crearFolder](#post-folder-crearfolder)

- [GET crearFolder](#get-folder-crearfolder)

- [PUT modificarFolder](#put-folderid-modificarfolder)

- [DELETE eliminarFolder](#delete-folderid-eliminarfolder)

- [POST crearTask](#post-folder-creartask)

- [GET obtenerTask](#get-taskfolderid-obtenertask)

- [PUT modificarTask](#put-taskid-modificartask)

- [DELETE eliminarTask](#delete-taskid-eliminartask)

## GET /usuario ObtenerUsuario

Ejemplo: http://localhost:5000/api/usuario

Request:

    {
        header: {
            token: uid,
        }
    }

Response:

    {
        ok: true,
        usuario:{
            nombre: string,
            email: string,
            contraseña: string,
        },
        token: string,
    }

## POST /usuario CrearUsuario

Ejemplo: http://localhost:5000/api/usuario

Request:

    {
        body: {
            nombre: string,
            email: string,
            contraseña: string,
        }
    }

Response:

    {
        ok: true,
        usuario:{
            nombre: string,
            email: string,
            contraseña: string,
        },
        token: string,
    }

## POST /auth iniciarSesion

Ejemplo: http://localhost:5000/api/auth

Request:

    {
        body: {
            nombre: string,
            email: string,
            contraseña: string,
        }
    }

Response:

    {
        ok: true,
        usuario:{
            nombre: string,
            email: string,
            contraseña: string,
        },
        token: string,
    }

## POST /folder crearFolder

Ejemplo: http://localhost:5000/api/folder

Request:

    {
        header:{
            token: uid,
        },
        body: {
            nombre: string,
        }
    }

Response:

    {
        ok: true,
        folder:{
            nombre: string,
            uid: string,
            _id: string,
        }
    }

## GET /folder crearFolder

Ejemplo: http://localhost:5000/api/folder

Request:

    {
        header:{
            token: uid,
        }
    }

Response:

    {
        ok: true,
        folders: [],
    }

## PUT /folder/:id modificarFolder

Ejemplo: http://localhost:5000/api/folder/:id

Request:

    {
        header:{
            token: uid,
        },
        body: {
            nombre: string,
        }
    }

Response:

    {
        ok: true,
        folder:{
            nombre: string,
            uid: string,
            _id: string,
        }
    }

## DELETE /folder/:id eliminarFolder

Ejemplo: http://localhost:5000/api/folder/:id

Request:

    {
        header:{
            token: uid,
        }
    }

Response:

    {
        ok: true,
        folder:{
            nombre: string,
            uid: string,
            _id: string,
        }
    }

## POST /folder crearTask

Ejemplo: http://localhost:5000/api/task

Request:

    {
        header:{
            token: uid,
        },
        body: {
            nombre: string,
            folderId: string,
        }
    }

Response:

    {
        ok: true,
        task:{
            nombre: string,
            folderId: string,
            _id: string,
        },
    }

## GET /task/:folderId obtenerTask

Ejemplo: http://localhost:5000/api/task/:folderId

Request:

    {
        header:{
            token: uid,
        }
    }

Response:

    {
        ok: true,
        tasks: [],
    }

## PUT /task/:id modificarTask

Ejemplo: http://localhost:5000/api/task/:id

Request:

    {
        header:{
            token: uid,
        },
        body: {
            nombre: string,
        }
    }

Response:

    {
        ok: true,
        task:{
            nombre: string,
            folderId: string,
            _id: string,
        }
    }

## DELETE /task/:id eliminarTask

Ejemplo: http://localhost:5000/api/task/:id

Request:

    {
        header:{
            token: uid,
        }
    }

Response:

    {
        ok: true,
        task:{
            nombre: string,
            folderId: string,
            _id: string,
        }
    }
