render.com


1/12/2024 
node v21.5.0
python v3.12-dev (v3.12.1+)


heroku login

heroku run -a aa-beautsy flask seed undo
heroku run -a aa-beautsy flask db downgrade
heroku run -a aa-beautsy flask db upgrade
heroku run -a aa-beautsy flask seed all
