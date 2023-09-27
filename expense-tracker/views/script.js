window.addEventListener("load", () => {
    axios
      .get("http://localhost:3000/expenses")
      .then((response) => {
        const expenses = response.data;
        displayExpenses(expenses);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const expenseList = document.getElementById("expenseList");
    const expenseId = document.getElementById("expenseId").value; // Get the expense ID
  
    if (expenseId) {
      // If expenseId exists, update the expense
      const updatedExpense = { amount, description, category };
  
      axios
        .put(`http://localhost:3000/expenses/${expenseId}`, updatedExpense)
        .then((response) => {
          console.log(response);
  
          axios
            .get("http://localhost:3000/expenses")
            .then((response) => {
              const expenses = response.data;
              displayExpenses(expenses);
            })
            .catch((err) => {
              console.log(err);
            });
  
          // Clear the form fields and reset the expenseId after updating
          document.getElementById("amount").value = "";
          document.getElementById("description").value = "";
          document.getElementById("category").value = "";
          document.getElementById("expenseId").value = "";
          document.getElementById("form").querySelector("input[type=submit]").value = "Add Expense";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If expenseId does not exist, add a new expense
      const newExpense = { amount, description, category };
  
      axios
        .post("http://localhost:3000/add", newExpense)
        .then((response) => {
          console.log(response);
  
          const li = document.createElement("li");
          li.innerHTML = `Amount: ${amount} -- Description: ${description} -- Category: ${category}`;
  
          expenseList.appendChild(li);
  
          axios
            .get("http://localhost:3000/expenses")
            .then((response) => {
              const expenses = response.data;
              displayExpenses(expenses);
            })
            .catch((err) => {
              console.log(err);
            });
  
          // Clear the form fields after adding a new expense
          document.getElementById("amount").value = "";
          document.getElementById("description").value = "";
          document.getElementById("category").value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
  function displayExpenses(expenses) {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
  
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", expense.id);
  
      li.innerHTML = `
        Amount: ${expense.amount} -- Description: ${expense.description} -- Category: ${expense.category}
        <button onclick="editExpense(${expense.id})">Edit</button>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
      `;
  
      expenseList.appendChild(li);
    });
  }
  
  function deleteExpense(expenseId) {
    axios.delete(`http://localhost:3000/expenses/${expenseId}`).then(() => {
      axios
        .get("http://localhost:3000/expenses")
        .then((response) => {
          const expenses = response.data;
          displayExpenses(expenses);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  
  function editExpense(expenseId) {
    axios
      .get(`http://localhost:3000/expenses/${expenseId}`)
      .then((response) => {
        const expense = response.data;
        const amountInput = document.getElementById("amount");
        const descriptionInput = document.getElementById("description");
        const categoryInput = document.getElementById("category");
        const expenseIdInput = document.getElementById("expenseId");
        const submitButton = document.getElementById("form").querySelector("input[type=submit]");
  
        // Populate form fields with existing data
        amountInput.value = expense.amount;
        descriptionInput.value = expense.description;
        categoryInput.value = expense.category;
        expenseIdInput.value = expense.id;
  
        // Change submit button text to "Update Expense"
        submitButton.value = "Update Expense";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  