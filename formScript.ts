// OLd wala
// Select input fields and buttons
const inputElement = document.querySelector<HTMLInputElement>("#updateName");
const emailElement = document.querySelector<HTMLInputElement>("#updateEmail");
const aboutElement =
  document.querySelector<HTMLTextAreaElement>("#updateAbout");
const numberElement = document.querySelector<HTMLInputElement>("#updateNumber");
const educationElement =
  document.querySelector<HTMLSelectElement>("#updateEducation");
const educationFromElement =
  document.querySelector<HTMLInputElement>("#updateFrom");
const startYearElement =
  document.querySelector<HTMLInputElement>("#updateStartYear");
const endYearElement =
  document.querySelector<HTMLInputElement>("#updateEndYear");
const imageInput = document.querySelector<HTMLInputElement>("#updateImage");
const presentEducation = document.querySelector<HTMLInputElement>(
  "#updatepreEducation"
);
const presentInsYear = document.querySelector<HTMLInputElement>("#updateYear");
const presentFromSection =
  document.querySelector<HTMLInputElement>("#updatePresentFrom");
const LinkedinLinkInput = document.querySelector<HTMLInputElement>(
  "#updateLinkedinLink"
);
const LinkedinUserNameInput = document.querySelector<HTMLInputElement>(
  "#updateLinkedinName"
);
const facebookLinkInput =
  document.querySelector<HTMLInputElement>("#updateFbLink");
const facebookUserName =
  document.querySelector<HTMLInputElement>("#updateFbUserName");
const githubLinkInput =
  document.querySelector<HTMLInputElement>("#updateGitLink");
const experienceButton = document.querySelector<HTMLButtonElement>("#expBtn");
const addMoreExperience =
  document.querySelector<HTMLDivElement>("#moreExperience");
const languageSection =
  document.querySelector<HTMLDivElement>("#langaugeContainer");
const addLanguageBtn =
  document.querySelector<HTMLButtonElement>("#langaugeAddbtn");

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
  languageSection?.appendChild(languageDiv);
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
  addMoreExperience?.appendChild(experienceDiv);
}

// Select the container for skill inputs and the add button
const skillsContainer =
  document.querySelector<HTMLDivElement>("#skillsContainer");
const addSkillBtn = document.querySelector<HTMLButtonElement>("#addSkillBtn");

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
  skillsContainer?.appendChild(skillDiv);
}

// Global listener for image input changes (outside the form submission)
imageInput?.addEventListener("change", function () {
  const file = imageInput.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Image = event.target?.result as string;
      localStorage.setItem("profileImage", base64Image);
    };
    reader.readAsDataURL(file);
  }
});

// Updated function to validate form inputs
function validateForm(): boolean {
  let isValid = true;

  // Select all elements with data-required attribute
  const requiredElements = document.querySelectorAll<HTMLElement>(
    '[data-required="true"]'
  );

  requiredElements.forEach((el) => {
    const errorElement = document.querySelector<HTMLSpanElement>(
      `#error${el.id}`
    );
    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    ) {
      if (!el.value.trim()) {
        el.classList.add("required");
        el.classList.remove("valid");
        if (errorElement) {
          errorElement.textContent = "This field is required"; // Set error message
        }
        isValid = false;
      } else {
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
    const numberErrorElement =
      document.querySelector<HTMLSpanElement>(`#errorupdateNumber`); // Ensure the correct ID here
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
    } else {
      numberElement.classList.remove("required");
      numberElement.classList.add("valid");
      if (numberErrorElement) {
        numberErrorElement.textContent = ""; // Clear error message
      }
    }
  }

  // Validate skill inputs
  for (let i = 1; i <= skillCount; i++) {
    const skillName = document.querySelector<HTMLInputElement>(
      `#skillName${i}`
    );
    const skillPercent = document.querySelector<HTMLInputElement>(
      `#skillPercent${i}`
    );
    const errorElement = document.querySelector<HTMLSpanElement>(
      `#errorSkill${i}`
    );

    if (skillName && skillPercent && errorElement) {
      if (!skillName.value.trim() || !skillPercent.value.trim()) {
        errorElement.textContent = "Both fields are required"; // Set error message
        skillName.classList.add("required");
        skillPercent.classList.add("required");
        isValid = false;
      } else {
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
function handleSubmit(event: Event) {
  event.preventDefault(); // Prevent default form submission behavior

  if (validateForm()) {
    // Save input values to local storage
    const data = {
      userName: inputElement?.value,
      email: emailElement?.value,
      about: aboutElement?.value,
      number: numberElement?.value,
      education: educationElement?.value,
      educationFrom: educationFromElement?.value,
      startYear: startYearElement?.value,
      endYear: endYearElement?.value,
      presentEducation: presentEducation?.value,
      presentEducationFrom: presentFromSection?.value,
      presentYear: presentInsYear?.value,
      LinkedinLink: LinkedinLinkInput?.value,
      LinkedinUsername: LinkedinUserNameInput?.value,
      facebookLink: facebookLinkInput?.value,
      facebookUsername: facebookUserName?.value,
      githubLink: githubLinkInput?.value,
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(key, value);
      }
    });

    // Save each skill and its percentage to localStorage
    for (let i = 1; i <= skillCount; i++) {
      const skillName = document
        .querySelector<HTMLInputElement>(`#skillName${i}`)
        ?.value.trim();
      const skillPercent = document
        .querySelector<HTMLInputElement>(`#skillPercent${i}`)
        ?.value.trim();

      if (skillName && skillPercent) {
        localStorage.setItem(`skillName${i}`, skillName.toUpperCase());
        localStorage.setItem(`skillPercent${i}`, skillPercent);
      }
    }

    // Save each experience and its details to localStorage
    for (let i = 1; i <= addExperienceCount; i++) {
      const companyName = document
        .querySelector<HTMLInputElement>(`#companyName${i}`)
        ?.value.trim();
      const experience = document
        .querySelector<HTMLTextAreaElement>(`#experience${i}`)
        ?.value.trim();
      const expStartYear = document
        .querySelector<HTMLInputElement>(`#expStartYear${i}`)
        ?.value.trim();
      const expEndYear = document
        .querySelector<HTMLInputElement>(`#expEndYear${i}`)
        ?.value.trim();

      if (companyName && experience && expStartYear && expEndYear) {
        localStorage.setItem(`companyName${i}`, companyName);
        localStorage.setItem(`experience${i}`, experience);
        localStorage.setItem(`expStartYear${i}`, expStartYear);
        localStorage.setItem(`expEndYear${i}`, expEndYear);
      }
    }
    // Save each langugaes and its profencieny to localStorage
    for (let i = 1; i <= languageCount; i++) {
      const languageSelect = document.querySelector<HTMLSelectElement>(
        `#language${i}`
      )?.value;
      const proficiencySelect = document.querySelector<HTMLSelectElement>(
        `#proficiency${i}`
      )?.value;

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
const formElement =
  document.querySelector<HTMLFormElement>("#personalInfoForm");
formElement?.addEventListener("submit", handleSubmit);

// Add event listener to the "Add Skill" button
addSkillBtn?.addEventListener("click", addSkillInput);

// Attach event listener to add experience button
experienceButton?.addEventListener("click", addExperience);

// Attach event listener to add language button
addLanguageBtn?.addEventListener("click", addLanguages);

// Initial call to add the first experience input field
addExperience();
// Initial call to add the first skill input field
addSkillInput();
// Initial call to add the first langugae input field
addLanguages();

// Add event listener to the form submission
document
  .querySelector<HTMLFormElement>("#personalInfoForm")
  ?.addEventListener("submit", handleSubmit);

// Typing effect script
const typingElement = document.getElementById("typingText") as HTMLDivElement;
const typingText: string = "";
let typingIndex: number = 0;
let isTypingAdding: boolean = true;

function updateTypingText(): void {
  if (isTypingAdding) {
    typingIndex++;
    if (typingIndex > typingText.length) {
      isTypingAdding = false;
      setTimeout(updateTypingText, 2000); // Pause before deleting
      return;
    }
  } else {
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
