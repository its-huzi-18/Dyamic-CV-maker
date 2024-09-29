
// Helper function to get localStorage data
function getDataFromStorage(key: string, defaultValue: string = ""): string {
    return localStorage.getItem(key) || defaultValue;
}

// Function to load skills from localStorage
export function loadSkills() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;

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

    document.getElementById('displayName')!.textContent = getDataFromStorage('userName');
    document.getElementById('aboutSection')!.textContent = getDataFromStorage('about');
    document.querySelector('#emailSection span')!.textContent = getDataFromStorage('email');
    document.querySelector('#numberSection span')!.textContent = getDataFromStorage('number');

    // Load and update skills
    loadSkills();

    // Update education sections
    document.getElementById('educationSection')!.textContent = getDataFromStorage('education');
    document.getElementById('educationFromSection')!.textContent = getDataFromStorage('educationFrom');
    document.getElementById('startYearSection')!.textContent = getDataFromStorage('startYear');
    document.getElementById('endYearSection')!.textContent = getDataFromStorage('endYear');
    document.getElementById('presentEducationSection')!.textContent = getDataFromStorage('presentEducation');
    document.getElementById('presentFromSection')!.textContent = getDataFromStorage('presentEducationFrom');
    document.getElementById('presentYearSection')!.textContent = getDataFromStorage('presentYear');

    // Update social links
    (document.getElementById('linkedinLinkSection') as HTMLAnchorElement).href = getDataFromStorage('LinkedinLink');
    document.getElementById('LinkedinUserSection')!.textContent = getDataFromStorage('LinkedinUsername');
    (document.getElementById('fbUrlSection') as HTMLAnchorElement).href = getDataFromStorage('facebookLink');
    document.getElementById('fbNameSection')!.textContent = getDataFromStorage('facebookUsername');
    (document.getElementById('gitUrlSection') as HTMLAnchorElement).href = getDataFromStorage('githubLink');
    document.getElementById('gitUsernameSection')!.textContent = getDataFromStorage('githubUsername');

    // Load profile image
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        (document.getElementById('imageSection') as HTMLImageElement).src = savedImage;
    }
}

// Function to enable editing
function enableEditing() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach((skillItem, index) => {
        const skillNameDiv = skillItem.querySelector('.skill-name') as HTMLDivElement;
        const skillBarDiv = skillItem.querySelector('.skillbar') as HTMLDivElement;
        
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
    const presentEducation = document.getElementById("presentEducationSection") as HTMLElement
    const presentFromEducation = document.getElementById("presentFromSection") as HTMLElement
    const presentYearEducation = document.getElementById("presentYearSection") as HTMLElement
    const displayName = document.getElementById('displayName') as HTMLDivElement;
    const aboutSection = document.getElementById('aboutSection') as HTMLDivElement;
    const emailSection = document.querySelector('#emailSection span') as HTMLSpanElement;
    const numberSection = document.querySelector('#numberSection span') as HTMLSpanElement;
    const educationSection = document.getElementById('educationSection') as HTMLDivElement;
    const educationFromSection = document.getElementById('educationFromSection') as HTMLDivElement;
    const startYearSection = document.getElementById('startYearSection') as HTMLDivElement;
    const endYearSection = document.getElementById('endYearSection') as HTMLDivElement;

    // Create editable fields for education details
    presentEducation.innerHTML =  `<input type="text" id="editPresentEducation" value="${presentEducation.textContent}">`; 
    presentFromEducation.innerHTML =  `<input type="text" id="editPresentFromEducation" value="${presentFromEducation.textContent}">`; 
    presentYearEducation.innerHTML =  `<input type="text" id="editPresentYearEducation" value="${presentYearEducation.textContent}">`; 
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
    document.getElementById('editBtn')!.style.display = 'none';
    document.getElementById('saveBtn')!.style.display = 'block';
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
        const updatedSkillName = (document.getElementById(`editSkillName${index}`) as HTMLInputElement).value;
        const updatedSkillPercent = (document.getElementById(`editSkillPercent${index}`) as HTMLInputElement).value;

        // Only save if both fields are filled
        if (updatedSkillName && updatedSkillPercent) {
            // Save each updated skill to localStorage
            localStorage.setItem(`skillName${index + 1}`, updatedSkillName);
            localStorage.setItem(`skillPercent${index + 1}`, updatedSkillPercent);
        }
    });

    // Save updated education values
    const updatedPresentEducation = (document.getElementById('editPresentEducation') as HTMLInputElement).value;
    const updatedPresentFromEducation = (document.getElementById('editPresentFromEducation') as HTMLInputElement).value;
    const updatedPresentYearEducation = (document.getElementById('editPresentYearEducation') as HTMLInputElement).value;
    const updatedEducation = (document.getElementById('editEducation') as HTMLInputElement).value;
    const updatedEducationFrom = (document.getElementById('editEducationFrom') as HTMLInputElement).value;
    const updatedStartYear = (document.getElementById('editStartYear') as HTMLInputElement).value;
    const updatedEndYear = (document.getElementById('editEndYear') as HTMLInputElement).value;

    // Save other updated values to localStorage
    const updatedName = (document.getElementById('editName') as HTMLInputElement).value;
    const updatedAbout = (document.getElementById('editAbout') as HTMLInputElement).value;
    const updatedEmail = (document.getElementById('editEmail') as HTMLInputElement).value;
    const updatedNumber = (document.getElementById('editNumber') as HTMLInputElement).value;

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
    document.getElementById('editBtn')!.style.display = 'block';
    document.getElementById('saveBtn')!.style.display = 'none';

    // Reload the display with updated data
    updateProfileDisplay();
}

// Event listeners
document.getElementById('editBtn')?.addEventListener('click', enableEditing);
document.getElementById('saveBtn')?.addEventListener('click', saveChanges);

// Initial load
window.onload = updateProfileDisplay;
