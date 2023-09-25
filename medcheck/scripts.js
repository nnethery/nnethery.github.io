let counter = 1;

function addMedicationForm() {
    const medicationDiv = document.createElement('div');
    medicationDiv.innerHTML = `
        <input type="text" class="form-control mb-2" id="medicationName${counter}" placeholder="Medication Name">
        
        <select class="custom-select mb-2" id="dosageForm${counter}">
            <option selected disabled>Select Type</option>
            <option value="Capsule">Capsule</option>
            <option value="Cream">Cream</option>
            <option value="Device">Device</option>
            <option value="Drops">Drops</option>
            <option value="Foam">Foam</option>
            <option value="Gel">Gel</option>
            <option value="Inhaler">Inhaler</option>
            <option value="Injection">Injection</option>
            <option value="Liquid">Liquid</option>
            <option value="Lotion">Lotion</option>
            <option value="Ointment">Ointment</option>
            <option value="Oral Suspension">Oral Suspension</option>
            <option value="Patch">Patch</option>
            <option value="Powder">Powder</option>
            <option value="Spray">Spray</option>
            <option value="Suppository">Suppository</option>
            <option value="Tablet">Tablet</option>
            <option value="Topical">Topical</option>
        </select>

        <div class="input-group mb-2">
            <input type="number" class="form-control" id="strength${counter}" placeholder="Strength">
            <div class="input-group-append">
                <select class="custom-select" id="strengthUnit${counter}">
                    <option value="mg">mg</option>
                    <option value="mcg">mcg</option>
                    <option value="g">g</option>
                    <option value="mL">mL</option>
                    <option value="%">%</option>
                </select>
            </div>
        </div>

        <div class="input-group mb-2">
            <input type="number" class="form-control" id="frequency${counter}" placeholder="Frequency">
            <div class="input-group-append">
                <select class="custom-select" id="frequencyUnit${counter}">
                    <option value="day">day</option>
                    <option value="week">week</option>
                    <option value="month">month</option>
                    <option value="year">year</option>
                </select>
            </div>
        </div>

        <hr class="my-3">
    `;
    document.getElementById('medicationGroup').appendChild(medicationDiv);
    counter++;
}

function checkInteractions() {
    const output = document.getElementById('output');
    let fullPrompt = "I currently take:\n";
    for (let i = 1; i < counter; i++) {
        let medicationName = document.getElementById(`medicationName${i}`).value;
        let dosageForm = document.getElementById(`dosageForm${i}`).value;
        let strength = document.getElementById(`strength${i}`).value;
        let strengthUnit = document.getElementById(`strengthUnit${i}`).value;
        let frequency = document.getElementById(`frequency${i}`).value;
        let frequencyUnit = document.getElementById(`frequencyUnit${i}`).value;

        fullPrompt += `${medicationName} (${dosageForm}): ${strength} ${strengthUnit} ${frequency} times per ${frequencyUnit}.\n`;
    }
    
    // Create a POST request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://i5rhofn3rjn54uxxumgsswkrle0mfsif.lambda-url.us-east-1.on.aws/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onloadstart = function() {
        // Display loading message while the request is in progress
        output.innerHTML = "Loading...";
    };

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            // Success! Parse the response and display it
            const response = JSON.parse(xhr.responseText);
            output.innerHTML = response;
        } else {
            // Error occurred
            output.innerHTML = "An error occurred. Please try again.";
        }
    };

    xhr.onerror = function() {
        // Network error
        output.innerHTML = "A network error occurred. Please check your internet connection and try again.";
    };

    // Send the request with the concatenated string
    xhr.send(JSON.stringify({ prompt: fullPrompt }));
}
