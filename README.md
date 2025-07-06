Simple Client-Side SQL Query Playground
🚀 Overview
Welcome to the Simple Client-Side SQL Query Playground! This project is a fun, interactive web application that lets you practice basic SQL-like queries directly in your browser. It simulates a database environment using a static JavaScript dataset, making it perfect for understanding core SQL concepts like SELECT, WHERE, and ORDER BY without needing a complex backend setup.

It's entirely built with HTML, CSS, and vanilla JavaScript, which means you can easily deploy it on platforms like GitHub Pages for quick sharing and demonstration!

✨ Features
Interactive Query Input: Type your SQL-like queries into a textarea.

Live Result Display: See query results immediately in a clean, tabular format.

Pre-defined Dataset: Work with a sample products dataset, just like you would with a real database table.

Basic SQL-like Support:

SELECT * or SELECT column1, column2: Choose specific columns or all of them.

FROM products: Specify the table (currently only products is supported).

WHERE column = 'value' or WHERE column = number: Filter rows based on simple equality conditions.

ORDER BY column: Sort results by a specified column.

Client-Side Only: No server, no database installation required – everything runs in your browser!

GitHub Pages Ready: Designed for easy deployment and accessibility.

🛠️ Technologies Used
HTML5: For the project structure and content.

CSS3: For styling and a responsive layout.

Vanilla JavaScript: The core logic for parsing queries, manipulating data, and rendering the results.

📖 How to Use
Enter your query in the provided text area.

Click the "Execute Query" button.

The results will appear in the table below, or an error message will be shown if the query is invalid.

Supported Query Examples:
Here are some queries you can try:

Select all products:

SELECT * FROM products;

Select specific columns:

SELECT name, price FROM products;

Filter by category and order by price:

SELECT name, price, category FROM products WHERE category = 'Electronics' ORDER BY price;

Filter by stock level:

SELECT name, stock FROM products WHERE stock < 100;

Find a specific product by name:

SELECT id, name FROM products WHERE name = 'Laptop';

⚠️ Limitations & Future Enhancements
This project is a simplified demonstration and has several limitations:

Very Basic Parser: The SQL parsing logic is minimal and only supports simple SELECT, FROM, WHERE (equality only), and ORDER BY clauses. It's not a full-fledged SQL engine.

Single Table: Only the products dataset is available.

No Complex Operations: Features like JOINs, GROUP BY, SUM(), COUNT(), LIKE, IN, AND/OR conditions, or UPDATE/DELETE/INSERT statements are not supported.

Case Sensitivity: Query keywords are converted to uppercase for parsing, but string values in WHERE clauses are compared case-insensitively.

Security: As this is client-side, there are no security concerns for data, but the parsing logic is not robust enough for untrusted user input in a production system.

Potential Future Enhancements:
Add support for more WHERE clause operators (e.g., >, <, LIKE).

Implement AND/OR logic in the WHERE clause.

Allow selecting multiple tables and simulating JOIN operations.

Introduce aggregate functions (e.g., COUNT, SUM, AVG).

Enable INSERT, UPDATE, and DELETE operations using localStorage for persistence.

Improve error messaging for more specific feedback.

Load data from external JSON or CSV files dynamically.

🤝 Contributing
Feel free to fork this repository, open issues, or submit pull requests. Any contributions to enhance this simple playground are welcome!

📄 License
This project is open-source and available under the MIT License.

🙏 Acknowledgements
Inspired by the desire to easily demonstrate SQL concepts in a browser environment.