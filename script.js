async function entrar() {
    const clave = document.getElementById("clave").value;
    const msg = document.getElementById("msg");

    const res = await fetch("/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clave })
    });

    const data = await res.json();

    if (!data.ok) {
        msg.textContent = data.msg;
        return;
    }

    // guardar sesión
    localStorage.setItem("sesionActiva", "true");

    window.location.href = "panel.html";
}