render.com


1/12/2024 using node v21.5.0



heroku login

heroku run -a aa-beautsy flask seed undo
heroku run -a aa-beautsy flask db downgrade
heroku run -a aa-beautsy flask db upgrade
heroku run -a aa-beautsy flask seed all
