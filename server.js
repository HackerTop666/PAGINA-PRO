const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// 🔑 Verificar llave
app.post("/verificar", (req, res) => {
    const { clave } = req.body;

    let data = JSON.parse(fs.readFileSync("llaves.json"));

    let llave = data.find(l => l.clave === clave);

    if (!llave) {
        return res.json({ ok: false, msg: "Clave inválida" });
    }

    if (llave.usada) {
        return res.json({ ok: false, msg: "Clave ya usada" });
    }

    // marcar como usada
    llave.usada = true;

    fs.writeFileSync("llaves.json", JSON.stringify(data, null, 2));

    res.json({ ok: true });
});

app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor corriendo en:");
    console.log("→ http://localhost:3000");
    console.log("→ http://192.168.64.142:3000");  // tu IP
});