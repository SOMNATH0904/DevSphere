# Restaurants Recommendation System  <img src="https://image.flaticon.com/icons/png/512/52/52172.png" width="40px">


This repository contains code for Recommendation of differents restaurants. Developed using Flask and python. Website is hosted on heroku.


It's live at **https://restaurants-spotter.herokuapp.com/  .**

![](https://img.shields.io/badge/python-3.6%20|%203.7%20|%203.8-FFFC00?style=flat-circle&logo=python&logoColor=309698)
![](https://img.shields.io/github/license/shsarv/Restaurant-Recommendation-System?color=9900cc&logoColor=9900cc)
![](https://img.shields.io/badge/build-flask%201.1.2-blue?style=flat-circle&logo=flask&logoColor=white)
![](https://img.shields.io/github/repo-size/shsarv/Restaurant-Recommendation-System?color=e02c73&style=flat-circle)
![](https://img.shields.io/tokei/lines/github/shsarv/Restaurant-Recommendation-System?color=orange&logoColor=blue&style=flat-circle)
![](https://img.shields.io/github/languages/top/shsarv/Restaurant-Recommendation-System?color=blueviolet&style=flat-circle)


### 📂 Structure

The directory contains web sub directories and a sub directory for hosting model and other scripts:

1. [app.py](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/app.py) The file which contains all the main backend operations of the website and used to run the flask server locally.
   
2. [Procfile](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/Procfile) for setting up heroku.

3. [requirement.txt](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/requirements.txt) contains all the dependencies.

4. [templates](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/templates) contains the html file.

      |- - - [home.html](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/templates/home.html) contains home page.
      
      |- - - [search.html](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/templates/search.html) contains search page.

5. [static](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/static) contains the css file and images.

      |- - - [home.css](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/static/home.css) contains Styling of home page.
      
      |- - - [search.css](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/static/search.css) contains Styling of Search page/ result page.
      
      |- - - [backgrund1.jpg](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/static/background1.jpg) contains background image of web pages.

6. [main_rest.csv](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/main_rest.csv) contains the raw data.

7. [food1.csv](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/food1.csv) contains cleaned data.
  
### Codebase <img src="https://www.flaticon.com/svg/static/icons/svg/3565/3565585.svg" width="24px">

The entire code has been developed using Python programming language and is hosted on Heroku. The analysis and model is developed using ScikitLearn library. The website is developed using Flask. 

### How to run the project 🚀:

  1. Open the `Terminal`.
  2. Clone the repository by entering `$ git clone https://github.com/shsarv/Restaurant-Recommendation-System.git`.
  3. Ensure that `Python3` and `pip` are installed on the system.
  4. change the diectory to repository name using  `$ cd [Repository name]`.
  4. Create a `virtualenv` by executing the following command: `virtualenv env`.
  5. Activate the `env` virtual environment by executing the follwing command: `source env/bin/activate`.
  6. Enter the cloned repository directory and execute `pip install -r requirements.txt`.
  7. Now, execute the following command: `flask run` and it will point to the `localhost` server with the port `5000`.
  8. Enter the `IP Address: http://localhost:5000` on a web browser and use the application.
  
### Dependencies <img src="https://www.flaticon.com/svg/static/icons/svg/2621/2621122.svg" width="24px">

The following dependencies can be found in [requirements.txt](https://github.com/shsarv/Restaurant-Recommendation-System/blob/main/requirements.txt):

  1. [scikit-learn](https://scikit-learn.org/)
  2. [Flask](https://palletsprojects.com/p/flask/)
  3. [pandas](https://pandas.pydata.org/)
  4. [numpy](http://www.numpy.org/)
  5. [scikit-learn](https://scikit-learn.org/stable/index.html)
  6. [gunicorn](https://gunicorn.org/)
  
### Cosine Similirity is used for recommendation purpose using Scikit-learn library.


<center><img src=https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRa3ATcSqTT8I671rT7KAjWSDoAq70w6nDStA&usqp=CAU"></center>


### References <img src="https://www.flaticon.com/svg/static/icons/svg/1420/1420886.svg" width="24px">
#### For Building machine learning model and deployment:
1. https://medium.com/the-andela-way/deploying-a-python-flask-app-to-heroku-41250bda27d0
2. https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html
3. https://www.machinelearningplus.com/nlp/cosine-similarity/
4. https://towardsdatascience.com/cosine-similarity-how-does-it-measure-the-similarity-maths-behind-and-usage-in-python-50ad30aad7db
5. https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/
6. Machine Learning course- https://www.coursera.org/learn/machine-learning/


### License <img src="https://www.flaticon.com/svg/static/icons/svg/1728/1728431.svg" width="24px">

- MIT License 


<h3> Thanks for visiting! <img src="https://www.flaticon.com/svg/static/icons/svg/3159/3159002.svg" width="30px"><h3>

<hr> 



[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/0)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/0)[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/1)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/1)[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/2)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/2)[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/3)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/3)[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/4)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/4)[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/5)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/5)[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/6)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/6)[![](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/images/7)](https://sourcerer.io/fame/shsarv/shsarv/Restaurant-Recommendation-System/links/7)

<img src="https://img.shields.io/github/followers/shsarv?style=social"> <img src="https://img.shields.io/twitter/follow/sarveshroli?label=twitter&style=social">


<hr>
