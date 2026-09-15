export interface CaseFormInput {
    customer: string;
    amount: string;
    reason: string;
    merchant: string;
    platform: string;
    deadline: string;
}

export type CaseFormErrors = Partial<Record<keyof CaseFormInput, string>>;

export function validateCaseForm(input: CaseFormInput): CaseFormErrors {
    const errors: CaseFormErrors = {};

    if (!input.customer.trim()) {
        errors.customer = "Customer name is required.";
    }

    const amountNumber = Number(input.amount);
    if (input.amount.trim() === "" || Number.isNaN(amountNumber)) {
        errors.amount = "Enter a valid amount.";
    } else if (amountNumber <= 0) {
        errors.amount = "Amount must be greater than 0.";
    }

    if (!input.reason.trim()) {
        errors.reason = "Reason is required.";
    }

    if (!input.merchant.trim()) {
        errors.merchant = "Merchant is required.";
    }

    if (!input.platform.trim()) {
        errors.platform = "Platform is required.";
    }

    if (!input.deadline.trim()) {
        errors.deadline = "Deadline is required.";
    } else if (Number.isNaN(new Date(input.deadline).getTime())) {
        errors.deadline = "Enter a valid date.";
    }

    return errors;
}
