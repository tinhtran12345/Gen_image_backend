import { genAPIKey } from "../../src/utils/commonFunctions";

describe("ApiKeys", () => {
    it("responds with a api key", () => {
        const apiKey = genAPIKey();
        expect(apiKey.length).toBe(30);
    });
});
