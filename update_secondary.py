import re

with open('index.html', 'r') as f:
    content = f.read()

# Replacements
content = content.replace("Junior & Secondary Schools", "Junior Secondary School")
content = content.replace("Junior & Secondary", "Junior Secondary")
content = content.replace("Edward Kings Secondary School", "Edward Kings Junior Secondary School")
content = content.replace("secondary school Jomvu", "junior secondary school Jomvu")
content = content.replace("to Secondary School", "to Junior Secondary School")
content = content.replace("to secondary school", "to junior secondary school")
content = content.replace("Secondary Education", "Junior Secondary Education")
content = content.replace("Secondary Years", "Junior Secondary Years")
content = content.replace("standard secondary study tracks transitioning into Junior and Senior Secondary stages", "standard junior secondary study tracks")
content = content.replace("Secondary Pathways", "Junior Secondary Pathways")

with open('index.html', 'w') as f:
    f.write(content)
print("Done")
