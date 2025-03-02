with open('exampleprompt','r+') as readfile:
    with open("formatfile", "w") as writefile:
        for line in readfile:
            if not line.isspace():
                writefile.write(line)

readfile.close()
writefile.close()

summary = ""
risks = []

with open("formatfile", "r") as f:
    for line in f:
        print(line[0])
        match line[0]:
            case "@":
                break
            case "*":
                summary = line[1:len(line)-2]
            case "-":
                risk = []
                line = line[2:] # string without -
                line = line.split("$$") # list
                risk.append(line[0].strip()) # disaster name
                line = line[1].split("|")
                risk.append(line[0].strip()) # description
                risk.append(line[1].strip()) # suggestions
                risks.append(risk)

print(summary)
print(risks)
