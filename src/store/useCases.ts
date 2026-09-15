import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CaseItem, CaseStatus } from "../types/case";

interface CaseStore {
    cases: CaseItem[];
    addCase: (data: Omit<CaseItem, "id">) => void;
    updateCase: (id: string, data: Partial<CaseItem>) => void;
    removeCase: (id: string) => void;
    updateCaseStatus: (id: string, status: CaseStatus) => void;
}

export const useCases = create<CaseStore>()(
    persist(
        (set) => ({
            cases: [],

            updateCaseStatus: (id, status) =>
                set((state) => ({
                    cases: state.cases.map((c) =>
                        c.id === id
                            ? { ...c, status, updatedAt: new Date().toISOString() }
                            : c
                    ),
                })),

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
        }),
        {
            name: "chargeback-manager-cases",

        }
    )
);
