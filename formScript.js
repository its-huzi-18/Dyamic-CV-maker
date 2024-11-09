var _a;
// OLd wala
// Select input fields and buttons
const inputElement = document.querySelector("#updateName");
const emailElement = document.querySelector("#updateEmail");
const aboutElement = document.querySelector("#updateAbout");
const numberElement = document.querySelector("#updateNumber");
const educationElement = document.querySelector("#updateEducation");
const educationFromElement = document.querySelector("#updateFrom");
const startYearElement = document.querySelector("#updateStartYear");
const endYearElement = document.querySelector("#updateEndYear");
const imageInput = document.querySelector("#updateImage");
const presentEducation = document.querySelector("#updatepreEducation");
const presentInsYear = document.querySelector("#updateYear");
const presentFromSection = document.querySelector("#updatePresentFrom");
const LinkedinLinkInput = document.querySelector("#updateLinkedinLink");
const LinkedinUserNameInput = document.querySelector("#updateLinkedinName");
const facebookLinkInput = document.querySelector("#updateFbLink");
const facebookUserName = document.querySelector("#updateFbUserName");
const githubLinkInput = document.querySelector("#updateGitLink");
const experienceButton = document.querySelector("#expBtn");
const addMoreExperience = document.querySelector("#moreExperience");
const languageSection = document.querySelector("#langaugeContainer");
const addLanguageBtn = document.querySelector("#langaugeAddbtn");
//Language Function
let languageCount = 0;
function addLanguages() {
    languageCount++;
    const languageDiv = document.createElement("div");
    languageDiv.className = "languages";
    languageDiv.innerHTML = `
    <label for="langauge${languageCount}">Language${languageCount}</label><br>    
              <select name="language${languageCount}" id="language${languageCount}" required="true">
                    <option value="">Select Language</option>
                    <option value="english">English</option>
                    <option value="urdu">Urdu</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                    <option value="arabic">Arabic</option>
                    <option value="hindi">Hindi</option>
                    <option value="japanese">Japanese</option>
                </select><br>
                <label for="proficiency${languageCount}">Proficiency${languageCount}</label><br>  
                <select name="proficiency${languageCount}" id="proficiency${languageCount}" required="true">
                    <option value="">Select Proficiency</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="proficient">Proficient</option>
                    <option value="fluent">Fluent</option>
                    <option value="native">Native</option>
                </select>
    `;
    languageSection === null || languageSection === void 0 ? void 0 : languageSection.appendChild(languageDiv);
}
// Experience Function
let addExperienceCount = 0;
function addExperience() {
    addExperienceCount++;
    const experienceDiv = document.createElement("div");
    experienceDiv.className = `experience`;
    experienceDiv.innerHTML = `
        <label for="companyName${addExperienceCount}" class="form-label">Company Name</label>
        <input type="text" id="companyName${addExperienceCount}" placeholder="Enter Your Company Name" required class="form-input"><br>

        <label for="workExperience${addExperienceCount}">Working Experience</label><br>
        <textarea name="Experience" id="experience${addExperienceCount}" placeholder="Enter Your Experience" data-required="true" rows="5" cols="24" class="form-input"></textarea><br>

        <label for="expStartYear${addExperienceCount}">Start Year</label>
        <input type="number" min="2000" max="2024" data-required="true" id="expStartYear${addExperienceCount}" class="form-input">

        <label for="expEndYear${addExperienceCount}">End Year</label>
        <input type="number" min="2000" max="2024" data-required="true" id="expEndYear${addExperienceCount}" class="form-input">
    `;
    addMoreExperience === null || addMoreExperience === void 0 ? void 0 : addMoreExperience.appendChild(experienceDiv);
}
// Select the container for skill inputs and the add button
const skillsContainer = document.querySelector("#skillsContainer");
const addSkillBtn = document.querySelector("#addSkillBtn");
// Counter for skill fields
let skillCount = 0;
// Function to add a new skill input field
function addSkillInput() {
    skillCount++;
    // Create new elements for the skill name and percentage
    const skillDiv = document.createElement("div");
    skillDiv.className = "skill";
    skillDiv.innerHTML = `
        <label for="skillName${skillCount}">Skill Name ${skillCount}:</label>
        <input type="text" id="skillName${skillCount}" placeholder="Enter skill name" data-required="true" /><br>
        <label for="skillPercent${skillCount}">Skill Percent ${skillCount} (%):</label>
        <input type="number" id="skillPercent${skillCount}" min="0" max="100" data-required="true" /><br>
        <span id="errorSkill${skillCount}" class="error-message"></span> <!-- Error message container -->
    `;
    // Append the new skill fields to the container
    skillsContainer === null || skillsContainer === void 0 ? void 0 : skillsContainer.appendChild(skillDiv);
}
// Global listener for image input changes (outside the form submission)
imageInput === null || imageInput === void 0 ? void 0 : imageInput.addEventListener("change", function () {
    var _a;
    const file = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            const base64Image = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            localStorage.setItem("profileImage", base64Image);
        };
        reader.readAsDataURL(file);
    }
});
// Updated function to validate form inputs
function validateForm() {
    let isValid = true;
    // Select all elements with data-required attribute
    const requiredElements = document.querySelectorAll('[data-required="true"]');
    requiredElements.forEach((el) => {
        const errorElement = document.querySelector(`#error${el.id}`);
        if (el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement ||
            el instanceof HTMLSelectElement) {
            if (!el.value.trim()) {
                el.classList.add("required");
                el.classList.remove("valid");
                if (errorElement) {
                    errorElement.textContent = "This field is required"; // Set error message
                }
                isValid = false;
            }
            else {
                el.classList.remove("required");
                el.classList.add("valid");
                if (errorElement) {
                    errorElement.textContent = ""; // Clear error message
                }
            }
        }
    });
    // Validate the phone number (must be exactly 11 digits)
    if (numberElement) {
        const numberErrorElement = document.querySelector(`#errorupdateNumber`); // Ensure the correct ID here
        const phoneNumber = numberElement.value.trim();
        const phoneNumberRegex = /^\d{11}$/; // Regular expression for exactly 11 digits
        if (!phoneNumberRegex.test(phoneNumber)) {
            numberElement.classList.add("required");
            numberElement.classList.remove("valid");
            if (numberErrorElement) {
                numberErrorElement.textContent =
                    "Contact number must be exactly 11 digits. Only 11 digits are allowed."; // Set error message
            }
            isValid = false;
        }
        else {
            numberElement.classList.remove("required");
            numberElement.classList.add("valid");
            if (numberErrorElement) {
                numberErrorElement.textContent = ""; // Clear error message
            }
        }
    }
    // Validate skill inputs
    for (let i = 1; i <= skillCount; i++) {
        const skillName = document.querySelector(`#skillName${i}`);
        const skillPercent = document.querySelector(`#skillPercent${i}`);
        const errorElement = document.querySelector(`#errorSkill${i}`);
        if (skillName && skillPercent && errorElement) {
            if (!skillName.value.trim() || !skillPercent.value.trim()) {
                errorElement.textContent = "Both fields are required"; // Set error message
                skillName.classList.add("required");
                skillPercent.classList.add("required");
                isValid = false;
            }
            else {
                errorElement.textContent = ""; // Clear error message
                skillName.classList.remove("required");
                skillPercent.classList.remove("required");
                skillName.classList.add("valid");
                skillPercent.classList.add("valid");
            }
        }
    }
    return isValid;
}
// Clear local storage to remove old data
localStorage.clear();
// Function to handle form submission
function handleSubmit(event) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    event.preventDefault(); // Prevent default form submission behavior
    if (validateForm()) {
        // Save input values to local storage
        const data = {
            userName: inputElement === null || inputElement === void 0 ? void 0 : inputElement.value,
            email: emailElement === null || emailElement === void 0 ? void 0 : emailElement.value,
            about: aboutElement === null || aboutElement === void 0 ? void 0 : aboutElement.value,
            number: numberElement === null || numberElement === void 0 ? void 0 : numberElement.value,
            education: educationElement === null || educationElement === void 0 ? void 0 : educationElement.value,
            educationFrom: educationFromElement === null || educationFromElement === void 0 ? void 0 : educationFromElement.value,
            startYear: startYearElement === null || startYearElement === void 0 ? void 0 : startYearElement.value,
            endYear: endYearElement === null || endYearElement === void 0 ? void 0 : endYearElement.value,
            presentEducation: presentEducation === null || presentEducation === void 0 ? void 0 : presentEducation.value,
            presentEducationFrom: presentFromSection === null || presentFromSection === void 0 ? void 0 : presentFromSection.value,
            presentYear: presentInsYear === null || presentInsYear === void 0 ? void 0 : presentInsYear.value,
            LinkedinLink: LinkedinLinkInput === null || LinkedinLinkInput === void 0 ? void 0 : LinkedinLinkInput.value,
            LinkedinUsername: LinkedinUserNameInput === null || LinkedinUserNameInput === void 0 ? void 0 : LinkedinUserNameInput.value,
            facebookLink: facebookLinkInput === null || facebookLinkInput === void 0 ? void 0 : facebookLinkInput.value,
            facebookUsername: facebookUserName === null || facebookUserName === void 0 ? void 0 : facebookUserName.value,
            githubLink: githubLinkInput === null || githubLinkInput === void 0 ? void 0 : githubLinkInput.value,
        };
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                localStorage.setItem(key, value);
            }
        });
        // Save each skill and its percentage to localStorage
        for (let i = 1; i <= skillCount; i++) {
            const skillName = (_a = document
                .querySelector(`#skillName${i}`)) === null || _a === void 0 ? void 0 : _a.value.trim();
            const skillPercent = (_b = document
                .querySelector(`#skillPercent${i}`)) === null || _b === void 0 ? void 0 : _b.value.trim();
            if (skillName && skillPercent) {
                localStorage.setItem(`skillName${i}`, skillName.toUpperCase());
                localStorage.setItem(`skillPercent${i}`, skillPercent);
            }
        }
        // Save each experience and its details to localStorage
        for (let i = 1; i <= addExperienceCount; i++) {
            const companyName = (_c = document
                .querySelector(`#companyName${i}`)) === null || _c === void 0 ? void 0 : _c.value.trim();
            const experience = (_d = document
                .querySelector(`#experience${i}`)) === null || _d === void 0 ? void 0 : _d.value.trim();
            const expStartYear = (_e = document
                .querySelector(`#expStartYear${i}`)) === null || _e === void 0 ? void 0 : _e.value.trim();
            const expEndYear = (_f = document
                .querySelector(`#expEndYear${i}`)) === null || _f === void 0 ? void 0 : _f.value.trim();
            if (companyName && experience && expStartYear && expEndYear) {
                localStorage.setItem(`companyName${i}`, companyName);
                localStorage.setItem(`experience${i}`, experience);
                localStorage.setItem(`expStartYear${i}`, expStartYear);
                localStorage.setItem(`expEndYear${i}`, expEndYear);
            }
        }
        // Save each langugaes and its profencieny to localStorage
        for (let i = 1; i <= languageCount; i++) {
            const languageSelect = (_g = document.querySelector(`#language${i}`)) === null || _g === void 0 ? void 0 : _g.value;
            const proficiencySelect = (_h = document.querySelector(`#proficiency${i}`)) === null || _h === void 0 ? void 0 : _h.value;
            if (languageSelect && proficiencySelect) {
                localStorage.setItem(`languageSelect${i}`, languageSelect);
                localStorage.setItem(`proficiencySelect${i}`, proficiencySelect);
            }
        }
        // Redirect to the display page
        window.location.href = "display.html";
    }
}
// Attach event listener to form submit
const formElement = document.querySelector("#personalInfoForm");
formElement === null || formElement === void 0 ? void 0 : formElement.addEventListener("submit", handleSubmit);
// Add event listener to the "Add Skill" button
addSkillBtn === null || addSkillBtn === void 0 ? void 0 : addSkillBtn.addEventListener("click", addSkillInput);
// Attach event listener to add experience button
experienceButton === null || experienceButton === void 0 ? void 0 : experienceButton.addEventListener("click", addExperience);
// Attach event listener to add language button
addLanguageBtn === null || addLanguageBtn === void 0 ? void 0 : addLanguageBtn.addEventListener("click", addLanguages);
// Initial call to add the first experience input field
addExperience();
// Initial call to add the first skill input field
addSkillInput();
// Initial call to add the first langugae input field
addLanguages();
// Add event listener to the form submission
(_a = document
    .querySelector("#personalInfoForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleSubmit);
// Typing effect script
const typingElement = document.getElementById("typingText");
const typingText = "Huzaifa Resume"; // Set your desired text here
let typingIndex = 0;
let isTypingAdding = true;
function updateTypingText() {
    if (isTypingAdding) {
        typingIndex++;
        if (typingIndex > typingText.length) {
            isTypingAdding = false;
            setTimeout(updateTypingText, 2000); // Pause before deleting
            return;
        }
    }
    else {
        typingIndex--;
        if (typingIndex < 0) { // Ensure typingIndex doesn't go below 0
            isTypingAdding = true;
            setTimeout(updateTypingText, 2000); // Pause before adding again
            return;
        }
    }
    // Update the text content
    if (typingElement) {
        typingElement.textContent = typingText.substring(0, typingIndex);
    }
    // Adjust typing speed
    setTimeout(updateTypingText, isTypingAdding ? 100 : 50); // Speed of typing and deleting
}
// Initialize the text update
updateTypingText();
export {};
