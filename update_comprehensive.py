import re

with open('index.html', 'r') as f:
    content = f.read()

# SEO Replacements
content = content.replace("<title>Edward Kings Academy | Junior Secondary School, Jomvu, Mombasa</title>", "<title>Edward Kings Academy | Comprehensive School, Jomvu, Mombasa</title>")
content = content.replace('content="Edward Kings Academy is a school located in Jitoni, Jomvu in Mombasa offering quality education from PP1 to Junior Secondary School.', 'content="Edward Kings Academy is a comprehensive school located in Jitoni, Jomvu in Mombasa offering quality education from PP1 to Junior School.')
content = content.replace('content="Edward Kings Academy, mixed day school Jomvu, co-educational day school Mombasa, day school Jomvu, Edward Kings School, Edward Kings Junior School, Edward Kings Junior Secondary School, Jomvu, Jomvu-Jitoni, Mombasa, Kenya, primary school Jomvu, junior secondary school Jomvu"', 'content="Edward Kings Academy, comprehensive school Jomvu, mixed day school Jomvu, co-educational day school Mombasa, day school Jomvu, Edward Kings School, Edward Kings Junior School, Jomvu, Jomvu-Jitoni, Mombasa, Kenya, primary school Jomvu, junior school Jomvu"')
content = content.replace('content="Edward Kings Academy | Junior Secondary School, Jomvu, Mombasa"', 'content="Edward Kings Academy | Comprehensive School, Jomvu, Mombasa"')
content = content.replace('"alternateName": "Edward Kings Junior Secondary School",', '"alternateName": "Edward Kings Comprehensive School",')
content = content.replace('"description": "Edward Kings Academy is a school located in Jitoni, Jomvu in Mombasa. We offer a high-quality, modern, learner-centered educational experience from early years foundation through to junior secondary school.', '"description": "Edward Kings Academy is a comprehensive school located in Jitoni, Jomvu in Mombasa. We offer a high-quality, modern, learner-centered educational experience from early years foundation through to junior school.')

# UI Text Replacements
content = content.replace("Junior Secondary School", "Junior School")
content = content.replace("junior secondary school", "junior school")
content = content.replace("Junior Secondary Assessment", "Junior School Assessment")
content = content.replace("Junior Secondary Education", "Junior School Education")
content = content.replace("Junior Secondary Years", "Junior School Years")
content = content.replace(">Junior Secondary<", ">Junior School<")
content = content.replace("Junior Secondary Parent", "Junior School Parent")
content = content.replace("junior secondary study tracks", "junior school study tracks")
content = content.replace("Junior Secondary pathways", "Junior School pathways")

with open('index.html', 'w') as f:
    f.write(content)
print("Updated index.html")
