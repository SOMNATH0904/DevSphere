I was recently looking for internships on Internshala. At the beginning, I applied to 2-3 internships. Then I saw on Internshala that they say you have to apply to at least 15 internships to get a response from 1 employer. I was like, WTF! Applying for one internship takes me around 5 minutes—from finding the right one to writing a cover letter using ChatGPT, while mentioning my skills, projects, and other things in the cover letter. To make things worse, if there's any assignment in the application process, it takes around 7 to 10 minutes to apply to just one internship. So, I thought, what if I automate everything—from finding internships to updating my resume, writing the perfect cover letter, and even solving assignments—so I could relax and endlessly scroll through Instagram (which shows me depressing content and whose algorithm is getting way too personal day by day).

## Features
* You can apply to a single internship in less than 1 minute without touching your keyboard or mouse (or while scrolling Instagram).
* You can theoretically apply to unlimited internships at once.
* Automatic cover letter writing using ChatGPT and your personal resume, while targeting the internship's description and required skills.
* It will solve assignments that are below the cover letter using ChatGPT, while keeping your resume in mind.
* It will automatically add the required skills (mentioned in the internship description) to your Internshala resume.
* It checks if the assignment is easy enough to be solved by ChatGPT. If it asks for any personal info, it skips that internship and saves the cover letter so you can easily apply manually.
* Generates **beautiful**(like her) success/failed reports after applying to internships, so you can keep track of every application.
* Detects fake internships and filters them out. It automatically filters internships if any employer hasn't hired a single candidate till now and is just posting fake internships. It checks for employers' hiring and posting stats and their active history on Internshala.


## Installation

#### Using pip (recommended)
Execute this command in your terminal:    
`pip install internshala-bot`

Then install the Chromium web browser for Playwright:    
`python3 -m undetected_playwright install chromium`

#### Solving Playwright errors in UNIX/Linux

<details>

<summary>Resolve "Permission Denied" error (click to expand)</summary>

On UNIX-based OS, you might run into the following errors
```
Permission denied: '...python3.**/site-packages/undetected_playwright/driver/playwright.sh'
```
and
```
...python3.**/site-packages/undetected_playwright/driver/node: Permission denied
```

To resolve them, simply run
```shell
chmod +x <The path your terminal tells you>.sh
# so smth like: ...python3.**/site-packages/undetected_playwright/driver/playwright.sh
```
and
```
chmod +x <The path your terminal tells you for node>
# so smth like: ...python3.**/site-packages/undetected_playwright/driver/node
```

</details>


### Note
* If you are applying at Offline Internships which require to tick the checkbox 'I can relocate to _Location_', then you have to manually click on check box. As this bot is designed for Work from Home internships. 
* This Feature will added soon.


## How to Use

#### Adding your resume into the bot:
1. Run the module using `python3 -m internshala_bot` in your terminal.
2. This will create a local file named `resume.ini`.
3. Open this file using any text editor and edit the `Skills`, `Certificates`, and `Projects` sections accordingly. Then save it.

#### Where to find the internship URL
1. Open any browser and use Incognito Mode (Don't use normal mode, otherwise, you won't be able to copy the internship URL).
2. Go to [https://internshala.com/internships/](https://internshala.com/internships/)
3. Apply your desired filters such as Profile, Location, Work from Home, Stipend, etc.

4. Now, if you want to apply to multiple internships at once, then after applying filters:
    * Go to the address bar of the browser and copy the URL.

5. Now, if you want to apply to a specific single internship, then after applying the filters:
    * Click on any internship you want.
    * It will open in a new tab.
    * Go to that tab and copy the URL from the address bar.

#### Final Steps
1. Run the module using the terminal and paste the copied URL from the previous step, such as:    
    `python3 -m internshala_bot copied_internship_url`    

    Example:  
```    
    python3 -m internshala_bot https://internshala.com/internship/detail/work-from-home-part-time-teaching-assistant-data-science-internship-at-internshala1723621737
```

2. Now follow the instructions printed in the terminal.
    - It will ask you to sign in to your Internshala and ChatGPT accounts.
    - You only need to do this once; next time, it will save the session.

* If you want to apply to multiple internships, enter the URL copied from step 4.    
    Example:    
        `python3 -m internshala_bot https://internshala.com/internships/work-from-home-data-science-internships/`  

    This will apply to all work-from-home Data Science internships. 

* If you want to apply to 2, 3, or 5 individual internships:
    - Copy all the individual internship URLs, then enter them one by one.    

    `python3 -m internshala_bot internship_one_url internship_two_url internship_three_url`

    In this way, you can add multiple URLs separated by spaces.

Example:
```    
    python3 -m internshala_bot https://internshala.com/internship/detail/work-from-home-part-time-teaching-assistant-data-science-internship-at-internshala1723621737 https://internshala.com/internship/detail/acquisition-ninja-internship-in-multiple-locations-at-zomato1721285327 https://internshala.com/internship/detail/work-from-home-part-time-teaching-assistant-data-science-internship-at-internshala1723621737
```

##### After running successfully, it will generate reports in the `reports/` folder in the current directory. There are two types of reports: 
    - Application Success Report
    - Application Failed Report

* The Application Failed Report contains a link to the internship, the cover letter generated by AI, and the reason why it failed to apply so you can copy the cover letter and apply manually.

## Advanced Options
1. `--skip`, `--skip_assignment_validation`
2. `-f`, `--filters`

* By default, it checks before answering the assignment question if it's easy and answerable by ChatGPT or if it contains any URL or asks for personal info such as a LinkedIn/GitHub profile. In those cases, the assignment is not answered by GPT, and the internship is skipped. You can find all the skipped/failed-to-apply internships under the `reports/` folder.
If you want it to skip this validation and not check the assignment question, you can pass the `--skip` or `--skip_assignment_validation` flag.

Example:
    `python3 -m internshala_bot internship_url --skip`

* While applying to multiple internships at once, all the internships will be filtered by the Profiles Filter you applied while copying the URL. 
    - For example, if you applied a "Data Science" filter in the Profiles section, then in Internshala, you might find internships that are not related to "Data Science," such as "Marketing" or "Web Development."
    - To fix this issue, I have applied a filter that only searches for internships related to your filter queries added in the Profiles section. For example, if you searched for "Data Science," it will only consider those internships that have "Data" or "Science" in their title.
    - If you want to add internships that mention "Python" in their title along with "Data Science," you can use the `--filters` or `-f` flag.
        - Just mention the keywords you want to include in addition to the default filters. For example, if you want to include "Python" and "SQL" with your "Data Science" search, then:

        `python3 -m internshala_bot internship_url --filters python sql`
        This will include internships that have "Python" and "SQL" in their titles, in addition to "Data Science" internships.

        You can mention multiple filters separated by spaces.

## Credits
* [undetected-playwright-patch](https://pypi.org/project/undetected-playwright-patch/)


## PyPI Project 

[https://pypi.org/project/internshala-bot/](https://pypi.org/project/internshala-bot/)

## To Do
* GUI using Tkinter
