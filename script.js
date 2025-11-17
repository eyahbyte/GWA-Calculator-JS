//-- dark mode--//
const toggleButton = document.getElementById('mode-toggle');
const body = document.body;
const modeIcon = document.getElementById('mode-icon')

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')){
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }

    else {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    }
});

const inputContainer = document.getElementById('input-fields');

//--add subject--//
const subjectInputTemplate = (index) => `
    <div class="subject-entry" id="subject-${index}">
        <input type="text" placeholder="Subject Name(optional)" class="subject-name">
        <input type="number" placeholder="Grade (e.g. 1.5, 2.0)" class="subject-grade" min="1" max="5" step="0.01">
        <input type ="number" placeholder ="Units/Load (e.g. 3.0)" class="subject-units" min="1" step="0.5">
        <button class="remove-subject-btn" type="button" aria-label="Remove Subject">
            <i class="fas fa-times"></i>
        </button>
    </div>
`;

let subjectIndex = 1;

function addSubjectInput() {
    inputContainer.insertAdjacentHTML('beforeend', subjectInputTemplate(subjectIndex));
    subjectIndex++;
}

addSubjectInput();

//--reset button--//
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', ()=> {
    window.location.reload();
}); 

//--add subject and calculate button--//

const addSubjectBtn = document.getElementById('add-subject-btn');
addSubjectBtn.addEventListener('click',addSubjectInput);

const calculateBtn = document.getElementById('calculate-btn');
const resultArea = document.getElementById('result-area');

calculateBtn.addEventListener('click', calculateGWA);

function calculateGWA() {
    const subjectEntries = document.querySelectorAll('.subject-entry');
    let totalGradepoints = 0;
    let totalUnits = 0;

    subjectEntries.forEach (entry => {
        const gradeInput = entry.querySelector('.subject-grade');
        const unitsInput = entry.querySelector('.subject-units');

        const grade = parseFloat(gradeInput.value);
        const units = parseFloat(unitsInput.value);

        if (!isNaN(grade) && !isNaN(units) && grade > 0 && units > 0){
            totalGradepoints += grade * units;
            totalUnits += units;
        }
    });

    if (totalUnits === 0) {
        resultArea.innerHTML = `<p class="error">Please enter valid grades and units.</p>`;
        return;
    }

    const gwa = totalGradepoints / totalUnits;
    resultArea.innerHTML = `<h2>Your GWA is: ${gwa.toFixed(3)}</h2>`;
}

//-- row deletion --//

inputContainer.addEventListener('click', function(event){
    if (event.target.closest('.remove-subject-btn')) {
        const rowToRemove = event.target.closest('.subject-entry');
        if (rowToRemove) {
            rowToRemove.remove();
        }
    }
})

