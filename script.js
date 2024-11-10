let currentProductId = null;

    // Function to handle adding a new product
    document.getElementById("btn-submit").addEventListener("click", () => {
      const id = document.getElementById("id").value;
      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const qty = document.getElementById("qty").value;
      const thumbnail = document.getElementById("thumbnail").files[0];

      if (id && name && price && qty && thumbnail) {
        const imageUrl = URL.createObjectURL(thumbnail);

        // Add a new row to the table
        document.getElementById("root").insertAdjacentHTML("beforeend", ` 
          <tr id="product-${id}">
            <td>${id}</td>
            <td>${name}</td>
            <td>$${price}</td>
            <td>${qty}</td>
            <td><img src="${imageUrl}" alt="Product Image" width="60" height="60"></td>
            <td>
              <button class="btn btn-custom" onclick="editProduct(${id})">Edit</button>
              <button class="btn btn-danger-custom" onclick="deleteProduct(${id})">Delete</button>
            </td>
          </tr>
        `);

        // Reset the form and close the modal
        document.getElementById("productForm").reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modal.hide();
      } else {
        alert("Please fill out all fields.");
      }
    });

    // Function to handle editing a product
    function editProduct(id) {
      const row = document.getElementById(`product-${id}`);
      const cells = row.getElementsByTagName("td");
      
      const name = cells[1].textContent;
      const price = cells[2].textContent.replace('$', '');
      const qty = cells[3].textContent;

      // Populate the modal form with product data
      document.getElementById("id").value = id;  // Set the ID in the form
      document.getElementById("name").value = name;
      document.getElementById("price").value = price;
      document.getElementById("qty").value = qty;

      // Set the current product ID for updating
      currentProductId = id;

      // Change button to "Update Product"
      document.getElementById("btn-submit").style.display = "none";
      document.getElementById("btn-update").style.display = "inline";

      // Show modal
      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();
    }

    // Function to handle updating a product
    document.getElementById("btn-update").addEventListener("click", () => {
      const id = document.getElementById("id").value;
      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const qty = document.getElementById("qty").value;
      const thumbnail = document.getElementById("thumbnail").files[0];

      if (id && name && price && qty && thumbnail) {
        const imageUrl = URL.createObjectURL(thumbnail);

        // Update the product in the table
        const row = document.getElementById(`product-${id}`);
        row.innerHTML = ` 
          <td>${id}</td>
          <td>${name}</td>
          <td>$${price}</td>
          <td>${qty}</td>
          <td><img src="${imageUrl}" alt="Product Image" width="60" height="60"></td>
          <td>
            <button class="btn btn-custom" onclick="editProduct(${id})">Edit</button>
            <button class="btn btn-danger-custom" onclick="deleteProduct(${id})">Delete</button>
          </td>
        `;

        // Reset the form and close the modal
        document.getElementById("productForm").reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modal.hide();

        // Reset button visibility
        document.getElementById("btn-submit").style.display = "inline";
        document.getElementById("btn-update").style.display = "none";
      } else {
        alert("Please fill out all fields.");
      }
    });

    // Function to handle deleting a product
    function deleteProduct(id) {
      const row = document.getElementById(`product-${id}`);
      row.remove();
    }

    // Function to search for products by name
    function searchProduct() {
      const input = document.getElementById("searchInput").value.toLowerCase();
      const rows = document.getElementById("root").getElementsByTagName("tr");

      for (let i = 0; i < rows.length; i++) {
        const name = rows[i].getElementsByTagName("td")[1].textContent.toLowerCase();
        if (name.indexOf(input) === -1) {
          rows[i].style.display = "none";
        } else {
          rows[i].style.display = "";
        }
      }
    }