import { create } from "zustand";
import type { CaseItem, CaseStatus } from "../types/case";

interface CaseStore {
    cases: CaseItem[];
    addCase: (data: Omit<CaseItem, "id">) => void;
    updateCase: (id: string, data: Partial<CaseItem>) => void;
    removeCase: (id: string) => void;
    updateCaseStatus: (id: string, status: CaseStatus) => void;
}

export const useCases = create<CaseStore>((set) => ({
    cases: [
        {
            id: "1",
            customer: "John Doe",
            amount: 120,
            status: "pending",
            reason: "Unauthorized transaction",
            merchant: "My Online Store",
            stage: "inquiry",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            evidence: [],
            timeline: [],
        },
        {
            id: "2",
            customer: "Jane Smith",
            amount: 89,
            status: "open",
            reason: "Item not received",
            merchant: "My Online Store",
            stage: "chargeback",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            evidence: [],
            timeline: [],
        },
    ],

    // Update only the status (used by CaseStatusSelector)
    updateCaseStatus: (id, status) =>
        set((state) => ({
            cases: state.cases.map((c) =>
                c.id === id
                    ? { ...c, status, updatedAt: new Date().toISOString() }
                    : c
            ),
        })),

    // Add a new case
    addCase: (data) =>
        set((state) => ({
            cases: [
                ...state.cases,
                {
                    id: crypto.randomUUID(),
                    ...data,
                },
            ],
        })),

    // Generic update — accepts Partial<CaseItem>
    updateCase: (id, data) =>
        set((state) => ({
            cases: state.cases.map((c) =>
                c.id === id
                    ? { ...c, ...data, updatedAt: new Date().toISOString() }
                    : c
            ),
        })),

    // Remove a case
    removeCase: (id) =>
        set((state) => ({
            cases: state.cases.filter((c) => c.id !== id),
        })),
}));
