let devices = [];

document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

// 🔹 Cargar datos
function loadData() {
    let data = localStorage.getItem("devices");
    devices = data ? JSON.parse(data) : [];
    render();
}

// 🔹 Guardar
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
            <td><img src="${d.imagen}" width="50"></td>
            <td>${d.nombre}</td>
            <td>${d.marca}</td>
            <td>${d.tipo}</td>
            <td>${d.estado}</td>
            <td>${d.area}</td>
            <td>${d.fecha}</td>
            <td>
                <button onclick="edit(${d.id})">Editar</button>
                <button onclick="remove(${d.id})">Eliminar</button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

// 🔹 Convertir imagen
function getBase64(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
    });
}

// 🔹 Obtener datos
async function getData() {
    let file = document.getElementById("imagen").files[0];
    let img = "";

    if (file) img = await getBase64(file);

    return {
        nombre: document.getElementById("nombre").value,
        marca: document.getElementById("marca").value,
        tipo: document.getElementById("tipo").value,
        estado: document.getElementById("estado").value,
        area: document.getElementById("area").value,
        imagen: img
    };
}

// 🔹 Crear
async function create() {
    let data = await getData();

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
function edit(id) {
    let d = devices.find(x => x.id == id);

    document.getElementById("id").value = d.id;
    document.getElementById("nombre").value = d.nombre;
    document.getElementById("marca").value = d.marca;
    document.getElementById("tipo").value = d.tipo;
    document.getElementById("estado").value = d.estado;
    document.getElementById("area").value = d.area;
}

// 🔹 Actualizar
async function update() {
    let id = document.getElementById("id").value;
    let data = await getData();

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

// 🔹 Limpiar
function clear() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("area").value = "";
}
