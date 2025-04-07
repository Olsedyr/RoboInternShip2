from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    return jsonify({
        "timestamps": ["12:00", "12:01", "12:02"],
        "values": [10, 20, 30]
    })

@app.route('/api/control', methods=['POST'])
def control():
    return jsonify({"success": True, "message": "Command received"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)