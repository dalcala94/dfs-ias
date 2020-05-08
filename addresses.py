import requests

url = 'https://maps.googleapis.com/maps/api/geocode/json'
params = {'sensor': 'false', 'address': 'Mountain View, CA'}
r = requests.get(url, params=params)
results = r.json()['results']

print(results)

location = results[0]['geometry']['location']
print(location['lat'], location['lng'])