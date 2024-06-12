import pdfParserService from "../../src/services/pdfParserService";

describe("Pdf Parser Service", () => {
    it("should be defined", () => {
        expect(pdfParserService).toBeDefined();
    });

    describe("postProcessText", () => {
        it("should trim the lines and remove excess inner whitespace to keep a maximum of 3", () => {
            const input = " a            b                  c d        ";
            const expected = "a   b   c d";
            const actutal = pdfParserService.postProcessText(input);
            expect(actutal).toBe(expected);
        });
        it("should keep only one empty line if multiple lines are empty", () => {
            const input = "a\n\n\nb\n\n\n\nc\nd";
            const expected = "a\n\nb\n\nc\nd";
            const actual = pdfParserService.postProcessText(input);
            expect(actual).toBe(expected);
        });
    });

    describe("parser pdf from localfile", () => {
        it("should load pdf from Invoice1.pdf", async () => {
            const path = `public/pdfs/Invoice1.pdf`;
            const actual = await pdfParserService.parserPdfFromLocalPath(path);
            const expected =
                "Invoice\nINVOICE NUMBER:   DATE OF ISSUE:\n\n00001   MM/DD/YYYY\n\nBILLED TO   YOUR COMPANY NAME\n\nClient name   Building name 123 Your   + 1-541-754-3010\n123 Your Street   Street City/State, Country   you@email.co.uk\nCity, State, Country   Zip Code   yourwebsite.co.uk\nZip Code\nPhone\n\nDescription   Unit cost   QTY/HR Rate   Amount\n\nYour item name   $0.00   1   $0.00\n\nYour item name   $0.00   1   $0.00\n\nYour item name   $0.00   1   $0.00\n\nYour item name   $0.00   1   $0.00\n\nYour item name   $0.00   1   $0.00\n\nYour item name   $0.00   1   $0.00\n\nYour item name   $0.00   1   $0.00\n\nYour item name   $0.00   1   $0.00\n\nSubtotal   $0.00\n\nDiscount   $0.00\n\nTax rate   %\n\nTax   $0.00\n\nTERMS   INVOICE TOTAL\n\n$0.00\nPlease pay invoice by MM/DD/YYYY";
            expect(actual).toBe(expected);
        });
        it("should load pdf from Invoice2.pdf ", async () => {
            const path = `public/pdfs/Invoice2.pdf`;
            const actual = await pdfParserService.parserPdfFromLocalPath(path);
            const expected =
                "Bill To:\nGenIO\nInvoice Date: 06/10/2024\nHaNoi\nDue Date: 06/24/2024\nReg nr: 3123\nTAX nr: 0231@43\n\nInvoice # 231231\n\nDescription   Qty   Unit Price   Subtotal   TAX\nIphone   2   1,000.00   2,000.00\nOppo   1   500.00   500.00   5.00 (1%)\n\nTWO THOUSAND FIVE HUNDRED FIVE USD AND 00 CENTS\n\nSubtotal: $2,500.00\nTAX: $5.00\nTotal: $2,505.00";
            expect(actual).toBe(expected);
        });
    });

    describe("load pdf from url", () => {
        it("should load the pdf from url and parse it", async () => {
            const url =
                "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
            const buffer = await pdfParserService.loadPdfFromUrl(url);

            const expected = "Dummy PDF file";
            const actual = await pdfParserService.parserPdf(buffer);

            expect(actual).toBe(expected);
        });
    });
});
