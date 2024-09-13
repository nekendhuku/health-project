// script.js

// Predefined conditions with matching symptoms
const conditionsData = [
    {
        name: 'COVID-19',
        symptoms: ['fever', 'cough', 'fatigue', 'headache'],
        description: 'A respiratory illness caused by the SARS-CoV-2 virus. Symptoms may vary in severity.',
        treatment: 'Isolate, rest, drink plenty of fluids, and seek medical attention if symptoms worsen.'
    },
    {
        name: 'Flu',
        symptoms: ['fever', 'fatigue', 'headache', 'cough'],
        description: 'A common viral infection that affects the respiratory system.',
        treatment: 'Rest, stay hydrated, and consider taking antiviral medications if prescribed by a doctor.'
    },
    {
        name: 'Migraine',
        symptoms: ['headache', 'fatigue'],
        description: 'A neurological condition that causes intense headaches, often accompanied by nausea or light sensitivity.',
        treatment: 'Rest in a dark, quiet room, use pain relievers, and stay hydrated.'
    },
    {
        name: 'Common Cold',
        symptoms: ['cough', 'headache', 'fatigue'],
        description: 'A viral infection of your nose and throat (upper respiratory tract).',
        treatment: 'Rest, stay hydrated, and use over-the-counter cold remedies for relief.'
    }
];

// Track selected symptoms
let selectedSymptoms = [];

document.getElementById('symptomForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    // Validate if symptoms are selected
    if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom.');
        return;
    }

    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    // Simulate delay for processing
    setTimeout(() => {
        // Find matching conditions
        let matchedConditions = conditionsData.filter(condition =>
            selectedSymptoms.every(symptom => condition.symptoms.includes(symptom))
        );

        // Display results
        let resultHTML = '';
        if (matchedConditions.length > 0) {
            resultHTML = '<h3>Possible Conditions:</h3><ul>';
            matchedConditions.forEach(condition => {
                resultHTML += `
                    <li>
                        <strong>${condition.name}</strong><br>
                        <em>${condition.description}</em><br>
                        <strong>Treatment:</strong> ${condition.treatment}
                    </li><br>
                `;
            });
            resultHTML += '</ul>';
        } else {
            resultHTML = 'No conditions matched your symptoms. Please consult a healthcare provider for further advice.';
        }

        document.getElementById('result').innerHTML = resultHTML;
        document.getElementById('result').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }, 1000); // Simulate 1 second delay
});

// Reset form handler
document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('result').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('selectedSymptoms').innerHTML = '';
    selectedSymptoms = [];
});

// Symptom suggestions (without API, using predefined symptom list)
const symptomList = ['fever', 'cough', 'fatigue', 'headache'];

document.getElementById('symptomSearch').addEventListener('input', function () {
    const query = this.value.toLowerCase();

    if (query.length < 2) {
        document.getElementById('suggestions').innerHTML = '';
        return;
    }

    // Filter symptoms based on user input
    const filteredSymptoms = symptomList.filter(symptom => symptom.toLowerCase().includes(query));

    // Display suggestions
    let suggestionsHTML = '';
    filteredSymptoms.forEach(symptom => {
        suggestionsHTML += `<li data-symptom="${symptom}">${symptom}</li>`;
    });
    document.getElementById('suggestions').innerHTML = suggestionsHTML;
});

// Add selected symptom to the list
document.getElementById('suggestions').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const symptom = e.target.dataset.symptom;

        // Add the selected symptom to the selected list if not already added
        if (!selectedSymptoms.includes(symptom)) {
            selectedSymptoms.push(symptom);
            const selectedSymptomsDiv = document.getElementById('selectedSymptoms');
            selectedSymptomsDiv.innerHTML += `<span data-symptom="${symptom}">${symptom}</span> `;
        }

        // Clear suggestions and input field
        document.getElementById('symptomSearch').value = '';
        document.getElementById('suggestions').innerHTML = '';
    }
});



