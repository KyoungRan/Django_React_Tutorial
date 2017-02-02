# How to Make React on Django Boilerplate

It uses Django as backend and React as frontend.


## Note

* If the command line starts with $, you should type it in a terminal.


## Create Virtual environments with venv

(Linux & Mac)

* Create a new virtual envirnoment, named myenv, using venv:

  `$ python3 -m venv myvenv`

* To activate this environment just type:

  `$ source myvenv/bin/activate`
  
* Install django

  `(myvenv) $ pip install django==1.9`


## Create the Django Project & Running


### Create the project

* Cretae the Django project

  `(myvenv) $ django-admin startproject mysite .`
  
* Create the app

  `(myvenv) $ python manage.py startapp [app name]`

  
### Running server
  
  `(myvenv) $ python manage.py runserver`
  
* Open browser

  `127.0.0.1:8000`



  


