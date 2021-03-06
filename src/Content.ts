﻿import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Sandbox 9A</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        res.write("Hello Jedlik, hello 9.A");
        res.write("<h2 style='color:red;'>TipeScript</h2>");
        res.write("próba")
        res.write("alma")

        // Tetszőleges html teg-ek és attribútumok beépítése:
        res.write("<span style='color: blue;'><i>Színes és dőlt Hello World!'</i></span>\n");

        // Próbáljuk számra konvertálni a "kor" paraméter (http://localhost:8080/?kor=16) értékét:
        let korod: number = parseInt(params.kor as string);
        // Ha nincs "kor" paraméter megadva, vagy nem lehet számra konvertálni értékét,
        // akkor a "korod" változóba NaN érték kerül, ilyenkor legyen 18 év az értéke:
        if (isNaN(korod)) korod = 18;

        res.write(`Kérem a korod: <input type='number' name='kor' value=${korod} style='width:3em;' onChange='this.form.submit();'>\n`);
        res.write(`Te ${korod} éves vagy!\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
