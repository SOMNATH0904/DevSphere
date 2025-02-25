"""
This file is a part of Internshala-bot Package. 
Github - https://github.com/Eviltr0N/internshala-bot
Written by - Mayank Lodhi
"""


import os
from rich import print

config_file = 'resume.ini'


if not os.path.exists(config_file):
    with open(config_file, 'w', encoding='latin-1') as file:
        file.write('\n#Enter your Skills Here \n\n')
        file.write('SKILLS = """\n\n\nPython, sql, PowerBi\n Azure, AWS, Google Cloud, Colorful Rain Cloud\nTime Management, Excellent Communication Skills etc.\n\n\n"""')

        file.write('\n\n#Enter Your Certificates and previous Internship Experiences here\n\n')
        file.write('CERTIFICATES = """\n\n\n1. Python basics by Microsoft\n2. Ai Essentials by Nvidia\n3. 6 Months AI & ML internship at Eviltron. etc\n\n\n"""')

        file.write('\n\n#Add your personal/professional projects here, enter name and describe it if you want.\n #You can you ChatGpt to summarize your project in points.\n\n')
        file.write('PROJECTS = """\n\n\n1. AI Chatbot\n* Created an AI chatbot using OpenAi api.\n*Designed an interactive UI for it using React.\n*Added support to talk with aliens form other galaxies.\n*Added inter galaxy translation.\n\n2. Face Recognition Bot \n* Created an face Recognition bot using Rust and Assembly. \n*Added advanced face Recognition capabilities to identify ghosts and aliens.\n* Added age detection feature to detect age of aliens and ghosts.\n\n\n"""')

        print('\nPlease Open [bold green]"resume.ini" [/]file using any text editor and add your [bold yellow]Skills, Certificates and Projects.[/] After adding those restart the script.\n')
        exit()


with open(config_file, 'r', encoding='latin-1', errors='ignore') as file:
    config_data = file.read().replace(";", "#")

try:
    exec(config_data)
except (IndentationError,SyntaxError) as e:
    print('[blod red]There is some indentation error with resume.ini file make sure you follow proper python indentation in resume.ini file.\n\nIt contains three multiline string variables. EDIT YOUR RESUME.INI FILE and RUN again. If you think you messed up everything then you can deleate the "resume.ini file and RUN again to recreate it then edit it."[/]')
    exit()

try:
    Skills = SKILLS
except:
    print("[bold red]Your skills dosent found in resume.ini file\n If you want to continue without skills press Enter else add skills and restart script.\n\n[/]")
    _ = input("Press Enter: ")
    Skills = '\nNO skills specified assume skills accordingly'

try:
    Certifications = CERTIFICATES
except:
    print("[bold red]Your Certifications dosent found in resume.ini file\n If you want to continue without Certifications press Enter else add skills and restart script.\n\n[/]")
    _ = input("Press Enter: ")
    Certifications = 'No certificates assume accordingly'


try:
    Projects = PROJECTS
except:
    print("[bold red]Your projects dosent found in resume.ini file\n If you want to continue without projects press Enter else add skills and restart script.\n\n[/]")
    _ = input("Press Enter: ")
    Projects = "No projects specified assume accordingly"


#======================================================================

def cover_letter_prompt_format(profile, company, about, skills):
    prompt=f'''
I want you to write a cover letter for an Remote Internship, \
I will provide you The internship description, their skill requirements. \
I will also give you my skills, my certifications, my projects. \
You have to understand the internship description and my whole portfolio then mention \
key things from my portfolio that are relavent to the internship description. \
Keep cover letter simple but effective. \
Use general Indian english so it looks like its written by human. \
Below My skills, certifications, projects and internship description, their skill requirements are attached. \
Dont use email formatting as I am not sending this in an email. \
Also Don't include header(such as Dear Hiring Manager... etc) and footer(such as Sincerly...etc). \
If my skill set lacks any of their skill requirement then assume that I possess that skill too. \


My Skills
```
{Skills}
```
Certifications
```
{Certifications}
```
My Projects
```
{Projects}
```

Internship Description
```
{profile}

{about}

Skills Required
{skills}
```
Company Name: {company}

Important - The letter must be less than 2000 characters.
'''
    return prompt

#====================================================================

def assignment_prompt_format(profile, company, about, skills, question):
    prompt=f'''
I am applying for an internship whose description is attached below and their skills requirement too. \
They are asking that `{question}` \
I have attached my skills, certifications, projects also. \
I want you to understand their requirements and their question and answer it accordingly while keeping in mind my portfolio. \
If they are asking about any working shift or relocation to other place then i am totally confortable in all situations. \
If they are asking that about scheduled classes, assignments, or exams in the next 6 months then I dont have any of those as I am recently graduated and I can devote my time fully on internship. \
Use general Indian english so it looks like its written by human & don't exhagurate your words. \
If my skill set lacks any of their skill requirement then assume that I possess that skill too. \
Keep Your answer to the point, short and precise.

My Skills
```
{Skills}
```
Certifications
```
{Certifications}
```
My Projects
```
{Projects}
```

Internship Description
```
{profile}

{about}

Skills Required
{skills}
```
Company Name: {company}

Important - In your response just give me answer following previous instructions and do not \
include question or any other text in you response besides answer of the question.
'''

    return prompt


def assignment_validation_prompt(profile, question):
    header='''

I am making a project which answers Internship Assignment Questions while applying for Internship Using an AI chatbot. The Ai chatbot has given My Personal portifolio which includes My Skills. Projects and Certification. It also given My working shifts and If I can relocate or not. I dont want that Ai chatbot will answer questions related to Personal things or related to information which is not inside the portfolio which is given to the Chatbot.You have to act as Moderator that I will give you question which will then passed to Ai chatbot, You have to check if the Question is related to :- 
`
Any personal information such as asking Grades/Percentages/CGPA.
If Question Contains any link/Url.
Asking question related Salary/Stipend.
Asking for LinkedIn/Github Profile Links.
Asking for Personal Achivements which are not related to Internshpi Profile.

`
If the question is related to above mention things then It should not answered by Ai chatbot and You have to Give Your Response In JSON Format. Here is Your Response Format - 
`
{
"send_to_chatbot": true / false,
"reason": Reason which thing is asked
}
`
Here are few Examples - 
Example - 1
"""
Profile - Data Analytics
Question - Candidates who have completed graduation or are in their last year of graduation (2024) would be considered for the internship. Please state your year of passing. Also, mention if you scored more than 70% in 10th, 12th, and graduation.
"""
Your Response Should be - 
""
{"send_to_chatbot": false, "reason":"Asking For Educational Details"}
""
Example - 2
"""
Profile - Machine Learning
Question - Provide us your Linkedin and Github.
"""
Your Response Should be - 
""
{"send_to_chatbot": false, "reason":"Asking For Linkedin/Github"}
""
Example - 3

"""
Profile - Machine Learning
Question - What will be the answer of this question https://docs.google.com/document/yup/sheisgorgeous.
"""
Your Response Should be - 
""
{"send_to_chatbot": false, "reason":"Contains Link"}
""
Example - 3

"""
Profile - Ai Engineer
Question - How do you ensure that you are aware of the latest trends, breakthroughs, and news in the field of artificial intelligence?.
"""
Your Response Should be - 
""
{"send_to_chatbot": true, "reason":""}
""

Example - 4

"""
Profile - Backend Engineer
Question - Have you posses any preoir experience in the same field? If yes please mention.
"""
Your Response Should be - 
""
{"send_to_chatbot": true, "reason":""}
""
'''

    footer = f'''
Now here is the question which you have to check - 
```
Profile - {profile}
Question -  {question}

```
Keep in mind you should only give response in desired format.
'''

    return header + footer
