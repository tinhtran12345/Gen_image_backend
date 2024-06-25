import jsonService from "../../src/services/jsonService";

describe("JsonService", () => {
    it("should be defined", () => {
        expect(jsonService).toBeDefined();
    });

    describe(" extractWithSchema", () => {
        it("should return a output", async () => {
            const text = "This is text";
            const schema = '{"title": "string", "description": "string"}';
            const out = await jsonService.extractWithSchema(text, schema);

            expect(out).toBeDefined();
        });
    });
});
