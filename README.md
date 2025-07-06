SQL Query Playground - 
This is a simple web application that lets you try out basic SQL-like queries in your web browser. 
It uses a small, built-in dataset and runs entirely on your computer, so you don't need a real database.
(Access here - https://ai-r00t.github.io/SQLQueryPlayground/)

How It Works - 
You type a query into a box. The app processes your query. It shows the results in a table.

What You Can Do - 
You can use SELECT, FROM, WHERE, and ORDER BY.
Here are some examples:
SELECT * FROM products;

SELECT name, price FROM products WHERE category = 'Electronics';

SELECT name, stock FROM products WHERE stock < 100 ORDER BY stock;

Technologies Used
HTML
CSS
JavaScript

How to Run It
Save the index.html, style.css, and script.js files into one folder.
Open index.html in your web browser.

Deploying on GitHub Pages
Create a new repository on GitHub.
Upload your files (index.html, style.css, script.js) to the main branch.
Go to your repository's Settings, then Pages.
Choose your main branch as the source and save.
Your site will be live at https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/.

Important Notes
This is a very simple tool. It does not support complex SQL features like joins, sums, or updates. It's just for basic query practice.

License
This project is open-source under the MIT License.
