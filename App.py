from flask import Flask, request, jsonify, render_template
from datetime import datetime

app = Flask(__name__)

devices = []
next_id = 1

# 🔹 Página principal (frontend)
@app.route('/')
def home():
    return render_template('index.html')

# 🔹 Validación
def validar(data):
    campos = ["nombre", "tipo", "estado", "area"]
    for c in campos:
        if c not in data or not data[c]:
            return False, f"El campo '{c}' es obligatorio"
    return True, ""

# 🔹 GET ALL
@app.route('/devices', methods=['GET'])
def get_devices():
    return jsonify(devices)

# 🔹 GET ONE
@app.route('/devices/<int:id>', methods=['GET'])
def get_device(id):
    d = next((x for x in devices if x["id"] == id), None)
    if not d:
        return jsonify({"error": "No encontrado"}), 404
    return jsonify(d)

# 🔹 POST
@app.route('/devices', methods=['POST'])
def create():
    global next_id
    data = request.get_json()

    valido, msg = validar(data)
    if not valido:
        return jsonify({"error": msg}), 400

    nuevo = {
        "id": next_id,
        "nombre": data["nombre"],
        "tipo": data["tipo"],
        "estado": data["estado"],
        "area": data["area"],
        "fecha_registro": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    devices.append(nuevo)
    next_id += 1

    return jsonify(nuevo), 201

# 🔹 PUT
@app.route('/devices/<int:id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    d = next((x for x in devices if x["id"] == id), None)

    if not d:
        return jsonify({"error": "No encontrado"}), 404

    valido, msg = validar(data)
    if not valido:
        return jsonify({"error": msg}), 400

    d.update({
        "nombre": data["nombre"],
        "tipo": data["tipo"],
        "estado": data["estado"],
        "area": data["area"]
    })

    return jsonify(d)

# 🔹 DELETE
@app.route('/devices/<int:id>', methods=['DELETE'])
def delete(id):
    global devices
    d = next((x for x in devices if x["id"] == id), None)

    if not d:
        return jsonify({"error": "No encontrado"}), 404

    devices = [x for x in devices if x["id"] != id]

    return jsonify({"msg": "Eliminado"})

if __name__ == '__main__':
    app.run(debug=True)


