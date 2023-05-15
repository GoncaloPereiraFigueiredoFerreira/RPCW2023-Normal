import json


  
# Opening JSON file
f = open('emprego-cientifico.json',"r",encoding="UTF-8")
f2 = open("emprego-cientifico2.json","w",encoding="UTF-8")
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
counter = 0
for i in data:
    i["id"] = counter
    counter +=1

f2.write(json.dumps(data))

# Closing file
f.close()