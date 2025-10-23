export async function loadComponent(path) {
    const res = await fetch(path);
    const html = await res.text();
    const tpl = document.createElement("template");
    tpl.innerHTML = html;

    // Inyectar <template> en el documento
    document.body.appendChild(tpl);

    // Ejecutar el <script> interno del componente
    const script = tpl.content.querySelector("script");
    if (script) {
        const code = script.textContent;
        const blob = new Blob([code], { type: "text/javascript" });
        const moduleUrl = URL.createObjectURL(blob);
        await import(moduleUrl);
    }
}
