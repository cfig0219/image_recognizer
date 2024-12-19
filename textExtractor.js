export class Extractor {
    /**
     * Initializes the text Extractor class
     */
    constructor() {
        // Variable to store extracted text
        this.imageText = "";
    }
    
    // Extracts the text from input image
    extractImage(image) {
		// Extracts the text from the input file
		Tesseract.recognize(
            image, // Example image URL
            'eng',
            {
                //logger: (info) => console.log('Progress:', info), // Optional logger
            }
        )
        
        .then(({ data: { text } }) => {
            // sets image text equal to extracted text
            this.imageText = text;
            console.log('Extracted text:', this.imageText);
        })
        
        // Error message if no text is found
        .catch((err) => {
            console.error('Error during test:', err);
        });
    }
}
