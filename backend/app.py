from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from pymodbus.client import ModbusTcpClient

app = Flask(__name__, static_folder="static")
CORS(app)



@app.route('/api/control', methods=['POST'])
def control():
    data = request.get_json()
    # Process the value (e.g., send it to the PLC via Modbus)
    # For now, we'll just log it and return success.
    print("Received control value:", data.get('value'))
    return jsonify({'success': True, 'newValue': data.get('value')})


@app.route("/api/data", methods=["GET"])
def get_data():
    client = ModbusTcpClient("192.168.0.10")  # replace with your PLC IP
    client.connect()
    result = client.read_holding_registers(0, 2)
    client.close()
    if result.isError():
        return jsonify({"error": "Failed to read registers"}), 500
    return jsonify({"value": result.registers})

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
