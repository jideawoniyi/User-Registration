
// <!-- Add event listener to password input -->
    const passwordInput = document.getElementById("password");
    passwordInput.addEventListener("input", function(event) {
      // Get password
      const password = event.target.value;
  
      // Check password
      const result = window.checkPassword(password);
  
      // Set tooltip color based on result
      const tooltip = document.getElementById("tooltip");
      if (result.valid) {
        tooltip.style.color = "green";
      } else {
        tooltip.style.color = "red";
      }
  
      // Set tooltip text
      tooltip.innerText = result.message;
    });
