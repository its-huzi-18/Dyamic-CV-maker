// Helper function to get localStorage data
function getDataFromStorage(key, defaultValue = "") {
    return localStorage.getItem(key) || defaultValue;
}
// Update profile section
function updateProfileDisplay() {
    document.getElementById('displayName').textContent = getDataFromStorage('userName');
    document.getElementById('aboutSection').textContent = getDataFromStorage('about');
    document.querySelector('#emailSection span').textContent = getDataFromStorage('email');
    document.querySelector('#numberSection span').textContent = getDataFromStorage('number');
    // Update education sections
    document.getElementById('educationSection').textContent = getDataFromStorage('education');
    document.getElementById('educationFromSection').textContent = getDataFromStorage('educationFrom');
    document.getElementById('startYearSection').textContent = getDataFromStorage('startYear');
    document.getElementById('endYearSection').textContent = getDataFromStorage('endYear');
    document.getElementById('presentEducationSection').textContent = getDataFromStorage('presentEducation');
    document.getElementById('presentFromSection').textContent = getDataFromStorage('presentInsFrom');
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
    const displayName = document.getElementById('displayName');
    const aboutSection = document.getElementById('aboutSection');
    const emailSection = document.querySelector('#emailSection span');
    const numberSection = document.querySelector('#numberSection span');
    // Convert content to input fields
    displayName.innerHTML = `<input type="text" id="editName" value="${displayName.textContent}">`;
    aboutSection.innerHTML = `<input type="text" id="editAbout" value="${aboutSection.textContent}">`;
    emailSection.innerHTML = `<input type="email" id="editEmail" value="${emailSection.textContent}">`;
    numberSection.innerHTML = `<input type="text" id="editNumber" value="${numberSection.textContent}">`;
    // Edit education sections
    const educationSection = document.getElementById('educationSection');
    const educationFromSection = document.getElementById('educationFromSection');
    const startYearSection = document.getElementById('startYearSection');
    const endYearSection = document.getElementById('endYearSection');
    const presentEducationSection = document.getElementById('presentEducationSection');
    const presentFromSection = document.getElementById('presentFromSection');
    const presentYearSection = document.getElementById('presentYearSection');
    educationSection.innerHTML = `<input type="text" id="editEducation" value="${educationSection.textContent}">`;
    educationFromSection.innerHTML = `<input type="text" id="editEducationFrom" value="${educationFromSection.textContent}">`;
    startYearSection.innerHTML = `<input type="text" id="editStartYear" value="${startYearSection.textContent}">`;
    endYearSection.innerHTML = `<input type="text" id="editEndYear" value="${endYearSection.textContent}">`;
    presentEducationSection.innerHTML = `<input type="text" id="editPresentEducation" value="${presentEducationSection.textContent}">`;
    presentFromSection.innerHTML = `<input type="text" id="editPresentFrom" value="${presentFromSection.textContent}">`;
    presentYearSection.innerHTML = `<input type="text" id="editPresentYear" value="${presentYearSection.textContent}">`;
    // Edit social links
    const linkedinUserSection = document.getElementById('LinkedinUserSection');
    linkedinUserSection.innerHTML = `<input type="text" id="editLinkedinUsername" value="${linkedinUserSection.textContent}">`;
    const fbNameSection = document.getElementById('fbNameSection');
    fbNameSection.innerHTML = `<input type="text" id="editFacebookUsername" value="${fbNameSection.textContent}">`;
    const gitUsernameSection = document.getElementById('gitUsernameSection');
    gitUsernameSection.innerHTML = `<input type="text" id="editGithubUsername" value="${gitUsernameSection.textContent}">`;
    // Hide edit button, show save button
    document.getElementById('editBtn').style.display = 'none';
    document.getElementById('saveBtn').style.display = 'block';
}
// Function to save changes
function saveChanges() {
    // Get updated values from input fields
    const updatedName = document.getElementById('editName').value;
    const updatedAbout = document.getElementById('editAbout').value;
    const updatedEmail = document.getElementById('editEmail').value;
    const updatedNumber = document.getElementById('editNumber').value;
    const updatedEducation = document.getElementById('editEducation').value;
    const updatedEducationFrom = document.getElementById('editEducationFrom').value;
    const updatedStartYear = document.getElementById('editStartYear').value;
    const updatedEndYear = document.getElementById('editEndYear').value;
    const updatedPresentEducation = document.getElementById('editPresentEducation').value;
    const updatedPresentFrom = document.getElementById('editPresentFrom').value;
    const updatedPresentYear = document.getElementById('editPresentYear').value;
    const updatedLinkedinUsername = document.getElementById('editLinkedinUsername').value;
    const updatedFacebookUsername = document.getElementById('editFacebookUsername').value;
    const updatedGithubUsername = document.getElementById('editGithubUsername').value;
    // Save updated values to localStorage
    localStorage.setItem('userName', updatedName);
    localStorage.setItem('about', updatedAbout);
    localStorage.setItem('email', updatedEmail);
    localStorage.setItem('number', updatedNumber);
    localStorage.setItem('education', updatedEducation);
    localStorage.setItem('educationFrom', updatedEducationFrom);
    localStorage.setItem('startYear', updatedStartYear);
    localStorage.setItem('endYear', updatedEndYear);
    localStorage.setItem('presentEducation', updatedPresentEducation);
    localStorage.setItem('presentInsFrom', updatedPresentFrom);
    localStorage.setItem('presentYear', updatedPresentYear);
    localStorage.setItem('LinkedinUsername', updatedLinkedinUsername);
    localStorage.setItem('facebookUsername', updatedFacebookUsername);
    localStorage.setItem('githubUsername', updatedGithubUsername);
    // Hide save button, show edit button
    document.getElementById('editBtn').style.display = 'block';
    document.getElementById('saveBtn').style.display = 'none';
    // Reload the display with updated data
    updateProfileDisplay();
}
// Function to dynamically load skills
function loadSkills() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList)
        return;
    let i = 1;
    while (localStorage.getItem(`skillName${i}`)) {
        const skillName = localStorage.getItem(`skillName${i}`);
        const skillPercent = localStorage.getItem(`skillPercent${i}`);
        if (skillName && skillPercent) {
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
// Event listeners
document.getElementById('editBtn').addEventListener('click', enableEditing);
document.getElementById('saveBtn').addEventListener('click', saveChanges);
// Call functions on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProfileDisplay();
    loadSkills();
});
export {};
