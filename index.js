const http = require('http');
const url = require('url');
const fs = require('fs');
const { insertar, consultar, editar, eliminar, transferir, consultatrans} = require("./consultas");

http
    .createServer(async (req, res) => {
        if (req.url == "/" && req.method === "GET") { //Devuelve la aplicación cliente 
            res.setHeader("content-type", "text/html");
            const html = fs.readFileSync("index.html", "utf8");
            res.end(html);
        }

        //Recibe los datos de un nuevo usuario y los almacena en PostgreSQL
        if ((req.url == "/usuario" && req.method == "POST")) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                const datos = Object.values(JSON.parse(body));
                const respuesta = await insertar(datos);
                res.end(JSON.stringify(respuesta));
            });
        }

        ///Devuelve todos los usuarios registrados con sus balances
        if (req.url == "/usuarios" && req.method === "GET") {
            const registros = await consultar();
            //console.log(registros)
            res.end(JSON.stringify(registros));
        }

        //Recibe los datos modificados de un usuario registrado y los actualiza
        if (req.url.startsWith("/usuario?") && req.method == "PUT") {
            let { id } = url.parse(req.url, true).query;
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                const datos = Object.values(JSON.parse(body));
                const respuesta = await editar(datos, id);
                res.end(JSON.stringify(respuesta));
            });
        }

        // Recibe el id de un usuario registrado y lo elimina
        if (req.url.startsWith( "/usuario?" ) && req.method == "DELETE" ) {
            const {id } = url.parse(req.url, true ).query;
            const respuesta = await eliminar(id);
            res.end( JSON .stringify(respuesta));
            }

         // /transferencia POST: Recibe los datos para realizar una nueva transferencia
         if ((req.url == "/transferencia" && req.method == "POST")) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                const datos = Object.values(JSON.parse(body));
                const respuesta = await transferir(datos);
                res.end(JSON.stringify(respuesta, null, 1));
            });
        }
      

        //Devuelve todas las transferencias almacenadas en la base dedatos en formato de arreglo.
        if (req.url == "/transferencias" && req.method === "GET") {
            const registros = await consultatrans();
            //console.log(registros)
            res.end(JSON.stringify(registros, null, 1));
        }

    })
    .listen(3000, console.log("SERVER ON"));

