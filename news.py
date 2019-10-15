import requests
url = ('https://newsapi.org/v2/top-headlines?'
       'country=us&'
       'apiKey=32da0e5f7f6f418ba0dc4ad64e712c4c')
response = requests.get(url)
print response.json()
