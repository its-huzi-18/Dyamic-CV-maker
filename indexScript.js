// Function to update skill names from localStorage
function updateSkills() {
    // Define the IDs of the span elements and corresponding localStorage keys
    const skillIds = [
        'skill1',
        'skill2',
        'skill3',
        'skill4',
        'skill5',
        'skill6',
        'skill7'
    ];
    // Loop through the skill IDs and update the span text with the localStorage values
    skillIds.forEach((id, index) => {
        const spanElement = document.getElementById(id);
        if (spanElement) {
            const skillKey = `skill${index + 1}`;
            const skillName = localStorage.getItem(skillKey);
            if (skillName) {
                spanElement.textContent = skillName;
            }
        }
    });
}
// Call the function to update skills when the page loads
document.addEventListener('DOMContentLoaded', updateSkills);
// Select the element where the name will be displayed
const displayNameElement = document.getElementById('displayName');
const displayEmailElement = document.getElementById("email section");
const aboutElement = document.getElementById("about section");
const numberElement = document.getElementById("number section");
const educationElement = document.getElementById("education section");
const educationFromElement = document.getElementById("from section");
const startYearElement = document.getElementById("startYear section");
const endYearElement = document.getElementById("endYear section");
const imageElement = document.getElementById("image section");
const storedImage = localStorage.getItem("profileImage");
const presentEducation = document.getElementById("present Education section");
const presentInsFrom = document.getElementById("present from section");
const presentInsYear = document.getElementById("present year section");
const instagramLinkSection = document.getElementById("instagramLink-section");
const instagramUsernameSection = document.getElementById("instaUser-section");
const facebookLinkSection = document.getElementById("fbUrl-section");
const facebookUserNameSection = document.getElementById("fbName-section");
const githubLinkSection = document.getElementById("gitUrl section");
// Function to update the content based on local storage
function updateContent() {
    // Retrieve the name from local storage
    const userName = localStorage.getItem('userName');
    if (displayNameElement && userName) {
        displayNameElement.textContent = userName;
    }
    // Email
    const email = localStorage.getItem("email");
    if (displayEmailElement && email) {
        displayEmailElement.textContent = email;
    }
    // About
    const aboutsec = localStorage.getItem("about");
    if (aboutElement && aboutsec) {
        aboutElement.textContent = aboutsec;
    }
    // Number
    const number = localStorage.getItem("number");
    if (numberElement && number) {
        numberElement.textContent = number;
    }
    // Education
    const education = localStorage.getItem("education");
    if (educationElement && education) {
        educationElement.textContent = education;
    }
    // Education from
    const fromEducation = localStorage.getItem("from");
    if (educationFromElement && fromEducation) {
        educationFromElement.textContent = fromEducation;
    }
    // Start year
    const startYear = localStorage.getItem("startYear");
    if (startYearElement && startYear) {
        startYearElement.textContent = startYear;
    }
    // End year
    const endYear = localStorage.getItem("endYear");
    if (endYearElement && endYear) {
        endYearElement.textContent = endYear;
    }
    // Present education
    const currentEducation = localStorage.getItem("presentEducation");
    if (presentEducation && currentEducation) {
        presentEducation.textContent = currentEducation;
    }
    // Present from
    const presentFrom = localStorage.getItem("presentInsFrom");
    if (presentInsFrom && presentFrom) {
        presentInsFrom.textContent = presentFrom;
    }
    // Present year
    const presentYear = localStorage.getItem("presentYear");
    if (presentInsYear && presentYear) {
        presentInsYear.textContent = presentYear;
    }
    // Profile image
    if (imageElement && storedImage) {
        imageElement.src = storedImage; // Set the src to the Base64 image
    }
    // Instagram link
    const storedInstaLink = localStorage.getItem("instagramLink");
    if (instagramLinkSection && storedInstaLink) {
        instagramLinkSection.href = storedInstaLink;
    }
    // Instagram username
    const storedInstaUsername = localStorage.getItem("instagramUsername");
    if (instagramUsernameSection && storedInstaUsername) {
        instagramUsernameSection.textContent = storedInstaUsername;
    }
    // Facebook link
    const storedFbLink = localStorage.getItem("facebookLink");
    if (facebookLinkSection && storedFbLink) {
        facebookLinkSection.href = storedFbLink;
    }
    // Facebook username
    const storedFbUsername = localStorage.getItem("facebookUsername");
    if (facebookUserNameSection && storedFbUsername) {
        facebookUserNameSection.textContent = storedFbUsername;
    }
    // GitHub link
    const storedGitLink = localStorage.getItem("githubLink");
    if (githubLinkSection && storedGitLink) {
        githubLinkSection.href = storedGitLink;
    }
}
// Call the function to update the content when the page loads
document.addEventListener('DOMContentLoaded', updateContent);
export {};
