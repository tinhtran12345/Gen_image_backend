import { PromptTemplate } from "@langchain/core/prompts";
import logger from "../../src/middlewares/logger";
import llmService from "../../src/services/llmService";

describe("LlmserviceService", () => {
    it("should be defined", () => {
        expect(llmService).toBeDefined();
    });
    describe("splitDocument", () => {
        it("Should be create document", async () => {
            const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
            This is a weird text to write, but gotta test the splittingggg some how.\n\n
            Bye!\n\n-H.`;
            const params = {
                chunkSize: 100,
                chunkOverlap: 1,
            };
            const output = await llmService.splitDocument(text, params);

            expect(output.length).toBeGreaterThan(0);
        });
    });

    describe("generateOutput", () => {
        it("Should be define", async () => {
            const promptTemplate = new PromptTemplate({
                template: "Write story with topic {content}",
                inputVariables: ["content"],
            });
            const ChainValues = {
                content: "comedy",
            };

            const output = await llmService.generateOutput(
                promptTemplate,
                ChainValues
            );
            expect(output).toBeDefined();
        });
    });
});
