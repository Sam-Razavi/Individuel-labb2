var addbtn = document.querySelector('#add-data')
var modal = document.querySelector('.modal')
var close = document.querySelector('.icon')
addbtn.onclick = function () {
    modal.classList.add("active")
}
close.addEventListener("click" , () => {
    modal.classList.remove('active')
})

const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
function fetchTableData() {
    // Fetch data from the API
    fetch('http://localhost:3000/api')
      .then(response => response.json())
      .then(data => {
        // Get a reference to the table body


        // Clear the table body
        tableBody.innerHTML = '';

        // Loop through the data and generate table rows
        for (let r of data.rows) {
          const row = tableBody.insertRow();

          // Create cells and populate them with data
          const authorCell = row.insertCell();
          authorCell.textContent = r.author;

          const titleCell = row.insertCell();
          titleCell.textContent = r.title;

          const genresCell = row.insertCell();
          genresCell.textContent = r.genre;

          const total = row.insertCell();
          total.textContent = r.totalarticle;
          const c = row.insertCell();
          const loan = row.insertCell();
          loan.textContent = r.loaned;
          const yearCell = row.insertCell();
          yearCell.textContent = r.year;





          // Create delete button
          const deleteCell = row.insertCell();
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => {
            // Call delete function or API endpoint with the item ID or other identifier
            deleteItem(r.id, row);
          });
          deleteCell.appendChild(deleteButton);

          // Create update button
          const updateCell = row.insertCell();
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => {
            // Call update function or API endpoint with the item ID or other identifier
            updateItem(r.id, row);
          });
          updateCell.appendChild(updateButton);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

// JavaScript code
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', submitForm);

// Retrieve the existing data from localStorage or initialize an empty array
let data = JSON.parse(localStorage.getItem('tableData')) || [];

// Populate the table with existing data on page load
window.addEventListener('load', () => {
  populateTable(data);
});

function submitForm() {
  // Get the input field values
  const author = document.getElementById('authorInput').value;
  const title = document.getElementById('titleInput').value;
  const genres = document.getElementById('genresInput').value;
  const article = document.getElementById('totalarticle').value;
  const loan = document.getElementById('loaned').value;
  const year = document.getElementById('yearInput').value;

  // Create an object with the form data
  const formData = {
    author: author,
    title: title,
    genre: genres,
    totalarticle: article,
    loaned: loan,
    year: year
  };

  // Call the function to post the data to the API
  postData(formData);
  location.reload();

}

function postData(formData) {
  // Send a POST request to the API endpoint
  fetch('http://localhost:3000/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      return response.json(); // Parse response as JSON
    })
    .then(data => {
      console.log('Response from server:', data);
      // Perform any additional actions based on the response

      // Add the new data to the table
      data.push(data); // Add the new data to the local data array
      localStorage.setItem('tableData', JSON.stringify(data)); // Store the updated data in localStorage

      populateTable(data); // Repopulate the table with the updated data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function populateTable(data) {

  tableBody.innerHTML = '';

  // Loop through the data and generate table rows
  data.forEach(r => {
    const row = tableBody.insertRow();

    // Create cells and populate them with the data

          // Create cells and populate them with data
          const authorCell = row.insertCell();
          authorCell.textContent = r.author;

          const titleCell = row.insertCell();
          titleCell.textContent = r.title;

          const genresCell = row.insertCell();
          genresCell.textContent = r.genre;

          const total = row.insertCell();
          total.textContent = r.totalarticle;

          const loan = row.insertCell();
          loan.textContent = r.loaned;

          const yearCell = row.insertCell();
          yearCell.textContent = r.year;
  });

}


// Initial fetch to populate the table on page load


  function deleteItem(itemId, row) {
    // Call delete API endpoint with the provided item ID and handle the response
    fetch(`http://localhost:3000/api/delete/${itemId}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error: ' + response.status);
        }
        // Remove the row from the table upon successful deletion
        row.remove();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

// Function to update an item
function updateItem(itemId, row) {
    // Create input fields to allow editing
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.value = row.cells[0].textContent;

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = row.cells[1].textContent;

    const genresInput = document.createElement('input');
    genresInput.type = 'text';
    genresInput.value = row.cells[2].textContent;

    const total = document.createElement('input');
    total.type = 'text';
    total.value = row.cells[3].textContent;

    const loan = document.createElement('input');
    loan.type = 'text';
    loan.value = row.cells[5].textContent;

    const yearInput = document.createElement('input');
    yearInput.type = 'text';
    yearInput.value = row.cells[6].textContent;


    // Replace table cells with input fields
    row.cells[0].textContent = '';
    row.cells[0].appendChild(authorInput);

    row.cells[1].textContent = '';
    row.cells[1].appendChild(titleInput);

    row.cells[2].textContent = '';
    row.cells[2].appendChild(genresInput);

    row.cells[3].textContent = '';
    row.cells[3].appendChild(total);

    row.cells[5].textContent = '';
    row.cells[5].appendChild(loan);

    row.cells[6].textContent = '';
    row.cells[6].appendChild(yearInput);

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
      // Get the updated values from the input fields
      const updatedData = {
        author: authorInput.value,
        title: titleInput.value,
        genre: genresInput.value,
        totalarticle: total.value,
        loaned: loan.value,
        year: yearInput.value
      };

      // Call the update API endpoint with the updatedData and itemId
      fetch(`http://localhost:3000/api/update/${itemId}`, {
        method: 'PUT', // or 'POST' depending on your API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('Error updating item');
          }
          return response.json();
        })
      .then(data => {
        // Handle the response from the update API if needed
        console.log('Update successful:', data);

        // Update the table cell values with the updated data
        row.cells[0].textContent = data.author;
        row.cells[1].textContent = data.title;
        row.cells[2].textContent = data.genre;
        row.cells[3].textContent = data.totalarticle;

        row.cells[5].textContent = data.loaned;
        row.cells[6].textContent = data.year;

        location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

    // Replace the update button with the save button
    const updateCell = row.cells[4];
    updateCell.textContent = '';
    updateCell.appendChild(saveButton);
  }
  fetchTableData();



  // search feild

  var searchEl = document.querySelector('#searchInput');


 searchEl.oninput = function () {
    searchfun();
 }
function searchfun() {
    var tr = tableBody.querySelectorAll("TR");
    var searchval = searchEl.value.toLowerCase();
    var i;
    for (i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("TD")[0];
        var auth = td.innerHTML;
        if (auth.toLowerCase().indexOf(searchval) > -1) {
            tr[i].style.display = '';
        }else{
            tr[i].style.display = 'none';
        }

    }
}
var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
