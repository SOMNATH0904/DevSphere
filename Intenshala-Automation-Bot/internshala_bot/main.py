"""
This file is a part of Internshala-bot Package. 
Github - https://github.com/Eviltr0N/internshala-bot
Written by - Mayank Lodhi
"""

from undetected_playwright.sync_api import sync_playwright, TimeoutError
import os
import time
import argparse
import requests
from requests_html import HTML
from rich.progress import track
from rich import print
from rich.theme import Theme
from .chat_gpt import chat
from .generate_report import df_failed, df_success



class internshala:
    def __init__(self, browser):
        self.profile = None
        self.company = None
        self.skills = None
        self.about = None
        self.internship_id = None
        self.int_browser = None
        self.gpt_browser = None
        self.browser = browser
        self.scn_size = {"width":800, "height":800}

        config_dir = os.path.join(os.getcwd(), '.config')
        if not os.path.exists(config_dir):
            os.makedirs(config_dir)
        self.intern_state_conf = os.path.join(config_dir, 'internshala_state.json')
        self.gpt_state_conf = os.path.join(config_dir, 'chat_gpt_state.json')

        if not os.path.exists(self.intern_state_conf):
            print("[bold yellow]Please log-in to your Internshala Account[/]\n")
            self.login_internshala()
        else:
            self.int_browser = self.browser.new_context(storage_state=self.intern_state_conf,
            viewport=self.scn_size,
            )

        if not os.path.exists(self.gpt_state_conf):
            print('[bold yellow]Please log-in to your ChatGPT Account[/]\n')
            self.login_chat_gpt()
        else:
            current_time = time.time()
            creation_time = os.path.getctime(self.gpt_state_conf)
            file_age_hours = (current_time - creation_time) / 3600
            if file_age_hours > 3:
                os.remove(self.gpt_state_conf)
                print('[bold yellow]Please log-in to your ChatGPT Account[/]\n')
                self.login_chat_gpt()
            else:
                self.gpt_browser = self.browser.new_context(storage_state=self.gpt_state_conf,
                viewport=self.scn_size,
                )
                

    def login_internshala(self):
        page = self.browser.new_page()
        page.goto('https://internshala.com/login/user', timeout=60000, wait_until='networkidle')
        dash_url = 'https://internshala.com/student/dashboard'
        start_time = time.time()
        while page.url != dash_url and not page.locator('div.profile_icon_right').is_visible():
            time.sleep(1)
            if time.time() - start_time > 240:
                print("[bold red]Timeout... Please Restart The script to login again.[/]\n")
                exit()

        storage = page.context.storage_state(path=self.intern_state_conf)
        self.int_browser = self.browser.new_context(storage_state=self.intern_state_conf)
        print('[bold green]Internshala Login Successful Closing Browser in 5 Seconds...[/]\n')
        time.sleep(4)
        page.close()
        
    def login_chat_gpt(self):
        page = self.browser.new_page()
        try:
            page.goto('https://chat.openai.com' , timeout=30000, wait_until='networkidle')
        except TimeoutError as e:
            print("[red]TimeOut while loading ChatGPT webpage... Trying Again[/]")
            try:
                page.goto('https://chat.openai.com' , timeout=30000, wait_until='networkidle')
            except TimeoutError as e:
                print('\n[bold red]Timeout Occured while loading https://chatgpt.com, Please check your network and Try again.\n[/]')
                exit()
        time.sleep(1)
        try:
            with page.expect_navigation():
                page.locator('[data-testid="login-button"]').click()
        except:
            print("[bold yellow]Click on Login button and Login using Your Emali and Password...\n[/]")
        start_time = time.time()
        while not page.locator('[data-testid="profile-button"]').is_visible():
            time.sleep(1)
            if time.time() - start_time > 180:
                print("[bold red]Timeout... Please Restart The script to login again.[/]\n")
                exit()

        storage = page.context.storage_state(path=self.gpt_state_conf)
        self.gpt_browser = self.browser.new_context(storage_state=self.gpt_state_conf)
        print('[bold green]ChatGPT Login Successful Closing Browser in 5 Seconds...[/]\n')
        time.sleep(4)
        page.close()

    def get_internship_info(self, url):
        self.intshp_url = url
        self.page = self.int_browser.new_page()
        self.page.goto(url, timeout=60000, wait_until='networkidle')
        if self.page.get_by_text("Custom job").is_visible():
            self.page.locator('//*[@id="close_popup"]').click()

        self.internship_id = self.page.locator('div[id^="individual_internship"]').first.get_attribute('internshipid')
        self.profile = self.page.locator(f'#individual_internship_{self.internship_id} > div.internship_meta > div.individual_internship_header > div.company > div.heading_4_5.profile').inner_text()
        self.company = self.page.locator(f'#individual_internship_{self.internship_id} > div.internship_meta > div.individual_internship_header > div.company > div.heading_6.company_name > div > a').inner_text()
        self.about = self.page.locator(f'#details_container > div.detail_view > div.internship_details > div:nth-child(2)').inner_text()
        round_tabs_count = self.page.locator('.round_tabs_container').count()
        skills_loc = self.page.locator('.round_tabs_container').first
        if skills_loc.is_visible() and round_tabs_count >= 2:
            skills_lis = skills_loc.locator('.round_tabs').all_inner_texts()
            self.skills = ""
            for x in skills_lis:
                self.skills+= f"{x}\n"
        else:
            self.skills = "`Company dosent mentioned perticular skills, assume skills according to Internship Description`"
        if self.page.get_by_role("button", name="Already Applied").is_visible():
            print("[bold yellow]Already applied: [/]", self.page.url)
            self.page.close()
            return True
        else:
            apply_button = self.page.get_by_role("button", name="Apply now")
            apply_button.click()
            self.page.wait_for_selector('//*[@id="cover_letter_holder"]/div[1]', state='visible')
            return False
        self.page.context.storage_state(path=self.intern_state_conf)
    
    def fill_app_form(self, GPT, success, failed, validate_assignment_question):
        if self.page.url == 'https://internshala.com/student/resume?detail_source=resume_intermediate':
            self.page.locator('#layout_table > div.proceed-btn-container > button').click()

        cover_letter = self.page.locator('//*[@id="cover_letter_holder"]/div[1]')
        self.cover = GPT.get_cover_letter(self.profile, self.company, self.about, self.skills)
        cover_letter.fill(self.cover)
        assignments = self.page.locator('.form-group.additional_question')
        count = assignments.count()
        print('Total assignments: ', f'[bold green]{count}[/]\n')
        self.que_text = None
        for x in range(count):
            self.que_text = assignments.nth(x).locator("div.assessment_question > label").inner_text()
            if validate_assignment_question:
                res = GPT.assmnt_is_valid(self.profile, self.que_text)
                if res["send_to_chatbot"]:        
                    self.answer = GPT.get_assignment_answer(self.profile, self.company, self.about, self.skills, self.que_text)
                    print("[green]Assignment Sent to ChatGPT...[/]\n",)
                else:
                    failed.add(self.profile, self.company, self.skills, res["reason"], self.cover, self.intshp_url)
                    print("[bold red]YOU HAVE TO MANUALLY APPLY TO THIS INTERNSHIP[/]\n" )
                    print("[bold yellow]Reason: [/]", f'{res["reason"]}\n')
                    self.page.close()
                    return False
            else:
                print('[green]No validation Assignment directly sent to GPT[/]')
                self.answer = GPT.get_assignment_answer(self.profile, self.company, self.about, self.skills, self.que_text)
            
            ans_loc = assignments.nth(x).locator('textarea[id^="text_"]')
            ans_loc.fill(self.answer)
        submit_loc = self.page.locator('//*[@id="submit"]')
        success.add(self.profile, self.company, self.skills, "Applied", self.intshp_url)
        submit_loc.click()
        self.page.wait_for_selector('#similar_job_modal > div > div > div.modal-body > div > div > div > div > div.text-heading', state='visible')
        self.page.context.storage_state(path=self.intern_state_conf)
        print('[bold green]Successfully Applied at: [/]', self.page.url)
        self.page.close()
        
 
    def update_resume_skills(self):
        cookies = self.page.context.cookies()
        for x in cookies:
            if x["name"]=="csrf_cookie_name":
                csrf = x
        
        cookie_names = ['AWSALBCORS', 'l', 'lc', 'lv', 'PHPSESSID', "csrf_cookie_name"]
        req_cookies = {cookie['name']: cookie['value'] for cookie in cookies if cookie['name'] in cookie_names}
        
        headers = {

            'Sec-Ch-Ua': '"Not(A:Brand";v="24", "Chromium";v="122"',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Origin': 'https://internshala.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://internshala.com/student/resume?detail_source=resume_direct',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Priority': 'u=1, i'
            }

        url = 'https://internshala.com/student/skills_submit'
        skill_list = self.skills.split("\n")
        _ = skill_list.pop(-1)
        print('[bold green]Adding Required Skills into Intternshala Resume...[/]\n')
        for skill_name in skill_list:
            data = {
                    'skill_name': skill_name,  
                    'add_skill_from': 'student_profile_form',
                    'skill_level': 'Intermediate',
                    'csrf_test_name': req_cookies["csrf_cookie_name"]
                }
            res = requests.post(url, headers=headers, cookies=req_cookies, data=data)
            if res.json()["success"] == False:
                print(skill_name, f'[red]{res.json()["errorThrown"]}[/]' )
            else:
                print(skill_name, "[green]Added Successfully[green]")
            req_cookies = res.cookies

        csrf.update({"value": req_cookies["csrf_cookie_name"]})
        self.page.context.add_cookies([csrf])

    @staticmethod
    def check_hiring_stats(url):
        res = requests.get(url)
        html = HTML(html=res.text)
        try:
            opp = int(html.find("#details_container > div.detail_view > div.internship_details > div.activity_section > div.activity_container > div:nth-child(2) > div")[0].text.split(" ")[0])
        except IndexError as e:
            print(html.xpath("/html/body/div[1]/div[20]/div/p")[0].text)
            opp = 0
        try:
            cand = int(html.find("#details_container > div.detail_view > div.internship_details > div.activity_section > div.activity_container > div:nth-child(3) > div")[0].text.split(" ")[0])
        except IndexError as e:
            cand = 0
        if opp > 10 and cand <= 1:
            should_apply = False
        else:
            should_apply = True
        return {"posted": opp, "hired":cand, "should_apply": should_apply}

    @staticmethod
    def get_interns_list(url):
        res= requests.get(url)
        html = HTML(html=res.text)
        curr_page = int(html.find('#pageNumber', first=True).text)
        total_page =  int(html.find('#total_pages', first=True).text)
        isp_list=[]
        for x in range(curr_page, total_page+1):
            new_url = url+f"page-{x}/"
            res= requests.get(new_url)
            html = HTML(html=res.text)
            data_hrefs = [element.attrs.get('data-href', '') for element in html.find('div.individual_internship') if 'data-href' in element.attrs]
            profiles = [x.text for x in html.find(".job-internship-name") ]
            for ind, x in enumerate(profiles):
                isp_list.append({
                                "link": f"https://internshala.com{data_hrefs[ind]}",
                                "profile": x
                                })
        return isp_list

    @staticmethod
    def get_final_links(filter_page_url, additional_filters=None):
        all_internships = internshala.get_interns_list(filter_page_url)
        filter_from_url = filter_page_url.split("/")[4].replace("job", "internship").split("-internship")[0].replace("work-from-home-", "").replace("part-time-", "").replace(",", "-").split("-")
        internship_filters = filter_from_url
        if additional_filters != None:
            for x in additional_filters:
                for c in x.lower().split(" "):
                    internship_filters.append(c)
        print("Filtering Internships for: ", internship_filters)
        filtered_urls = []
        for x in track(all_internships, description="Fetching Internships"):
            for elem in x["profile"].lower().split(" "):
                if elem in internship_filters and x["link"] not in filtered_urls:
                    res = internshala.check_hiring_stats(x["link"])
                    if res["should_apply"]:
                        filtered_urls.append(x["link"])
        return filtered_urls


def main():

    parser = argparse.ArgumentParser(description='A program to automate Internship Application process on Internshala using ChatGPT. \n\nSee full Guide on Github: https://github.com/Eviltr0N/internshala-bot/')
    parser.add_argument('url', nargs='*', help='Enter url of search page of Internshala After applying desired filters or url of Single Internship detail page')
    parser.add_argument('-f', '--filters', '-filters', '--filter', nargs='*', default=[],dest='filters', metavar='Internship_Roles' , help='You can specify additional role filter for Internship which are not available in internshala filter Such as HTML developer, Linux Specilist etc')
    parser.add_argument('--skip_assignment_validation', '--skip', dest='skip',action='store_false', help="This flag is used to disable assignment validation check which is used to check if any personal information is asked in Assignment Question.")

    arguments = parser.parse_args()

    validate_assignment_question = arguments.skip #Must be true to validate assignment question
    additional_filters = arguments.filters
    urls = arguments.url
    links=[]
    if len(urls) == 0:
        print("\nPlease Enter a url of search page of Internshala After applying desired filters or url of Single Internship detail page \n\nYou can either enter url of search page of Internshala After applying desired filters \n[bold yellow]Example[/]: https://internshala.com/internships/work-from-home/ \n\n     OR     \n\nYou can enter single/multiple urls of Individual Internship detail page seperated by spaces \n[bold yellow]Example[/]: \nFor Individual Internship: \nhttps://internshala.com/internship/detail/x-y-z \n\nFor Multiple Individual Internships: \nhttps://internshala.com/internship/detail/a-b-c https://internshala.com/internship/detail/x-y-z https://internshala.com/internship/detail/s-h-e \n\nFull Guide on Github - https://github.com/Eviltr0N/internshala-bot?tab=readme-ov-file#how-to-use")
        exit()
    if len(urls) > 1:
        for url in urls:
            if url.find("internshala.com/internship/detail/") != -1 or url.find("internshala.com/internship/details/") != -1:
                links.append(url)
            elif url.find("internshala.com/internships/") != -1:
                print("[bold red]Please Don't Combine[/] Single Internship url [bold red]with[/] Multiple Internship Search page url. \n\nYou can either enter url of search page of Internshala After applying desired filters \n[bold yellow]Example[/]: https://internshala.com/internships/work-from-home/ \n\n     OR     \n\nYou can enter single/multiple urls of Individual Internship detail page seperated by spaces \n[bold yellow]Example[/]: \nFor Individual Internship: \nhttps://internshala.com/internship/detail/x-y-z \n\nFor Multiple Individual Internships: \nhttps://internshala.com/internship/detail/a-b-c https://internshala.com/internship/detail/x-y-z https://internshala.com/internship/detail/s-h-e \n\nFull Guide on Github - https://github.com/Eviltr0N/internshala-bot?tab=readme-ov-file#how-to-use")
                exit()
            else:
                print("[bold red]Invalid url: [/]", url)
    else:
        if urls[0].find("internshala.com/internship/detail") != -1 or urls[0].find("internshala.com/internship/details") != -1:
            links.append(urls[0])
        elif urls[0].find("internshala.com/internships/") != -1:
            url=urls[0]
        else:
            print("[bold red]Please Enter a valid url of Internshala's Search page or Internship Page such as [/]https://internshala.com/internships/work-from-home/, or https://internshala.com/internship/detail/ \n\nFull Guide on Github - https://github.com/Eviltr0N/internshala-bot?tab=readme-ov-file#how-to-use")
            exit()
    
    success = df_success()
    failed = df_failed()
    
    with sync_playwright() as p:
        print('Starting...')
        args = []
        args.append("--disable-blink-features=AutomationControlled")
        browser = p.chromium.launch(args=args, headless=False)  # Run in headful mode
        
        intern = internshala(browser)
        GPT = chat(intern.gpt_browser)

        if len(links) == 0:
            links = intern.get_final_links(url, additional_filters)

        for link in track(links, description="Processing"):
            print(f"[bold green]Applying at: [/]{link}")
            intern = internshala(browser)
            already_applied = intern.get_internship_info(link)
            if not already_applied:
                intern.update_resume_skills()
                intern.fill_app_form(GPT, success,failed, validate_assignment_question)
            else: 
                print("[bold yellow]Already Applied. Skipping...[/]")

        print('\n[bold green]Execution Success... Please check Generated Reports for more info.[/]\n')
        success.generate()
        failed.generate()



if __name__ == "__main__":
    main()
