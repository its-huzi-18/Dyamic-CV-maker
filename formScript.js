var _a;
// Select input fields and buttons
const inputElement = document.querySelector('#updateName');
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
// Select the container for skill inputs and the add button
const skillsContainer = document.querySelector('#skillsContainer');
const addSkillBtn = document.querySelector('#addSkillBtn');
// Counter for skill fields
let skillCount = 0;
// Function to add a new skill input field
function addSkillInput() {
    skillCount++;
    // Create new elements for the skill name and percentage
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill';
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
    requiredElements.forEach(el => {
        const errorElement = document.querySelector(`#error${el.id}`);
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            if (!el.value.trim()) {
                el.classList.add('required');
                el.classList.remove('valid');
                if (errorElement) {
                    errorElement.textContent = 'This field is required'; // Set error message
                }
                isValid = false;
            }
            else {
                el.classList.remove('required');
                el.classList.add('valid');
                if (errorElement) {
                    errorElement.textContent = ''; // Clear error message
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
            numberElement.classList.add('required');
            numberElement.classList.remove('valid');
            if (numberErrorElement) {
                numberErrorElement.textContent = 'Contact number must be exactly 11 digits. Only 11 digits are allowed.'; // Set error message
            }
            isValid = false;
        }
        else {
            numberElement.classList.remove('required');
            numberElement.classList.add('valid');
            if (numberErrorElement) {
                numberErrorElement.textContent = ''; // Clear error message
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
                errorElement.textContent = 'Both fields are required'; // Set error message
                skillName.classList.add('required');
                skillPercent.classList.add('required');
                isValid = false;
            }
            else {
                errorElement.textContent = ''; // Clear error message
                skillName.classList.remove('required');
                skillPercent.classList.remove('required');
                skillName.classList.add('valid');
                skillPercent.classList.add('valid');
            }
        }
    }
    return isValid;
}
// Function to handle form submission
function handleSubmit(event) {
    var _a, _b;
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
            githubLink: githubLinkInput === null || githubLinkInput === void 0 ? void 0 : githubLinkInput.value
        };
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                localStorage.setItem(key, value);
            }
        });
        // Save each skill and its percentage to localStorage
        for (let i = 1; i <= skillCount; i++) {
            const skillName = (_a = (document.querySelector(`#skillName${i}`))) === null || _a === void 0 ? void 0 : _a.value.trim();
            const skillPercent = (_b = (document.querySelector(`#skillPercent${i}`))) === null || _b === void 0 ? void 0 : _b.value.trim();
            if (skillName && skillPercent) {
                localStorage.setItem(`skillName${i}`, skillName.toUpperCase());
                localStorage.setItem(`skillPercent${i}`, skillPercent);
            }
        }
        // Redirect to the display page
        window.location.href = 'display.html';
    }
}
// Add event listener to the "Add Skill" button
addSkillBtn === null || addSkillBtn === void 0 ? void 0 : addSkillBtn.addEventListener('click', addSkillInput);
// Initial call to add the first skill input field
addSkillInput();
// Add event listener to the form submission
(_a = document.querySelector('#personalInfoForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleSubmit);
// Typing effect script
const typingElement = document.getElementById('typingText');
const typingText = "";
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
        if (typingIndex <= 0) {
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
