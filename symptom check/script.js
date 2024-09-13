document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const hospitalName = document.getElementById('hospitalName').value;
    const doctorName = document.getElementById('doctorName').value;
    const operationFields = document.querySelectorAll('textarea[name="operationHistory[]"]');
    const bloodReports = document.getElementById('bloodReports').files;

    let operations = "";
    operationFields.forEach((field, index) => {
        operations += `<p><strong>Operation ${index + 1}:</strong> ${field.value}</p>`;
    });

    // Displaying patient history
    const historyDiv = document.getElementById('patientHistory');
    historyDiv.innerHTML = `
        <h2>Patient History</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Hospital Name:</strong> ${hospitalName}</p>
        <p><strong>Doctor Treated:</strong> ${doctorName}</p>
        ${operations}
    `;

    if (bloodReports.length > 0) {
        const imgContainer = document.createElement('div');
        imgContainer.innerHTML = "<h3>Uploaded Blood Reports:</h3>";
        
        Array.from(bloodReports).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = `Blood Report ${index + 1}`;
                img.style.maxWidth = '100%';
                img.style.marginTop = '10px';
                imgContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        });

        historyDiv.appendChild(imgContainer);
    }

    // Show the download PDF button after form submission
    document.getElementById('downloadPDF').style.display = 'inline';
});

document.getElementById('addOperation').addEventListener('click', function() {
    const operationFields = document.getElementById('operationFields');
    
    // Create a new text area for additional operations
    const newTextArea = document.createElement('textarea');
    newTextArea.setAttribute('name', 'operationHistory[]');
    newTextArea.setAttribute('rows', '4');
    newTextArea.setAttribute('placeholder', 'Enter past operation details');

    operationFields.appendChild(newTextArea);
});

// Generate and download the PDF
document.getElementById('downloadPDF').addEventListener('click', function() {
    html2canvas(document.getElementById('patientHistory')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        pdf.addImage(imgData, 'PNG', 10, 10, 180, 0); // Position and size for the image (180 keeps it within the page width)
        pdf.save("Patient_Medical_History.pdf");
    });
});
