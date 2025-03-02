import re

class PromptParser:
    def __init__(self, prompt):
        self.prompt = prompt

        with open("promptfile", "w") as writefile:
            writefile.write(self.prompt)

        # Eliminate empty spaced between lines
        with open("promptfile",'r+') as readfile:
            with open("formatfile", "w") as writefile:
                for line in readfile:
                    if not line.isspace():
                        writefile.write(line)

        readfile.close()
        writefile.close()

        self.summary = ""
        self.risks = []

        # parse out risk name
        with open("formatfile", "r") as f:
            for line in f:
                print(line[0])
                match line[0]:
                    case "@":
                        break
                    case "*":
                        self.summary = line[1:len(line)-2]
                    case "-":
                        # try:
                            # risk = []
                            # line = line[2:] # string without -
                            # testline = line.split("$$") # list;
                            # if len(testline) == len(line):
                            #     testline = line.split("$")
                            # line = testline
                            # risk.append(line[0].strip()) # disaster name
                            # line = line[len(line)-1].split("|")
                            # risk.append(line[0].strip()) # description
                            # risk.append(line[1].strip()) # suggestions
                            # self.risks.append(risk)

                        self.tokens = re.findall("^- ?([^$]*) ?\$\$? ?([^\|\.]*)\.? ?\| ?(.*).$", line)[0]
                        print(self.tokens)
                        self.risks.append([self.tokens[0], self.tokens[1], self.tokens[2]])

                        # except:

                        #     self.summary = ""
                        #     self.risks = []
                        #     break

    def get_summary(self):
        return self.summary

    def get_risks(self):
        return self.risks

if __name__ == "__main__":
    pass
