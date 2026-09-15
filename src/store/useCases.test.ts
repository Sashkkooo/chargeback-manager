import { beforeEach, describe, expect, it } from "vitest";
import { useCases } from "./useCases";

beforeEach(() => {
    localStorage.clear();
    useCases.setState({ cases: [] });
});

function baseCaseInput() {
    return {
        customer: "Alice",
        amount: 42,
        status: "open" as const,
        reason: "Duplicate charge",
        merchant: "Test Store",
        stage: "inquiry" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deadline: new Date().toISOString(),
        evidence: [],
        timeline: [],
    };
}

describe("useCases store", () => {
    it("starts empty", () => {
        expect(useCases.getState().cases).toHaveLength(0);
    });

    it("addCase appends a new case with a generated id", () => {
        useCases.getState().addCase(baseCaseInput());

        const { cases } = useCases.getState();
        expect(cases).toHaveLength(1);
        expect(cases[0].customer).toBe("Alice");
        expect(cases[0].id).toBeTruthy();
    });

    it("updateCase merges fields and bumps updatedAt", async () => {
        useCases.getState().addCase(baseCaseInput());
        const id = useCases.getState().cases[0].id;
        const before = useCases.getState().cases[0].updatedAt;

        await new Promise((r) => setTimeout(r, 5));

        useCases.getState().updateCase(id, { reason: "Chargeback disputed" });

        const updated = useCases.getState().cases[0];
        expect(updated.reason).toBe("Chargeback disputed");
        expect(updated.customer).toBe("Alice");
        expect(updated.updatedAt).not.toBe(before);
    });

    it("updateCaseStatus updates only the status", () => {
        useCases.getState().addCase(baseCaseInput());
        const id = useCases.getState().cases[0].id;

        useCases.getState().updateCaseStatus(id, "won");

        expect(useCases.getState().cases[0].status).toBe("won");
    });

    it("removeCase deletes the case by id", () => {
        useCases.getState().addCase(baseCaseInput());
        const id = useCases.getState().cases[0].id;

        useCases.getState().removeCase(id);

        expect(useCases.getState().cases).toHaveLength(0);
    });

    it("updateCase on an unknown id is a no-op", () => {
        useCases.getState().addCase(baseCaseInput());

        useCases.getState().updateCase("does-not-exist", { reason: "x" });

        expect(useCases.getState().cases).toHaveLength(1);
        expect(useCases.getState().cases[0].reason).toBe("Duplicate charge");
    });
});
