"""
This file is a part of Internshala-bot Package. 
Github - https://github.com/Eviltr0N/internshala-bot
Written by - Mayank Lodhi
"""

import pandas as pd
import time
import os
from rich import print


class df_success:
    def __init__(self):
        columns = ["Sr. No", "Profile", "Company", "Applied On", "Skills", "Status", "link"]
        self.df = pd.DataFrame(columns=columns)
        self.sr_no = 0

    def add(self, profile, company, skills, status, link):
        self.sr_no += 1
        new_row = pd.DataFrame({
            "Sr. No": [self.sr_no],
            "Profile": [profile],
            "Company": [company],
            "Applied On": [time.strftime("%d-%B-%Y",time.localtime())],
            "Skills": [skills.replace("\n", "<br>")],
            "Status": [status],
            "link": [link]
        })
        self.df = pd.concat([self.df, new_row], ignore_index=True)
        
    def generate(self):
        self.df['Profile'] = self.df.apply(lambda row: f'<a href="{row["link"]}">{row["Profile"]}</a>', axis=1)
        html_table = self.df.drop(columns=['link']).to_html(index=False, escape=False)
        html_template = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Success Report</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }}
                table, th, td {{
                    border: thin solid #e0e0e0;
                }}
                th, td {{
                    padding: 12px;
                    text-align: left;
                }}
                th {{
                    background-color: #3b3041ed;
                    color: white;
                }}
                tr:nth-child(even) {{
                    background-color: #f2f2f2;
                }}
            </style>
        </head>
        <body>
            <h1>Successfull Application Report </h1> <h3><a href="https://github.com/Eviltr0N/internshala-bot">by Internshala_bot</a></h3>
            {html_table}
        </body>
        </html>
        """
        report_dir = os.path.join(os.getcwd() , 'reports')
        if not os.path.exists(report_dir):
            os.makedirs(report_dir)
        current_time = time.strftime("%H_%M_%d_%B")
        filename = f"SUCCESS_{current_time}.html"

        with open(os.path.join(report_dir, filename), 'w') as file:
            file.write(html_template)

        print("[bold green]Success Report Saved in: [/]", os.path.join(report_dir, filename))


class df_failed():
    def __init__(self):
        columns = ["Sr. No", "Profile", "Company", "Skills", "Reason", "Cover Letter", "link"]
        self.df = pd.DataFrame(columns=columns)
        self.sr_no = 0

    def add(self, profile, company, skills, reason, cover_letter, link):
        self.sr_no += 1
        new_row = pd.DataFrame({
            "Sr. No": [self.sr_no],
            "Profile": [profile],
            "Company": [company],
            "Skills": [skills.replace("\n", "<br>")],
            "Reason": [reason],
            "Cover Letter": [cover_letter.replace("\n", "<br>")],
            "link": [link]
        })
        self.df = pd.concat([self.df, new_row], ignore_index=True)

    def create_expandable_cover_letter(self,text):
        short_text = text[:100] + "..."
        return f'''
        <div class="cover-letter">
            <span class="short-text">{short_text}</span>
            <span class="full-text" style="display:none;">{text}</span>
            <button onclick="toggleCoverLetter(this)">Read More</button>
        </div>
        '''

        
    def generate(self):
        self.df['Profile'] = self.df.apply(lambda row: f'<a href="{row["link"]}">{row["Profile"]}</a>', axis=1)
        df_html = self.df.drop(columns=['link']).copy()
        df_html['Cover Letter'] = df_html['Cover Letter'].apply(self.create_expandable_cover_letter)
        html_table = df_html.to_html(index=False, escape=False)

        html_template = f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Failed to Apply Report</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }}
                    table {{
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }}
                    table, th, td {{
                        border: thin solid #e0e0e0;
                    }}
                    th, td {{
                        padding: 12px;
                        text-align: left;
                    }}
                    th {{
                        background-color: #3b3041ed;
                        color: white;
                    }}
                    tr:nth-child(even) {{
                        background-color: #f2f2f2;
                    }}
                    .cover-letter {{
                        position: relative;
                    }}
                    .cover-letter button {{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        background: none;
                        border: none;
                        color: blue;
                        cursor: pointer;
                        text-decoration: underline;
                    }}
                </style>
                <script>
                    function toggleCoverLetter(button) {{
                        var fullText = button.previousElementSibling;
                        var shortText = fullText.previousElementSibling;
                        if (fullText.style.display === "none") {{
                            fullText.style.display = "inline";
                            shortText.style.display = "none";
                            button.textContent = "Read Less";
                        }} else {{
                            fullText.style.display = "none";
                            shortText.style.display = "inline";
                            button.textContent = "Read More";
                        }}
                    }}
                </script>
            </head>
            <body>
               <h1>Failed to Apply Report </h1> <h3><a href="https://github.com/Eviltr0N/internshala-bot"> by Internshala_bot </a></h3>
                {html_table}
            </body>
            </html>

            """
        report_dir = os.path.join(os.getcwd(), "reports")
        if not os.path.exists(report_dir):
            os.makedirs(report_dir)
        current_time = time.strftime("%H_%M_%d_%B")
        filename = f"FAILED_{current_time}.html"

        with open(os.path.join(report_dir, filename), 'w') as file:
            file.write(html_template)

        print("[bold red]Failed Report Saved in: [/]", os.path.join(report_dir, filename))

