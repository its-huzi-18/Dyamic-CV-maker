// Import the functions from display.js
import { updateProfileDisplay, loadSkills } from './display.js';

// Call the imported functions when the window loads
window.addEventListener('load', updateProfileDisplay);

// Add the event listener for the "download PDF" button
window.addEventListener('load', function() {
    document.getElementById("downloadPdfBtn").addEventListener("click", () => {
        console.log("hello");

        const invoice = document.getElementById("invoice"); // Your CV or resume container
        console.log(invoice);

        // Set options for html2pdf
        const options = {
            filename:     'CV_Resume.pdf',
            image:        { type: 'png', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true }, // Scaling the canvas to fit in A4
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Calculate the current content size and adjust scaling to fit the page
        const contentHeight = invoice.offsetHeight;
        const contentWidth = invoice.offsetWidth;
        const a4Height = 11.5 * 92; // Adjusted A4 height in pixels (slightly increased height)
        const a4Width = 8.0 * 94;  // Adjusted A4 width in pixels (slightly decreased width)
        
        // Scale content to fit both height and width within the A4 page
        const heightScaleFactor = Math.min(1, a4Height / contentHeight);
        const widthScaleFactor = Math.min(1, a4Width / contentWidth);
        
        const finalScaleFactor = Math.min(heightScaleFactor, widthScaleFactor); // Use the smallest scale factor

        // Apply the scale factor to the entire content
        invoice.style.transform = `scale(${finalScaleFactor})`;
        invoice.style.transformOrigin = 'top left';
        invoice.style.marginLeft = "10px"
        invoice.style.marginTop = "10px"


        // Generate and download the PDF
        html2pdf().from(invoice).set(options).save();
    });
});
