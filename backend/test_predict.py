import requests

url = 'http://localhost:8000/predict'
file_path = '../dataset/real/0000.jpg'

try:
    with open(file_path, 'rb') as f:
        response = requests.post(url, files={'file': ('0000.jpg', f, 'image/jpeg')})
    
    print('STATUS', response.status_code)
    try:
        data = response.json()
        print('KEYS', list(data.keys()))
        print('LABEL', data.get('label'))
        print('CONFIDENCE', data.get('confidence'))
    except Exception as je:
        print('JSON ERROR', je)
        print('TEXT', response.text)
except Exception as e:
    print('ERROR', e)
