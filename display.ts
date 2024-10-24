// Interfaces for skills and experiences
interface Skill {
    name: string;
    percentage: number;
}

interface Experience {
    title: string;
    duration: string;
}
interface Language {
    languages: string; // Change to 'languages' if this is what you intend to store
    proficiency: number; // Change 'duration' to 'proficiency' to match what you're storing
}


// Sample data (you can populate this from localStorage)
let skills: Skill[] = [];
let experiences: Experience[] = [];
let languages: Language[] = [];

// Helper function to get localStorage data
function getDataFromStorage(key: string, defaultValue: string = ""): string {
    return localStorage.getItem(key) || defaultValue;
}

// Function to load skills from localStorage
export function loadSkills() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;

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
    if (!languageList) return;

    languageList.innerHTML = ``;
    const languages: Language[] = [];  // Correctly initializing the languages array
    let i = 1;

    while (localStorage.getItem(`languageSelect${i}`)) {
        const languageName = getDataFromStorage(`languageSelect${i}`);
        const proficiencyName = getDataFromStorage(`proficiencySelect${i}`);
        
        if (languageName && proficiencyName) {
            // Add the language and proficiency to the array
            languages.push({
                languages: languageName,  // Ensure this matches the updated 'Language' interface
                proficiency: parseInt(proficiencyName)  // Ensure proficiency is a number
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
    if (!experiencesList) return;

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
    document.getElementById('displayName')!.textContent = getDataFromStorage('userName');
    document.getElementById('aboutSection')!.textContent = getDataFromStorage('about');
    document.querySelector('#emailSection span')!.textContent = getDataFromStorage('email');
    document.querySelector('#numberSection span')!.textContent = getDataFromStorage('number');

    // Load and update skills
    loadSkills();

    // Load experiences
    loadExperiences();

loadLanguages()

    // Update education sections
    document.getElementById('educationSection')!.textContent = getDataFromStorage('education');
    document.getElementById('educationFromSection')!.textContent = getDataFromStorage('educationFrom');
    document.getElementById('startYearSection')!.textContent = getDataFromStorage('startYear');
    document.getElementById('endYearSection')!.textContent = getDataFromStorage('endYear');
    document.getElementById('presentEducationSection')!.textContent = getDataFromStorage('presentEducation');
    document.getElementById('presentFromSection')!.textContent = getDataFromStorage('presentEducationFrom');
    document.getElementById('presentYearSection')!.textContent = getDataFromStorage('presentYear');

    // Load social links
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
// Get the parent section containing all experiences
const experiencesList = document.getElementById('moreExperienceSection');

if (experiencesList) {
    // Select each individual experience item (assuming they're div elements)
    const experienceItems = experiencesList.querySelectorAll('div');

    // Iterate over each experience item and render input fields
    experienceItems.forEach((experienceItem, index) => {
        const companyName = (experienceItem.querySelector('.companyDetail h4')?.textContent || '').trim();
        const experienceDetail = (experienceItem.querySelector('.companyDetail p')?.textContent || '').trim();
        const yearSpans = experienceItem.querySelectorAll('.year span');
        const startYear = (yearSpans[0]?.textContent || '').trim();
        const endYear = (yearSpans[1]?.textContent || '').trim();

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
    // Fetch updated values from dynamically generated input fields
    const newStartYear = (document.getElementById(`editStartYear${index}`) as HTMLInputElement)?.value;
    const newEndYear = (document.getElementById(`editEndYear${index}`) as HTMLInputElement)?.value;
    const newCompanyName = (document.getElementById(`editCompanyName${index}`) as HTMLInputElement)?.value;
    const newExperienceDetail = (document.getElementById(`editExperienceDetail${index}`) as HTMLTextAreaElement)?.value;

    // Save the updated data into localStorage if all fields are present
    if (newStartYear && newEndYear && newCompanyName && newExperienceDetail) {
        localStorage.setItem(`companyName${index + 1}`, newCompanyName);
        localStorage.setItem(`expStartYear${index + 1}`, newStartYear);
        localStorage.setItem(`expEndYear${index + 1}`, newEndYear);
        localStorage.setItem(`experience${index + 1}`, newExperienceDetail);
    }
});

    
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


// Event listeners for buttons
document.getElementById('editBtn')!.addEventListener('click', enableEditing);
document.getElementById('saveBtn')!.addEventListener('click', saveChanges);

// Initial profile display
updateProfileDisplay();
// Reload the experience section to reflect changes
