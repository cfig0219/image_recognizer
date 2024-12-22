export class Extractor {
    /**
     * Initializes the text Extractor class
     */
    constructor() {
        // Variable to store extracted text
        this.imageText = '';
    }
    
    // Extracts the text from input image and returns a Promise
    extractImage(image) {
        return Tesseract.recognize(
            image, // Example image URL
            'eng',
            {
                // logger: (info) => console.log('Progress:', info), // Optional logger
            }
        )
        .then(({ data: { text } }) => {
            // Sets image text equal to extracted text
            this.imageText = text;
        })
        .catch((err) => {
            throw err; // Rethrow the error to propagate it to the caller
        });
    }
    
    // Gets extracted text string
    getText() {
        return this.imageText;
    }
}
