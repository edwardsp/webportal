import json
import time
from flask import Flask, request

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

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


def tail(fname, lines=500):
    f = open(fname, 'rb')
    
    total_lines_wanted = lines

    BLOCK_SIZE = 1024
    f.seek(0, 2)
    block_end_byte = f.tell()
    lines_to_go = total_lines_wanted
    block_number = -1
    blocks = []
    while lines_to_go > 0 and block_end_byte > 0:
        if (block_end_byte - BLOCK_SIZE > 0):
            f.seek(block_number*BLOCK_SIZE, 2)
            blocks.append(f.read(BLOCK_SIZE))
        else:
            f.seek(0,0)
            blocks.append(f.read(block_end_byte))
        lines_found = blocks[-1].count(b'\n')
        lines_to_go -= lines_found
        block_end_byte -= BLOCK_SIZE
        block_number -= 1
    all_read_text = b''.join(reversed(blocks))
    return b'\n'.join(all_read_text.splitlines()[-total_lines_wanted:])

@app.route('/api/logs/<log>', methods = ['GET'])
def get_log(log):
    length = int(request.args.get('tail', 500))
    if log == 'autoscale':
        logdata = tail('/var/log/dpkg.log', lines=length)
    else:
        return {}, 404
    return { "log": logdata.decode('utf8') }, 200
