import { describe, expect, it } from "vitest";
import { validateCaseForm } from "./validateCaseForm";

function validInput() {
    return {
        customer: "Alice",
        amount: "42.50",
        reason: "Item not received",
        merchant: "My Store",
        deadline: "2030-01-01",
    };
}

describe("validateCaseForm", () => {
    it("returns no errors for valid input", () => {
        expect(validateCaseForm(validInput())).toEqual({});
    });

    it("requires a customer name", () => {
        const errors = validateCaseForm({ ...validInput(), customer: "   " });
        expect(errors.customer).toBeDefined();
    });

    it("rejects a non-numeric amount", () => {
        const errors = validateCaseForm({ ...validInput(), amount: "abc" });
        expect(errors.amount).toBeDefined();
    });

    it("rejects a zero or negative amount", () => {
        expect(validateCaseForm({ ...validInput(), amount: "0" }).amount).toBeDefined();
        expect(validateCaseForm({ ...validInput(), amount: "-5" }).amount).toBeDefined();
    });

    it("requires a reason and a merchant", () => {
        const errors = validateCaseForm({ ...validInput(), reason: "", merchant: "" });
        expect(errors.reason).toBeDefined();
        expect(errors.merchant).toBeDefined();
    });

    it("requires a valid deadline", () => {
        expect(validateCaseForm({ ...validInput(), deadline: "" }).deadline).toBeDefined();
        expect(
            validateCaseForm({ ...validInput(), deadline: "not-a-date" }).deadline
        ).toBeDefined();
    });
});
