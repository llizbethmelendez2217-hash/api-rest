const API = "http://127.0.0.1:5000/devices";

document.addEventListener("DOMContentLoaded", () => {
    loadData();
    document.getElementById("btnGuardar").addEventListener("click", create);
    document.getElementById("btnActualizar").addEventListener("click", update);
});

async function loadData() {
    let res = await fetch(API);
    let data = await res.json();
    render(data);
}

function render(devices) {
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
            <td>${d.fecha_registro}</td>
            <td>
                <button onclick="edit(${d.id})">Editar</button>
                <button onclick="remove(${d.id})">Eliminar</button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function getData() {
    let file = document.getElementById("imagen").files[0];
    let img = "";

    if (file) {
        img = await getBase64(file);
    }

    return {
        nombre: document.getElementById("nombre").value,
        marca: document.getElementById("marca").value,
        tipo: document.getElementById("tipo").value,
        estado: document.getElementById("estado").value,
        area: document.getElementById("area").value,
        imagen: img
    };
}

async function create() {
    let data = await getData();

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    loadData();
}

async function edit(id) {
    let res = await fetch(`${API}/${id}`);
    let d = await res.json();

    document.getElementById("id").value = d.id;
    document.getElementById("nombre").value = d.nombre;
    document.getElementById("marca").value = d.marca;
    document.getElementById("tipo").value = d.tipo;
    document.getElementById("estado").value = d.estado;
    document.getElementById("area").value = d.area;
}

async function update() {
    let id = document.getElementById("id").value;
    let data = await getData();

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    loadData();
}

async function remove(id) {
    await fetch(`${API}/${id}`, {method: "DELETE"});
    loadData();
}
