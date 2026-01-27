import { create } from "zustand";
import type {
    CaseItem,
} from "../types/case";

interface CaseStore {
    cases: CaseItem[];
    addCase: (data: Omit<CaseItem, "id" | "createdAt" | "updatedAt">) => void;
    updateCase: (id: string, data: Partial<CaseItem>) => void;
    removeCase: (id: string) => void;
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

            evidence: [],
            timeline: [],
        },
        {
            id: "2",
            customer: "Jane Smith",
            amount: 89,
            status: "approved",

            reason: "Item not received",
            merchant: "My Online Store",

            stage: "chargeback",

            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),

            evidence: [],
            timeline: [],
        },
    ],

    addCase: (data) =>
        set((state) => ({
            cases: [
                ...state.cases,
                {
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    ...data,
                },
            ],
        })),

    updateCase: (id, data) =>
        set((state) => ({
            cases: state.cases.map((c) =>
                c.id === id
                    ? { ...c, ...data, updatedAt: new Date().toISOString() }
                    : c
            ),
        })),

    removeCase: (id) =>
        set((state) => ({
            cases: state.cases.filter((c) => c.id !== id),
        })),
}));
