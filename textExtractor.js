export class Extractor {
    /**
     * Initializes the text Extractor class
     */
    constructor() {
        // Variable to store extracted text with newline separation
        this.imageText = '';
    }
    
    // Extracts the text from input image and returns a Promise
    extractImage(image) {
        return Tesseract.recognize(
            image, // Input image
            'eng',
            {
                // logger: (info) => console.log('Progress:', info), // Optional logger
            }
        )
        .then(({ data: { text } }) => {
            // Add '\n' after each line and save as a single string
            this.imageText = text.split('\n').map(line => line.trim() + '\n').join('');
        })
        .catch((err) => {
            console.error('Error during extraction:', err);
            throw err;
        });
    }
    
    // Gets the extracted text with newlines
    getText() {
        console.log(this.imageText);
        return this.imageText;
    }
}