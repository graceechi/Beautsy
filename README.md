# Beautsy

[Beautsy](https://aa-beautsy.herokuapp.com/), inspired by <a href="https://www.etsy.com/?utm_source=google&utm_medium=cpc&utm_term=etsy_e&utm_campaign=Search_US_Brand_GGL_ENG_General-Brand_Core_All_Exact&utm_ag=A1&utm_custom1=_k_CjwKCAjw5s6WBhA4EiwACGncZV-Y24o5PLz-rDX-jRBxp05Jjwxo22HkpXD1_ycA25nqkh-aiwll-RoC8ZEQAvD_BwE_k_&utm_content=go_227553629_16342445429_536666953103_aud-459688891435:kwd-1818581752_c_&utm_custom2=227553629&gclid=CjwKCAjw5s6WBhA4EiwACGncZV-Y24o5PLz-rDX-jRBxp05Jjwxo22HkpXD1_ycA25nqkh-aiwll-RoC8ZEQAvD_BwE" target="_blank">Etsy</a> and <a href="https://www.ulta.com/" target="_blank">Ulta Beauty</a>, is an e-commerce website where users can browse and purchase beauty products!

![ezgif com-gif-maker](https://user-images.githubusercontent.com/90019010/179421861-64eadf69-0273-44c4-aeab-214abecf07e4.gif)

## Technologies Used
#### Front End
![react](https://user-images.githubusercontent.com/90019010/179418431-3768ece7-d988-43f1-a22b-4707848ac9d2.svg)
![redux](https://user-images.githubusercontent.com/90019010/179418433-e3ae4f1d-a1dc-4772-84b7-56db8132d01e.svg)
![javascript](https://user-images.githubusercontent.com/90019010/179418437-d00f3585-d6a9-4531-af2f-e5cb321e2780.svg)
![node](https://user-images.githubusercontent.com/90019010/179418558-6d4f59d8-7449-4c32-a30f-5880f91674d7.svg)
![html](https://user-images.githubusercontent.com/90019010/179418445-20d38d75-eae7-4bbf-bed0-5c26ec4aa977.svg)
![css](https://user-images.githubusercontent.com/90019010/179418447-fd17f92e-83e6-4e60-b4d6-602b8300bdc9.svg)
![heroku](https://user-images.githubusercontent.com/90019010/179418448-91d1d47f-1184-440a-bcd0-03f36192f775.svg)

#### Back End
![python](https://user-images.githubusercontent.com/90019010/179418459-28523cdb-5d46-4473-a744-efcf2bb47c8d.svg)
![flask](https://user-images.githubusercontent.com/90019010/179418464-dac29f71-39ae-425b-bbc7-86e6dd29098b.svg)
![postgres](https://user-images.githubusercontent.com/90019010/179418482-fca795c5-b035-43e6-91cb-c136d0c9f6fb.svg)
![docker](https://user-images.githubusercontent.com/90019010/180459609-e8cd6ead-1cd3-4c23-a50c-d44f672212fb.svg)

![sqlalchemy](https://user-images.githubusercontent.com/90019010/179418727-a98bf3e3-66b0-4810-8262-233cb237eff0.png)

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/graceechi/Beautsy.git
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

## Key Features
- Non-logged in users can browse products and view their reviews, but cannot add products to shopping cart nor leave reviews
- Users can log in, log out, sign up, or cruise through the site as a Demo user

![beautsy-1](https://user-images.githubusercontent.com/90019010/179427136-f4d45a6f-6b13-4e44-bf6e-52b27101d485.gif)

- Logged in users can add products to shopping cart and update product quantities
- Logged in users can create, view, edit, and delete reviews on products

![beautsy-2](https://user-images.githubusercontent.com/90019010/179427141-b74d65dd-77d7-470f-b387-8d4c9f4d0551.gif)

- Logged in users can create, view, edit, and delete orders

![beautsy-3](https://user-images.githubusercontent.com/90019010/179427144-2b2834cd-c022-40d7-823b-ca021f8d904d.gif)

## Stretch Goals
- [x] Categories
- [ ] Favorites
- [ ] Search
