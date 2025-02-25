from setuptools import setup, find_packages

with open('README.md') as f:
    readme=f.read()


setup(
    name="internshala-bot",
    version="0.0.5",
    author="Mayank Lodhi",
    author_email="",
    description="Package to automate internship application process on Internshala using ChatGPT.",
    long_description=readme,
    long_description_content_type="text/markdown",
    license="Apache-2.0",
    url="https://github.com/Eviltr0N/internshala-bot",
    project_urls={
        'Bug Reports': 'https://github.com/Eviltr0N/internshala-bot/issues',
        'Source Code': 'https://github.com/Eviltr0N/internshala-bot/',
        'Youtube': 'https://youtu.be/l0Pgz9-QB_E',
    },
    packages=find_packages(),
    install_requires=[
        "undetected-playwright-patch==1.40.0.post1700587210000",
        "rich==13.7.1",
        "argparse",
        "requests",
        "requests-html",
        "pandas",
        "lxml_html_clean",

    ],
    classifiers=[
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
    ],
    # python_requires=">=3.8",
    entry_points={
        "console_scripts": [
            "internshala_bot=internshala_bot.main:main",
        ],
    },
)
