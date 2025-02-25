"""
This file is a part of Internshala-bot Package. 
Github - https://github.com/Eviltr0N/internshala-bot
Written by - Mayank Lodhi
"""

from undetected_playwright.sync_api import sync_playwright, TimeoutError
import json
import os
import time
from .resume_handler import Skills, Certifications, Projects, cover_letter_prompt_format, assignment_prompt_format, assignment_validation_prompt



class chat:
    def __init__(self, browser_inst):
        self.main_page_url = "https://chatgpt.com/?model=auto"
        self.cover_letter_url = None
        self.assignment_url = None
        self.gpt_check_asg_url = None
        config_dir = os.path.join(os.getcwd(), '.config')
        self.gpt_state_conf = os.path.join(config_dir, 'chat_gpt_state.json')
        self.page = browser_inst.new_page()

    def get_cover_letter(self, profile, company, about, skills):
        prompt = cover_letter_prompt_format(profile, company, about, skills)
        if self.cover_letter_url is None:
            try:
                self.page.goto(self.main_page_url , timeout=30000, wait_until='networkidle')
            except TimeoutError as e:
                print(f"[red]TimeOut while loading {self.main_page_url} webpage... Trying Again[/]")
                try:
                    self.page.goto(self.main_page_url , timeout=30000, wait_until='networkidle')
                except TimeoutError as e:
                    print('\n[bold red]Timeout Occured at get_cover_letter while loading {self.main_page_url}, Please check your network and Try again.\n[/]')
                    exit()
        else:
            try:
                self.page.goto(self.cover_letter_url , timeout=30000, wait_until='networkidle')
            except TimeoutError as e:
                print(f"[red]TimeOut while loading {self.cover_letter_url} webpage... Trying Again[/]")
                try:
                    self.page.goto(self.cover_letter_url , timeout=30000, wait_until='networkidle')
                except TimeoutError as e:
                    print('\n[bold red]Timeout Occured at get_cover_letter while loading {self.cover_letter_url}, Please check your network and Try again.\n[/]')
                    exit()
        self.page.wait_for_selector('textarea#prompt-textarea', state='visible')
        self.page.locator('textarea#prompt-textarea').fill(prompt)
        time.sleep(2)
        self.page.locator('[data-testid="send-button"]').click()
        print('Generating Cover Letter...')
        time.sleep(10)
        while self.page.locator('[data-testid="stop-button"]').is_visible():
            time.sleep(2)
        resp = self.page.locator('div.text-base').all()[-3].inner_text()
        resp = resp.replace("ChatGPT\nMemory updated\n\n", "").replace("ChatGPT\n\n", "").replace("\n\n4o mini", "").replace("\n\n4o","").replace("\nIs this conversation helpful so far?", "").replace('Which response do you prefer?\nYour choice will help make ChatGPT better.\nChatGPT\nResponse 1', "").replace('ChatGPT\nResponse 2', '')
        if len(resp) > 2048:
            cover_lt=''
            for x in resp.split("."):
                if len(cover_lt) + len(x) + 1 <= 2000:
                    cover_lt += x + "."
                else:
                    break
        else:
            cover_lt = resp
        
        self.cover_letter_url = self.page.url
        self.page.context.storage_state(path=self.gpt_state_conf)
        return cover_lt


    def get_assignment_answer(self, profile, company, about, skills, question):
        prompt = assignment_prompt_format(profile, company, about, skills, question)

        if self.assignment_url is None:
            try:
                self.page.goto(self.main_page_url , timeout=30000, wait_until='networkidle')
            except TimeoutError as e:
                print(f"[red]TimeOut while loading {self.main_page_url} webpage... Trying Again[/]")
                try:
                    self.page.goto(self.main_page_url , timeout=30000, wait_until='networkidle')
                except TimeoutError as e:
                    print('\n[bold red]Timeout Occured at get_assignment_answer while loading {self.main_page_url}, Please check your network and Try again.\n[/]')
                    exit()
        else:
            try:
                self.page.goto(self.assignment_url , timeout=30000, wait_until='networkidle')
            except TimeoutError as e:
                print(f"[red]TimeOut while loading {self.assignment_url} webpage... Trying Again[/]")
                try:
                    self.page.goto(self.assignment_url , timeout=30000, wait_until='networkidle')
                except TimeoutError as e:
                    print('\n[bold red]Timeout Occured at get_assignment_answer while loading {self.assignment_url}, Please check your network and Try again.\n[/]')
                    exit()

        self.page.wait_for_selector('textarea#prompt-textarea', state='visible')
        self.page.locator('textarea#prompt-textarea').fill(prompt)
        time.sleep(1)
        self.page.locator('[data-testid="send-button"]').click()
        time.sleep(5)
        print('Solving assignment...')
        while self.page.locator('[data-testid="stop-button"]').is_visible():
            time.sleep(2)
        resp = self.page.locator('div.text-base').all()[-3].inner_text()
        resp = resp.replace("ChatGPT\nMemory updated\n\n", "").replace("ChatGPT\n\n", "").replace("\n\n4o mini", "").replace("\n\n4o","").replace("\nIs this conversation helpful so far?", "").replace('Which response do you prefer?\nYour choice will help make ChatGPT better.\nChatGPT\nResponse 1', "").replace('ChatGPT\nResponse 2', '')
        self.assignment_url = self.page.url
        self.page.context.storage_state(path=self.gpt_state_conf)
        return resp

    def assmnt_is_valid(self, profile, question):
        prompt = assignment_validation_prompt(profile, question)
        if self.gpt_check_asg_url is None:
            try:
                self.page.goto(self.main_page_url , timeout=30000, wait_until='networkidle')
            except TimeoutError as e:
                print(f"[red]TimeOut while loading {self.main_page_url} webpage... Trying Again[/]")
                try:
                    self.page.goto(self.main_page_url , timeout=30000, wait_until='networkidle')
                except TimeoutError as e:
                    print('\n[bold red]Timeout Occured at assmnt_is_valid while loading {self.main_page_url}, Please check your network and Try again.\n[/]')
                    exit()
        else:
            try:
                self.page.goto(self.gpt_check_asg_url , timeout=30000, wait_until='networkidle')
            except TimeoutError as e:
                print(f"[red]TimeOut while loading {self.gpt_check_asg_url} webpage... Trying Again[/]")
                try:
                    self.page.goto(self.gpt_check_asg_url , timeout=30000, wait_until='networkidle')
                except TimeoutError as e:
                    print('\n[bold red]Timeout Occured at assmnt_is_valid while loading {self.gpt_check_asg_url}, Please check your network and Try again.\n[/]')
                    exit()

        self.page.wait_for_selector('textarea#prompt-textarea', state='visible')
        self.page.locator('textarea#prompt-textarea').fill(prompt)
        time.sleep(1)
        self.page.locator('[data-testid="send-button"]').click()
        print('Checking if assignment is answerable or not...')
        time.sleep(5)
        while self.page.locator('[data-testid="stop-button"]').is_visible():
            time.sleep(2)
        resp = self.page.locator('div.text-base').all()[-3].inner_text()
        resp = resp.replace("ChatGPT\nMemory updated\n\n", "").replace("ChatGPT\n\n", "").replace("\n\n4o mini", "").replace("\n\n4o","").replace("\nIs this conversation helpful so far?", "").replace("ChatGPT\njson\nCopy code\n", "").replace('Which response do you prefer?\nYour choice will help make ChatGPT better.\nChatGPT\nResponse 1', "").replace('ChatGPT\nResponse 2', '')
        self.gpt_check_asg_url = self.page.url
        self.page.context.storage_state(path=self.gpt_state_conf)
        try:
            return json.loads(resp)
        except Exception as e:
            print(f'[bold red]Something went wrong While validating assignment: [/]{e}')
            print("By default sending question to ChatGPT")
            return {"send_to_chatbot":True, "reason":""}

