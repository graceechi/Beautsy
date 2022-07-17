# Beautsy!

[Beautsy](https://aa-beautsy.herokuapp.com/), inspired by <a href="https://www.etsy.com/?utm_source=google&utm_medium=cpc&utm_term=etsy_e&utm_campaign=Search_US_Brand_GGL_ENG_General-Brand_Core_All_Exact&utm_ag=A1&utm_custom1=_k_CjwKCAjw5s6WBhA4EiwACGncZV-Y24o5PLz-rDX-jRBxp05Jjwxo22HkpXD1_ycA25nqkh-aiwll-RoC8ZEQAvD_BwE_k_&utm_content=go_227553629_16342445429_536666953103_aud-459688891435:kwd-1818581752_c_&utm_custom2=227553629&gclid=CjwKCAjw5s6WBhA4EiwACGncZV-Y24o5PLz-rDX-jRBxp05Jjwxo22HkpXD1_ycA25nqkh-aiwll-RoC8ZEQAvD_BwE" target="_blank">Etsy</a> and <a href="https://www.ulta.com/" target="_blank">Ulta</a>, is an e-commerce website where users can browse and purchase beauty products!

![Beautsy-splash-page](https://user-images.githubusercontent.com/90019010/179417947-15ee959f-1d6d-4924-b304-4af6ef939733.png)

## Technologies Used
#### Front End
- React
- Redux
- Javascript
- HTML
- CSS
- Hosted on Heroku

#### Back End
- Express.js
- Sequelize.js
- PostgreSQL
- AJAX
- CSURF
- Express Validator

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

