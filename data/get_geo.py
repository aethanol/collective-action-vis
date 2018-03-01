import pandas as pd
import json

# build a map of city to geolocation
locations = {}
d = pd.read_csv('locations.csv', dtype={"city": str, "state": str, "latitude": float, "longitude": float})
for i, row in d.iterrows():
    locations['{},{}'.format(row['city'], row['state'])] = [row['longitude'], row['latitude']]

# init an array to store the list of protests
protests = []
df = pd.read_csv('protests_in_person.csv')
for index, row in df.iterrows():
    if row['rptdd'] is 0 or row['rptdd'] is None or row['rptdd'] is " ":
        row['rptdd'] = 1
    p = {'id': int(row["eventid"]),
         'rptmm': int(row['rptmm']),
         'rptdd': int(row['rptdd']),
         'rptyy': int(row['rptyy']),
         'title': str(row['title']),
         'city': str(row['city1']),
         'state': str(row['state1']),
         'who': str(row['who']),
         'what': str(row['what']),
         'where': str(row['where']),
         'against': str(row['against']),
        #  'particex': int(row['particex']),
         'partict': int(row['partict'])
        }
    # get the latitude and longitude from our lookup file
    key = '{},{}'.format(p['city'], p['state'])
    if key in locations:    
        p['location'] = str(locations[key])
        protests.append(p)

print("loaded {} protest events".format(len(protests)))
# if we got here, dump the locations to json
with open('protests.json', 'w') as outfile:
    json.dump(protests, outfile)