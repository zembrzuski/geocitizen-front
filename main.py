from flask import Flask
from flask import send_file
from flask import request
from flask import Flask, jsonify, request
import requests
import json

app = Flask(__name__)


@app.route('/proxy_pass')
def proxy_pass():
    path = request.args.get('path')
    url = 'http://localhost:8080/' + path
    answer = requests.get(url).json()
    return jsonify(answer)

@app.route('/get_file/<file>')
def get_file(file):
    return send_file('static/' + file)

@app.route('/map/<track>')
def send_js(track):
    return send_file('static/index.html')

@app.route('/user/<track>')
def send_user(track):
    return send_file('static/index.html')

if __name__ == "__main__":
    app.run(debug=True)
