
document.addEventListener("DOMContentLoaded", function() {
  // Show popup when add new item button is clicked
  const addNewItemBtn = document.getElementById('addNewItemBtn');
  const addItemPopup = document.getElementById('addItemPopup');
  const closeBtn = document.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelBtn');

  addNewItemBtn.addEventListener('click', () => {
    addItemPopup.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    addItemPopup.classList.remove('open');
  });

  cancelBtn.addEventListener('click', () => {
    addItemPopup.classList.remove('open');
  });

  // Close popup when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === addItemPopup) {
      addItemPopup.classList.remove('open');
    }
  });

  // Toggle password visibility
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.querySelector('.toggle-password');

  togglePasswordBtn.addEventListener('click', function () {
    var type = passwordInput.getAttribute('type');
    if (type === 'password') {
      passwordInput.setAttribute('type', 'text');
      togglePasswordBtn.textContent = 'Hide';
    } else {
      passwordInput.setAttribute('type', 'password');
      togglePasswordBtn.textContent = 'Show';
    }
  });

  // Generate random password
  const generatePasswordBtn = document.getElementById('generatePasswordBtn');

  generatePasswordBtn.addEventListener('click', () => {
    const generatedPassword = generatePassword(12); // Change the length as needed
    passwordInput.value = generatedPassword;
    togglePasswordBtn.textContent = 'Hide';
    passwordInput.setAttribute('type', 'password');
  });

  // Function to generate random password
  function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }





  function handleFormSubmission(event) {
    event.preventDefault();

    // Extract input values from the form
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const note = document.getElementById('note').value;

    // Construct the login item object
    const loginItem = {
      website: website,
      username: username,
      password: password,
      note: note
    };

    // Store the login item (you can choose localStorage or JSON file storage)
    // For demonstration, let's store in localStorage
    let userData = JSON.parse(localStorage.getItem('userData')) || [];
    userData.push(loginItem);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update the display to show the submitted data
    displayUserData(userData);

    // Close the popup
    document.getElementById('addItemPopup').classList.remove('open');

    // Clear the form
    document.getElementById('addItemForm').reset();
  }

  // Function to display user data
  function displayUserData(userData) {
    const userDataSection = document.getElementById('userDataSection');
    userDataSection.innerHTML = '';

    userData.forEach(function (item, index) {
      // Create HTML elements to represent each login item
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('login-item');

      // Extract hostname from the URL
      const hostname = new URL(item.website).hostname;

      // Create elements for displaying website name and username
      const websiteSpan = document.createElement('span');
      websiteSpan.textContent = hostname;

      const usernameSpan = document.createElement('span');
      usernameSpan.textContent = item.username;

      // Create buttons for edit and delete
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      // Add event listener to edit button

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      // Add event listener to delete button

      // Append elements to itemDiv
      itemDiv.appendChild(websiteSpan);
      itemDiv.appendChild(usernameSpan);
      itemDiv.appendChild(editButton);
      itemDiv.appendChild(deleteButton);

      // Append itemDiv to userDataSection
      userDataSection.appendChild(itemDiv);
    });
  }

  // Add event listener for form submission
  document.getElementById('addItemForm').addEventListener('submit', handleFormSubmission);

  // Load existing user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || [];

  // Display the existing user data
  displayUserData(userData);

  // Other event listeners and functions for editing/deleting login items can be added here



  function handleLoginItemClick(event) {
    const selectedItem = event.target.closest('.login-item');
    if (selectedItem) {
      // Extract login details from the selected item
      const website = selectedItem.querySelector('.website');
      const username = selectedItem.querySelector('.username');
      const password = selectedItem.querySelector('.password');

      // Check if the required elements exist
      if (website && username && password) {
        const websiteText = website.textContent;
        const usernameText = username.textContent;
        const passwordText = password.textContent;

        // Populate the popup with login details
        const loginDetailsContent = document.getElementById('loginDetailsContent');
        loginDetailsContent.innerHTML = `
          <p><strong>Website:</strong> ${websiteText}</p>
          <p><strong>Username:</strong> ${usernameText}</p>
          <p><strong>Password:</strong> ${passwordText}</p>
        `;

        // Show the login details popup
        document.getElementById('loginDetailsPopup').classList.add('open');
      }
    }
  }

  // Function to close the popup
  function closePopup() {
    document.getElementById('loginDetailsPopup').classList.remove('open');
  }

  // Add event listener for click on login item
  document.getElementById('userDataSection').addEventListener('click', handleLoginItemClick);

  // Add event listener for close button in popup
  document.querySelector('.close-btn').addEventListener('click', closePopup);

  // Add event listener for click outside of popup to close it
  window.addEventListener('click', function (event) {
    if (event.target === document.getElementById('loginDetailsPopup')) {
      if (confirm('Are you sure you want to close the popup?')) {
        closePopup();
      }
    }
  });

  











document.addEventListener("DOMContentLoaded", function() {
  // Function to handle click on "Add new" button
  document.getElementById('addNewItemBtn').addEventListener('click', handleAddNewItem);

  // Function to handle click on "Import data" button
  document.querySelector('.userBtn button:nth-of-type(2)').addEventListener('click', handleImportData);

  // Function to handle click on "Share" button
  document.querySelector('.userBtn button:nth-of-type(3)').addEventListener('click', handleShareData);

  // Function to handle click on "View history" button
  document.querySelector('.userBtn button:nth-of-type(4)').addEventListener('click', handleViewHistory);

  // Function to handle click on login item
  function handleLoginItemClick(event) {
    // Existing code for handling login item click
  }

  // Function to handle click on "Add new" button
  function handleAddNewItem(event) {
    // Existing code for handling "Add new" button click
  }

  // Function to handle click on "Import data" button
  function handleImportData(event) {
    // Code to confirm and download data in JSON format
    const confirmImport = confirm('Do you want to download the data in JSON format?');
    if (confirmImport) {
      const userData = JSON.parse(localStorage.getItem('userData')) || [];
      const jsonData = JSON.stringify(userData);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'userdata.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  // Function to handle click on "Share" button
  function handleShareData(event) {
    // Code to share data with user's choice
    // This could involve opening a modal or a sharing dialog
    // For simplicity, let's just log a message
    console.log('Data sharing functionality will be implemented here.');
  }

  // Function to handle click on "View history" button
  function handleViewHistory(event) {
    // Code to show user history
    // For simplicity, let's just log a message
    console.log('Viewing history functionality will be implemented here.');
  }

  // Function to close the popup
  function closePopup() {
    // Existing code for closing the popup
  }

  // Add event listener for click on login item
  // Existing code for adding event listener to login items

  // Add event listener for close button in popup
  // Existing code for adding event listener to close button

  // Add event listener for click outside of popup to close it
  // Existing code for adding event listener to close popup when clicking outside

  // Other event listeners and functions for edit/delete functionality can be added here
});








 });



 