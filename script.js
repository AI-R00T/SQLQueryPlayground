document.addEventListener('DOMContentLoaded', () => {
    const queryInput = document.getElementById('queryInput');
    const executeButton = document.getElementById('executeButton');
    const resultsTable = document.getElementById('resultsTable');
    const errorMessage = document.getElementById('errorMessage');

    // --- Our Sample Dataset (Simulating a 'products' table) ---
    const products = [
        { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, stock: 50 },
        { id: 2, name: 'Mouse', category: 'Electronics', price: 25, stock: 200 },
        { id: 3, name: 'Keyboard', category: 'Electronics', price: 75, stock: 150 },
        { id: 4, name: 'Desk Chair', category: 'Furniture', price: 300, stock: 30 },
        { id: 5, name: 'Monitor', category: 'Electronics', price: 250, stock: 75 },
        { id: 6, name: 'Table Lamp', category: 'Home Decor', price: 40, stock: 100 },
        { id: 7, name: 'Webcam', category: 'Electronics', price: 60, stock: 80 },
        { id: 8, name: 'Bookshelf', category: 'Furniture', price: 150, stock: 20 },
        { id: 9, name: 'Smartphone', category: 'Electronics', price: 800, stock: 40 },
        { id: 10, name: 'Coffee Mug', category: 'Kitchenware', price: 10, stock: 300 }
    ];

    // --- Helper function to display errors ---
    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        resultsTable.innerHTML = ''; // Clear previous results
    }

    // --- Helper function to clear errors ---
    function clearError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    // --- Main function to execute the query ---
    executeButton.addEventListener('click', () => {
        clearError();
        const query = queryInput.value.trim().toUpperCase(); // Convert to uppercase for easier parsing

        if (!query) {
            displayError('Please enter a query.');
            return;
        }

        // Basic parsing (very simplified for this demo)
        if (!query.startsWith('SELECT')) {
            displayError('Queries must start with "SELECT".');
            return;
        }

        let selectClause = '';
        let fromClause = '';
        let whereClause = '';
        let orderByClause = '';

        // Extract clauses using simple string splitting
        const parts = query.split(/\s*FROM\s*/);
        if (parts.length > 1) {
            selectClause = parts[0].replace('SELECT', '').trim();
            const remaining = parts[1];

            const whereSplit = remaining.split(/\s*WHERE\s*/);
            fromClause = whereSplit[0].trim();

            if (whereSplit.length > 1) {
                const orderBySplit = whereSplit[1].split(/\s*ORDER BY\s*/);
                whereClause = orderBySplit[0].trim();
                if (orderBySplit.length > 1) {
                    orderByClause = orderBySplit[1].trim();
                }
            }
        } else {
            displayError('Invalid query format. Missing "FROM" clause.');
            return;
        }

        // Check the FROM clause
        if (fromClause !== 'PRODUCTS') {
            displayError('Invalid table name. Only "PRODUCTS" is supported.');
            return;
        }

        let currentData = [...products]; // Create a copy to manipulate

        // 1. Process WHERE clause
        if (whereClause) {
            try {
                // This is a very basic, unsafe parser for WHERE. For real apps, use a library!
                // Supports: column = 'value' OR column = number
                const regex = /(\w+)\s*=\s*(?:'([^']+)'|(\d+))/;
                const match = whereClause.match(regex);

                if (match) {
                    const column = match[1].toLowerCase(); // e.g., 'category', 'stock'
                    const value = match[2] || (match[3] ? parseInt(match[3]) : null); // String or Number

                    if (value === null) {
                        throw new Error('Invalid WHERE clause value format.');
                    }

                    // Check if column exists in the first product object (assuming all have same keys)
                    if (!Object.keys(products[0]).includes(column)) {
                        throw new Error(`Column '${column}' not found.`);
                    }

                    currentData = currentData.filter(item => {
                        // Type coercion for comparison
                        if (typeof item[column] === 'string' && typeof value === 'string') {
                            return item[column].toUpperCase() === value.toUpperCase();
                        } else if (typeof item[column] === 'number' && typeof value === 'number') {
                            return item[column] === value;
                        }
                        return false; // Mismatching types or other complex comparisons not supported
                    });

                } else {
                    displayError('Invalid WHERE clause format. Supports only "column = value".');
                    return;
                }
            } catch (e) {
                displayError(`Error in WHERE clause: ${e.message}`);
                return;
            }
        }

        // 2. Process ORDER BY clause
        if (orderByClause) {
            const sortColumn = orderByClause.trim().toLowerCase();
             if (!Object.keys(products[0]).includes(sortColumn)) {
                displayError(`Order by column '${sortColumn}' not found.`);
                return;
            }
            currentData.sort((a, b) => {
                if (typeof a[sortColumn] === 'string') {
                    return a[sortColumn].localeCompare(b[sortColumn]);
                }
                return a[sortColumn] - b[sortColumn];
            });
        }

        // 3. Process SELECT clause and display results
        let selectedColumns = [];
        if (selectClause === '*') {
            selectedColumns = Object.keys(products[0]); // All columns
        } else {
            selectedColumns = selectClause.split(',').map(col => col.trim().toLowerCase());
            // Validate if selected columns exist
            const availableColumns = Object.keys(products[0]);
            const invalidColumns = selectedColumns.filter(col => !availableColumns.includes(col));
            if (invalidColumns.length > 0) {
                displayError(`Invalid column(s) in SELECT clause: ${invalidColumns.join(', ')}`);
                return;
            }
        }

        renderTable(currentData, selectedColumns);
    });

    // --- Function to render the results table ---
    function renderTable(data, columns) {
        resultsTable.innerHTML = ''; // Clear previous table content

        if (data.length === 0) {
            resultsTable.innerHTML = '<thead><tr><th>No results found.</th></tr></thead>';
            return;
        }

        // Create table header
        const thead = resultsTable.createTHead();
        const headerRow = thead.insertRow();
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.charAt(0).toUpperCase() + col.slice(1); // Capitalize for display
            headerRow.appendChild(th);
        });

        // Create table body
        const tbody = resultsTable.createTBody();
        data.forEach(item => {
            const row = tbody.insertRow();
            columns.forEach(col => {
                const cell = row.insertCell();
                cell.textContent = item[col];
            });
        });
    }

    // Initial render of all products when page loads
    // You could also leave this empty until a query is run, or show a default query.
    // For now, let's show an empty table with headers as a starting point.
    // renderTable([], []); // Or render with an example
    renderTable(products, Object.keys(products[0])); // Shows all data initially
    queryInput.value = "SELECT * FROM products;"; // Pre-fill with a sample query
});