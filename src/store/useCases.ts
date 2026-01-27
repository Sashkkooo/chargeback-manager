import { create } from "zustand";

export type CaseStatus = "pending" | "approved" | "rejected";

export interface CaseItem {
    id: string;
    customer: string;
    amount: number;
    status: CaseStatus;
}

interface CaseStore {
    cases: CaseItem[];
    addCase: (data: Omit<CaseItem, "id">) => void;
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
        },
        {
            id: "2",
            customer: "Jane Smith",
            amount: 89,
            status: "approved",
        },
    ],

    addCase: (data) =>
        set((state) => ({
            cases: [
                ...state.cases,
                { id: crypto.randomUUID(), ...data }
            ],
        })),

    updateCase: (id, data) =>
        set((state) => ({
            cases: state.cases.map((c) =>
                c.id === id ? { ...c, ...data } : c
            ),
        })),

    removeCase: (id) =>
        set((state) => ({
            cases: state.cases.filter((c) => c.id !== id),
        })),
}));
