var _a, _b;
// Sample data (you can populate this from localStorage)
let skills = [];
let experiences = [];
let languages = [];
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
    skills = []; // Reset skills array for fresh load
    let i = 1;
    while (localStorage.getItem(`skillName${i}`)) {
        const skillName = getDataFromStorage(`skillName${i}`);
        const skillPercent = getDataFromStorage(`skillPercent${i}`);
        if (skillName && skillPercent) {
            skills.push({ name: skillName, percentage: parseInt(skillPercent) });
            // Create skill item dynamically
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
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
export function loadLanguages() {
    const languageList = document.getElementById("languageList");
    if (!languageList)
        return;
    languageList.innerHTML = ``;
    const languages = []; // Correctly initializing the languages array
    let i = 1;
    while (localStorage.getItem(`languageSelect${i}`)) {
        const languageName = getDataFromStorage(`languageSelect${i}`);
        const proficiencyName = getDataFromStorage(`proficiencySelect${i}`);
        if (languageName && proficiencyName) {
            // Add the language and proficiency to the array
            languages.push({
                languages: languageName, // Ensure this matches the updated 'Language' interface
                proficiency: parseInt(proficiencyName) // Ensure proficiency is a number
            });
            // Create skill item dynamically
            const languageItem = document.createElement('div');
            languageItem.className = 'language-item';
            languageItem.innerHTML = `
                    <div class="language-names">${languageName.toUpperCase()}</div>
                    <div class="profenciency-names">
                        <div class="profenciency"">${proficiencyName.toUpperCase()}</div>
                    </div>
                `;
            languageList.appendChild(languageItem);
        }
        i++;
    }
}
// Function to load experiences from localStorage
export function loadExperiences() {
    const experiencesList = document.getElementById('moreExperienceSection');
    if (!experiencesList)
        return;
    experiencesList.innerHTML = ''; // Clear existing experiences
    experiences = []; // Reset experiences array for fresh load
    let i = 1;
    while (localStorage.getItem(`companyName${i}`)) {
        const companyName = getDataFromStorage(`companyName${i}`);
        const experienceDetail = getDataFromStorage(`experience${i}`);
        const startYear = getDataFromStorage(`expStartYear${i}`);
        const endYear = getDataFromStorage(`expEndYear${i}`);
        if (companyName && experienceDetail && startYear && endYear) {
            experiences.push({ title: companyName, duration: `${startYear} - ${endYear}` });
            // Create experience item dynamically
            const experienceItem = document.createElement('div');
            // Create the year section
            const yearDiv = document.createElement('div');
            yearDiv.className = 'year';
            yearDiv.innerHTML = `
                <hr>
                <br>
                <span>${startYear}</span> - <span>${endYear}</span>
            `;
            // Create the company section
            const companyDiv = document.createElement('div');
            companyDiv.className = 'company';
            companyDiv.innerHTML = `
                <div class="companyNameSection">
                    <h4>Company Name</h4>
                    <i class="fas fa-city"></i>
                </div>
                <div class="companyDetail">
                    <h4>${companyName}</h4>
                    <p>${experienceDetail}</p>
                </div>
            `;
            // Append year and company sections to the experience item
            experienceItem.appendChild(yearDiv);
            experienceItem.appendChild(companyDiv);
            experiencesList.appendChild(experienceItem);
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
    // Load experiences
    loadExperiences();
    loadLanguages();
    // Update education sections
    document.getElementById('educationSection').textContent = getDataFromStorage('education');
    document.getElementById('educationFromSection').textContent = getDataFromStorage('educationFrom');
    document.getElementById('startYearSection').textContent = getDataFromStorage('startYear');
    document.getElementById('endYearSection').textContent = getDataFromStorage('endYear');
    document.getElementById('presentEducationSection').textContent = getDataFromStorage('presentEducation');
    document.getElementById('presentFromSection').textContent = getDataFromStorage('presentEducationFrom');
    document.getElementById('presentYearSection').textContent = getDataFromStorage('presentYear');
    // Load social links
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
    // Get the parent section containing all experiences
    const experiencesList = document.getElementById('moreExperienceSection');
    if (experiencesList) {
        // Select each individual experience item (assuming they're div elements)
        const experienceItems = experiencesList.querySelectorAll('div');
        // Iterate over each experience item and render input fields
        experienceItems.forEach((experienceItem, index) => {
            var _a, _b, _c, _d;
            const companyName = (((_a = experienceItem.querySelector('.companyDetail h4')) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim();
            const experienceDetail = (((_b = experienceItem.querySelector('.companyDetail p')) === null || _b === void 0 ? void 0 : _b.textContent) || '').trim();
            const yearSpans = experienceItem.querySelectorAll('.year span');
            const startYear = (((_c = yearSpans[0]) === null || _c === void 0 ? void 0 : _c.textContent) || '').trim();
            const endYear = (((_d = yearSpans[1]) === null || _d === void 0 ? void 0 : _d.textContent) || '').trim();
            // Injecting dynamic input fields with ids based on index
            experienceItem.innerHTML = `
            <div class="year">
                <input type="text" id="editStartYear${index}" value="${startYear}">
                <span> - </span>
                <input type="text" id="editEndYear${index}" value="${endYear}">
            </div>
            <div class="company">
                <div class="companyNameSection">
                    <h4>Company Name</h4>
                    <i class="fas fa-city"></i>
                </div>
                <div class="companyDetail" style="margin-top: 10px;">
                    <input type="text" id="editCompanyName${index}" value="${companyName}"><br><br>
                    <textarea id="editExperienceDetail${index}" rows="5" cols="24">${experienceDetail}</textarea><br>
                </div>
            </div>
        `;
        });
    }
    // Clear existing experience data in localStorage (if applicable)
    // let experienceIndex = 1;
    // while (localStorage.getItem(`companyName${experienceIndex}`)) {
    //     localStorage.removeItem(`companyName${experienceIndex}`);
    //     localStorage.removeItem(`experience${experienceIndex}`);
    //     localStorage.removeItem(`expStartYear${experienceIndex}`);
    //     localStorage.removeItem(`expEndYear${experienceIndex}`);
    //     experienceIndex++;
    // }
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
    // // Clear existing experience data in localStorage
    // let experienceIndex = 1;
    // while (localStorage.getItem(`companyName${experienceIndex}`)) {
    //     localStorage.removeItem(`companyName${experienceIndex}`);
    //     localStorage.removeItem(`experience${experienceIndex}`);
    //     localStorage.removeItem(`expStartYear${experienceIndex}`);
    //     localStorage.removeItem(`expEndYear${experienceIndex}`);
    //     experienceIndex++;
    // }
    // Save updated experiences
    const experienceItems = document.querySelectorAll('#moreExperienceSection div');
    experienceItems.forEach((experienceItem, index) => {
        var _a, _b, _c, _d;
        // Fetch updated values from dynamically generated input fields
        const newStartYear = (_a = document.getElementById(`editStartYear${index}`)) === null || _a === void 0 ? void 0 : _a.value;
        const newEndYear = (_b = document.getElementById(`editEndYear${index}`)) === null || _b === void 0 ? void 0 : _b.value;
        const newCompanyName = (_c = document.getElementById(`editCompanyName${index}`)) === null || _c === void 0 ? void 0 : _c.value;
        const newExperienceDetail = (_d = document.getElementById(`editExperienceDetail${index}`)) === null || _d === void 0 ? void 0 : _d.value;
        // Save the updated data into localStorage if all fields are present
        if (newStartYear && newEndYear && newCompanyName && newExperienceDetail) {
            localStorage.setItem(`companyName${index + 1}`, newCompanyName);
            localStorage.setItem(`expStartYear${index + 1}`, newStartYear);
            localStorage.setItem(`expEndYear${index + 1}`, newEndYear);
            localStorage.setItem(`experience${index + 1}`, newExperienceDetail);
        }
    });
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
// Event listeners for buttons
document.getElementById('editBtn').addEventListener('click', enableEditing);
document.getElementById('saveBtn').addEventListener('click', saveChanges);
// Initial profile display
updateProfileDisplay();
// Reload the experience section to reflect changes
