let devices = [];

// 🔥 Cargar al iniciar
document.addEventListener("DOMContentLoaded", () => {
    loadData();

    document.getElementById("btnGuardar").addEventListener("click", create);
    document.getElementById("btnActualizar").addEventListener("click", update);
    document.getElementById("buscador").addEventListener("input", filtrar);
});


// 🔹 Cargar datos del navegador
function loadData() {
    let data = localStorage.getItem("devices");
    devices = data ? JSON.parse(data) : [];
    render();
}


// 🔹 Guardar en navegador
function saveData() {
    localStorage.setItem("devices", JSON.stringify(devices));
}


// 🔹 Mostrar tabla
function render() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    devices.forEach(d => {
        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${d.id}</td>
            <td>${d.nombre}</td>
            <td>${d.tipo}</td>
            <td>${d.estado}</td>
            <td>${d.area}</td>
            <td>${d.fecha}</td>
            <td>
                <button class="small btnEditar">Editar</button>
                <button class="small btnEliminar">Eliminar</button>
            </td>
        `;

        fila.querySelector(".btnEditar").addEventListener("click", () => edit(d));
        fila.querySelector(".btnEliminar").addEventListener("click", () => remove(d.id));

        tabla.appendChild(fila);
    });
}


// 🔹 Crear
function create() {
    let data = getData();

    if (!data.nombre) {
        alert("Ponle nombre bro 😅");
        return;
    }

    let nuevo = {
        id: Date.now(),
        ...data,
        fecha: new Date().toLocaleString()
    };

    devices.push(nuevo);
    saveData();
    render();
    clear();
}


// 🔹 Editar
function edit(d) {
    document.getElementById("id").value = d.id;
    document.getElementById("nombre").value = d.nombre;
    document.getElementById("tipo").value = d.tipo;
    document.getElementById("estado").value = d.estado;
    document.getElementById("area").value = d.area;
}


// 🔹 Actualizar
function update() {
    let id = document.getElementById("id").value;

    if (!id) return;

    let data = getData();

    devices = devices.map(d => 
        d.id == id ? { ...d, ...data } : d
    );

    saveData();
    render();
    clear();
}


// 🔹 Eliminar
function remove(id) {
    devices = devices.filter(d => d.id !== id);
    saveData();
    render();
}


// 🔹 Obtener datos
function getData() {
    return {
        nombre: document.getElementById("nombre").value,
        tipo: document.getElementById("tipo").value,
        estado: document.getElementById("estado").value,
        area: document.getElementById("area").value
    };
}


// 🔹 Limpiar
function clear() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("area").value = "";
}


// 🔹 Filtrar
function filtrar() {
    let input = document.getElementById("buscador").value.toLowerCase();
    let filas = document.querySelectorAll("#tabla tr");

    filas.forEach(fila => {
        let texto = fila.textContent.toLowerCase();
        fila.style.display = texto.includes(input) ? "" : "none";
    });
}
