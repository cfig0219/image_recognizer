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
    
    // Extracts text from a PDF file using pdf-lib
    async extractTextFromPdf(pdfFile) {
        try {
            // Load the PDF file
            const pdfjsLib = window['pdfjs-dist/build/pdf'];
            const pdfBytes = await file.arrayBuffer();
            const pdfDocument = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        
            let extractedText = '';
            for (let i = 1; i <= pdfDocument.numPages; i++) {
                const page = await pdfDocument.getPage(i);
                const textContent = await page.getTextContent();
        
                // Concatenate text items
                extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
            }
        
            this.imageText = extractedText;
            return this.imageText;
            
        } catch (err) {
            console.error('Error extracting text from PDF:', err);
            throw err;
        }
    }

}