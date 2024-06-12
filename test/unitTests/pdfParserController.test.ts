import pdfParserController from "../../src/controllers/pdfParserController";

describe("PdfParserController", () => {
    it("should be defined", () => {
        expect(pdfParserController).toBeDefined();
    });

    // it("should return a PdfParserUploadResultDto from an uploaded PDF file", async () => {
    // });

    // it("should return a PdfParserUrlResultDto from a PDF file given from a URL", async () => {
    //     const url =
    //         "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    //     const responseResult = {
    //         originalUrl: url,
    //         content: "Dummy PDF file",
    //     };
    // });
});
