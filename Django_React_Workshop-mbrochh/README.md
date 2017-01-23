Original (https://github.com/mbrochh/django-reactjs-boilerplate)

# Step 1: Create your Django project

* If you don't have `mkvirtualenv`

```bash
# usign pip
# (window)
pip install virtualenvwrapper-win
# (Linux & Mac)
pip install virtualenvwrapper-win
```
* virtual Environments

```bash
mkvirtualenv djreact
pip install Django
django-admin startproject djreact
mv djreact django
# (window)
rename djreact django
```

* Running Server

```bash
# (window)
python manage.py runserver
# (Linux & Mac)
./manage.py runserver
```

# Step 2: Add non-reactJS views

1.  Add the following lines to `urls.py`:

```python
from django.views import generic

urlpatterns = [
  url(r'^admin/', admin.site.urls),
  url(r'^view2/',
      generic.TemplateView.as_view(template_name='view2.html')),
  url(r'^$',
      generic.TemplateView.as_view(template_name='view1.html')),
]
```

2. Create `template` folder and add the following lines to `settings.py`:

```python
TEMPLATES = [
    {
        ...
        'DIRS': [os.path.join(BASE_DIR, 'djreact/templates')],
        ...
    },
]
```

3. Create `base.html` in the `template` and add the following lines to `base.html` for importing [Twitter Bootstrap CSS Framework](http://getbootstrap.com):

```html
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  </head>
  <body>
    {% block main %}{% endblock %}
  </body>
</html>
```


4. Create `view1.html` in the `template` and add the following lines to `view1.html`:

```html
{% extends "base.html" %}

{% block main %}
<div class="container">
  <h1>View 1</h1>
</div>
{% endblock %}
```


5. Create `view2.html` in the `template` and add the following lines to `view2.html`:

```html
{% extends "base.html" %}

{% block main %}
<div class="container">
  <h1>View 2</h1>
</div>
{% endblock %}
```
