# Nitko LTD

This is a project for personal use to store information about our family farm. It stores:
- Fields - Name and Size
- Workers - Name and Salary
- Jobs - Job name, worker, field

It has all CRUD operations for the ***jobs*** and ***profile*** pages.
It uses **Django Restframework** for backend.

Clone the repository

1. `git clone https://github.com/chavdar94/NitkoLTD.git`
2. Change the direcotry to it: `cd NitkoLTD`

To run the server:
1. Go to **backend** directory and create python enviorment: `cd backend` `pyton -m venv venv`
2. Go to the **backend** folder and install the requierments.txt: `cd backend` activate the enviornment Linux and Mac: `source venv/bin/activate`, for Windows: `env\Scripts\Activate` `pip install -r requirements.txt`
3. Run the server: `python manage.py runserver`

To run the client:
1. Go to **forntend** direcotry: `cd frontend`
2. Install the package.json `npm install`
3. Run the server: `npm run dev`

