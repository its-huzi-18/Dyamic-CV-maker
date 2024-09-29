// Import the functions from display.js
import { updateProfileDisplay, loadSkills } from './display.js';

// Call the imported functions when the window loads
window.addEventListener('load', updateProfileDisplay);

// Add the event listener for the "download PDF" button
window.addEventListener('load', function() {
    document.getElementById("downloadPdfBtn").addEventListener("click", () => {
        console.log("hellow");

        const invoice = document.getElementById("invoice"); // Use document directly
        console.log(invoice);
        console.log(window);
        const options = {
            filename:     'CV_Resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        // Assuming html2pdf is available
        html2pdf()
        .from(invoice)
        .set(options)
        .save();
        });

});

