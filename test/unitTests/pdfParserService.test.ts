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
