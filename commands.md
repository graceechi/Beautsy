<!-- no longer using heroku -->
heroku login

heroku run -a aa-beautsy flask seed undo
heroku run -a aa-beautsy flask db downgrade
heroku run -a aa-beautsy flask db upgrade
heroku run -a aa-beautsy flask seed all
