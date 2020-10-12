import json
import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


state = {
    'users': [
        {
            'user_id': 1001,
            'username': 'paul',
            'name': 'Paul',
            'surname': 'Edwards',
            'password': 'letmein',
            'sudo': True
        },
        {
            'user_id': 1002,
            'username': 'oliver',
            'name': 'Oliver',
            'surname': 'Edwards',
            'password': 'letmein',
            'sudo': False
        },
    ]
}

@app.route('/api/users', methods = ['GET'])
def get_users():
    return { 'users': state['users'] }

@app.route('/api/users', methods = ['POST'])
def add_user():
    state['users'].append(json.loads(request.data.decode('utf8')))
    return {}, 200

@app.route('/api/users/<user_id>', methods = ['PUT'])
def mod_user(user_id):
    idx=-1
    for c, v in enumerate(state['users']):
        if v['user_id'] == int(user_id):
            idx = c
            break
    
    if idx == -1:
        return {}, 404

    newData = json.loads(request.data.decode('utf8'))
    for k in newData.keys():
        state['users'][idx][k] = newData[k]
        
    return {}, 200

@app.route('/api/users/<user_id>', methods = ['DELETE'])
def del_user(user_id):
    idx=-1
    for c, v in enumerate(state['users']):
        if v['user_id'] == int(user_id):
            idx = c
            break
    
    if idx == -1:
        return {}, 404

    state['users'].pop(idx)
    return {}, 200
