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
const courseInputTemplate = `
    <div class="course-entry">
        <input type="number" placeholder="Grade (e.g. 1.5, 2.0)" class="course-grade" min="1" max="5" step="0.01">
        <input type ="number" placeholder ="Units/Load (e.g. 3.0)" class="course-units" min="1" step="0.5">
    </div>
`;

function addCourseInput() {
    inputContainer.innerHTML += courseInputTemplate;
}

addCourseInput();

//--BUTTON LISTENERS--//

const addCourseBtn = document.getElementById('add-course-btn');
addCourseBtn.addEventListener('click',addCourseInput);

const calculateBtn = document.getElementById('calculate-btn');
const resultArea = document.getElementById('result-area');

calculateBtn.addEventListener('click', calculateGWA);

function calculateGWA() {
    const courseEntries = document.querySelectorAll('.course-entry');
    let totalGradepoints = 0;
    let totalUnits = 0;

    courseEntries.forEach (entry => {
        const gradeInput = entry.querySelector('.course-grade');
        const unitsInput = entry.querySelector('.course-units');

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