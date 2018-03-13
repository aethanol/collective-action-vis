import json
from collections import defaultdict

protests = defaultdict(int)

with open('protests.json') as f:
    d = json.load(f)
    for p in d:
        print(p['rptyy'])
        protests[p['rptyy']] += p['partict']

p_json = []

for year, par in protests.items():
    p_json.append({'year': year, 'parti': par})


with open('protest_years.json', 'w') as outfile:
    json.dump(p_json, outfile)
