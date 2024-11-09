// Import the functions from display.js
import { updateProfileDisplay, loadSkills } from './display.js';

// Call the imported functions when the window loads
window.addEventListener('load', updateProfileDisplay);

// Add the event listener for the "download PDF" button
window.addEventListener('load', function() {
    document.getElementById("downloadPdfBtn").addEventListener("click", () => {

        const invoice = document.getElementById("invoice"); // Your CV or resume container
        console.log(invoice);

        // Apply smaller font size for specific sections before generating the PDF
        const presentEducationSection = document.getElementById("presentEducationSection");
        const educationSection = document.getElementById("educationSection");

        // Set the font size smaller for these two sections
        if (presentEducationSection) {
            presentEducationSection.style.fontSize = '10px'; // Adjust as needed
        }
        if (educationSection) {
            educationSection.style.fontSize = '10px'; // Adjust as needed
        }

        // Set options for html2pdf
        const options = {
            filename:     'CV_Resume.pdf',
            image:        { type: 'png', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true }, // Scaling the canvas to fit in A4
            jsPDF:        { unit: 'in', format: [8.27, 11.5], orientation: 'portrait' } 
        };

        const contentHeight = invoice.offsetHeight;
        const contentWidth = invoice.offsetWidth;
        const a4Height = 11 * 96; 
        const a4Width = 8.27 * 96;  

        // Scale content to fit both height and width within the A4 page
        const heightScaleFactor = Math.min(1, a4Height / contentHeight);
        const widthScaleFactor = Math.min(1, a4Width / contentWidth);
        
        const finalScaleFactor = Math.min(heightScaleFactor, widthScaleFactor) * 0.95;

        invoice.style.margin = '0'; 
        invoice.style.padding = '0'; 
        invoice.style.pageBreakInside = 'avoid'; 
        invoice.style.width = 'auto'; 
        invoice.style.height = '10.5'; 

        // Generate and download the PDF
        html2pdf().from(invoice).set(options).save();

        // Restore the original font sizes after the PDF is generated
        if (presentEducationSection) {
            presentEducationSection.style.fontSize = '0.9rem'; 
        }
        if (educationSection) {
            educationSection.style.fontSize = '0.9rem'; 
        }
    });
});
