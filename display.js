var _a, _b;
// Helper function to get localStorage data
function getDataFromStorage(key, defaultValue = "") {
    return localStorage.getItem(key) || defaultValue;
}
// Function to load skills from localStorage
export function loadSkills() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList)
        return;
    skillsList.innerHTML = ''; // Clear existing skills
    let i = 1;
    while (localStorage.getItem(`skillName${i}`)) {
        const skillName = localStorage.getItem(`skillName${i}`);
        const skillPercent = localStorage.getItem(`skillPercent${i}`);
        if (skillName && skillPercent) {
            // Create skill item dynamically
            const skillItem = document.createElement('div');
            skillItem.className = `skill-item`;
            skillItem.innerHTML = `
                <div class="skill-name">${skillName.toUpperCase()}</div>
                <div class="sb-skeleton">
                    <div class="skillbar" style="--pgbar-length: ${skillPercent}%"></div>
                </div>
            `;
            skillsList.appendChild(skillItem);
        }
        i++;
    }
}
// Update profile section
export function updateProfileDisplay() {
    document.getElementById('displayName').textContent = getDataFromStorage('userName');
    document.getElementById('aboutSection').textContent = getDataFromStorage('about');
    document.querySelector('#emailSection span').textContent = getDataFromStorage('email');
    document.querySelector('#numberSection span').textContent = getDataFromStorage('number');
    // Load and update skills
    loadSkills();
    // Update education sections
    document.getElementById('educationSection').textContent = getDataFromStorage('education');
    document.getElementById('educationFromSection').textContent = getDataFromStorage('educationFrom');
    document.getElementById('startYearSection').textContent = getDataFromStorage('startYear');
    document.getElementById('endYearSection').textContent = getDataFromStorage('endYear');
    document.getElementById('presentEducationSection').textContent = getDataFromStorage('presentEducation');
    document.getElementById('presentFromSection').textContent = getDataFromStorage('presentEducationFrom');
    document.getElementById('presentYearSection').textContent = getDataFromStorage('presentYear');
    // Update social links
    document.getElementById('linkedinLinkSection').href = getDataFromStorage('LinkedinLink');
    document.getElementById('LinkedinUserSection').textContent = getDataFromStorage('LinkedinUsername');
    document.getElementById('fbUrlSection').href = getDataFromStorage('facebookLink');
    document.getElementById('fbNameSection').textContent = getDataFromStorage('facebookUsername');
    document.getElementById('gitUrlSection').href = getDataFromStorage('githubLink');
    document.getElementById('gitUsernameSection').textContent = getDataFromStorage('githubUsername');
    // Load profile image
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        document.getElementById('imageSection').src = savedImage;
    }
}
// Function to enable editing
function enableEditing() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((skillItem, index) => {
        const skillNameDiv = skillItem.querySelector('.skill-name');
        const skillBarDiv = skillItem.querySelector('.skillbar');
        const skillName = skillNameDiv.textContent || '';
        const skillPercent = skillBarDiv.style.getPropertyValue('--pgbar-length').replace('%', '') || '';
        // Replace skill name and progress bar with input fields for editing
        skillNameDiv.innerHTML = `
            <div style="display: flex; align-items: center;">
                <input type="text" id="editSkillName${index}" value="${skillName}" style="margin-right: 10px;">
                <input type="number" id="editSkillPercent${index}" value="${skillPercent}" min="0" max="100" style="width: 60px;">
            </div>
        `;
    });
    // Existing editing logic for other fields...
    const presentEducation = document.getElementById("presentEducationSection");
    const presentFromEducation = document.getElementById("presentFromSection");
    const presentYearEducation = document.getElementById("presentYearSection");
    const displayName = document.getElementById('displayName');
    const aboutSection = document.getElementById('aboutSection');
    const emailSection = document.querySelector('#emailSection span');
    const numberSection = document.querySelector('#numberSection span');
    const educationSection = document.getElementById('educationSection');
    const educationFromSection = document.getElementById('educationFromSection');
    const startYearSection = document.getElementById('startYearSection');
    const endYearSection = document.getElementById('endYearSection');
    // Create editable fields for education details
    presentEducation.innerHTML = `<input type="text" id="editPresentEducation" value="${presentEducation.textContent}">`;
    presentFromEducation.innerHTML = `<input type="text" id="editPresentFromEducation" value="${presentFromEducation.textContent}">`;
    presentYearEducation.innerHTML = `<input type="text" id="editPresentYearEducation" value="${presentYearEducation.textContent}">`;
    educationSection.innerHTML = `<input type="text" id="editEducation" value="${educationSection.textContent}">`;
    educationFromSection.innerHTML = `<input type="text" id="editEducationFrom" value="${educationFromSection.textContent}">`;
    startYearSection.innerHTML = `<input type="text" id="editStartYear" value="${startYearSection.textContent}">`;
    endYearSection.innerHTML = `<input type="text" id="editEndYear" value="${endYearSection.textContent}">`;
    // Create editable fields for other profile sections
    displayName.innerHTML = `<input type="text" id="editName" value="${displayName.textContent}">`;
    aboutSection.innerHTML = `<input type="text" id="editAbout" value="${aboutSection.textContent}">`;
    emailSection.innerHTML = `<input type="email" id="editEmail" value="${emailSection.textContent}">`;
    numberSection.innerHTML = `<input type="text" id="editNumber" value="${numberSection.textContent}">`;
    // Hide edit button, show save button
    document.getElementById('editBtn').style.display = 'none';
    document.getElementById('saveBtn').style.display = 'block';
}
// Function to save changes
function saveChanges() {
    // Clear existing skill data in localStorage
    let skillIndex = 1;
    while (localStorage.getItem(`skillName${skillIndex}`)) {
        localStorage.removeItem(`skillName${skillIndex}`);
        localStorage.removeItem(`skillPercent${skillIndex}`);
        skillIndex++;
    }
    // Get updated values from input fields
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((skillItem, index) => {
        const updatedSkillName = document.getElementById(`editSkillName${index}`).value;
        const updatedSkillPercent = document.getElementById(`editSkillPercent${index}`).value;
        // Only save if both fields are filled
        if (updatedSkillName && updatedSkillPercent) {
            // Save each updated skill to localStorage
            localStorage.setItem(`skillName${index + 1}`, updatedSkillName);
            localStorage.setItem(`skillPercent${index + 1}`, updatedSkillPercent);
        }
    });
    // Save updated education values
    const updatedPresentEducation = document.getElementById('editPresentEducation').value;
    const updatedPresentFromEducation = document.getElementById('editPresentFromEducation').value;
    const updatedPresentYearEducation = document.getElementById('editPresentYearEducation').value;
    const updatedEducation = document.getElementById('editEducation').value;
    const updatedEducationFrom = document.getElementById('editEducationFrom').value;
    const updatedStartYear = document.getElementById('editStartYear').value;
    const updatedEndYear = document.getElementById('editEndYear').value;
    // Save other updated values to localStorage
    const updatedName = document.getElementById('editName').value;
    const updatedAbout = document.getElementById('editAbout').value;
    const updatedEmail = document.getElementById('editEmail').value;
    const updatedNumber = document.getElementById('editNumber').value;
    // Save updated values to localStorage
    localStorage.setItem('presentEducation', updatedPresentEducation);
    localStorage.setItem('presentEducationFrom', updatedPresentFromEducation);
    localStorage.setItem('presentYear', updatedPresentYearEducation);
    localStorage.setItem('education', updatedEducation);
    localStorage.setItem('educationFrom', updatedEducationFrom);
    localStorage.setItem('startYear', updatedStartYear);
    localStorage.setItem('endYear', updatedEndYear);
    localStorage.setItem('userName', updatedName);
    localStorage.setItem('about', updatedAbout);
    localStorage.setItem('email', updatedEmail);
    localStorage.setItem('number', updatedNumber);
    // Hide save button, show edit button
    document.getElementById('editBtn').style.display = 'block';
    document.getElementById('saveBtn').style.display = 'none';
    // Reload the display with updated data
    updateProfileDisplay();
}
// Event listeners
(_a = document.getElementById('editBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', enableEditing);
(_b = document.getElementById('saveBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', saveChanges);
// Initial load
window.onload = updateProfileDisplay;
