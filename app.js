// Listen for submit

const submit = document.querySelector("#loan-form");
      submit.addEventListener("submit", displayResults);

// display Results

function displayResults(e) {
    // Hide results

    let hideResult = document.querySelector("#results");
          hideResult.style.display = "none";

    // Show loader

    const showLoader = document.querySelector("#loading");
          showLoader.style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
}

// Calculate Results

    function calculateResults() {
        console.log('Calculating...');
        
        // UI vars

        const amount = document.querySelector("#amount");
        const interest = document.querySelector("#interest");
        const years = document.querySelector("#years");
        const monthlyPayment = document.querySelector("#monthly-payment");
        const totalPayment = document.querySelector("#total-payment");
        const totalInterest = document.querySelector("#total-interest");

        const principal = parseFloat(amount.value);
        const calculatedInterest = parseFloat(interest.value) / 100 / 12;
        const calculatedPayments = parseFloat(years.value) * 12; 

        // Compute monthly payment
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest)/(x-1);

        if (isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

            // Display results
            hideResult = document.querySelector("#results");
            hideResult.style.display = "block";
            // Hide loader
            showLoader = document.querySelector("#loading");
            showLoader.style.display = "none";
        }else {
            showError("Please check your numbers");
        }

    }

    function showError(error) {
        const errorDiv = document.createElement("div");
              errorDiv.className = "alert alert-danger";
        const errorDivText = document.createTextNode(error);
              errorDiv.appendChild(errorDivText); 

        // Get elements
        const card = document.querySelector(".card");
        const heading = document.querySelector(".heading");

        // Insert error above heading
        card.insertBefore(errorDiv, heading);

        // Clear error after 3s.

        function clearError () {
            const toRemove = document.querySelector(".alert");
                   toRemove.remove();
        }

        setTimeout(clearError, 3000);

        // Hide results
        hideResult = document.querySelector("#results");
        hideResult.style.display = "none";
        // Hide loader
        showLoader = document.querySelector("#loading");
        showLoader.style.display = "none";

    }
