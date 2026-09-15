import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { useCases } from "../store/useCases";
import type { CaseItem } from "../types/case";
import Dashboard from "./Dashboard";

function makeCase(overrides: Partial<CaseItem>): CaseItem {
    return {
        id: crypto.randomUUID(),
        customer: "Alice",
        amount: 10,
        status: "open",
        reason: "Item not received",
        merchant: "Store",
        platform: "Stripe",
        stage: "inquiry",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deadline: new Date().toISOString(),
        evidence: [],
        timeline: [],
        ...overrides,
    };
}

beforeEach(() => {
    localStorage.clear();
    useCases.setState({ cases: [] });
});

function renderDashboard() {
    return render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );
}

describe("Dashboard", () => {
    it("shows an empty state when there are no cases at all", () => {
        renderDashboard();

        expect(screen.getByText("No cases yet")).toBeInTheDocument();
    });

    it("lists cases and shows a no-match empty state when filters exclude everything", async () => {
        useCases.setState({
            cases: [
                makeCase({ customer: "Alice Johnson", stage: "inquiry" }),
                makeCase({ customer: "Bob Smith", stage: "arbitration" }),
            ],
        });

        renderDashboard();

        expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
        expect(screen.getByText("Bob Smith")).toBeInTheDocument();

        await userEvent.type(
            screen.getByPlaceholderText(/search by customer/i),
            "nobody-matches-this"
        );

        expect(screen.getByText("No cases match your filters")).toBeInTheDocument();
        expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });

    it("filters by stage via the quick filter buttons", async () => {
        useCases.setState({
            cases: [
                makeCase({ customer: "Alice Johnson", stage: "inquiry" }),
                makeCase({ customer: "Bob Smith", stage: "arbitration" }),
            ],
        });

        renderDashboard();

        await userEvent.click(screen.getByRole("button", { name: "arbitration" }));

        expect(screen.getByText("Bob Smith")).toBeInTheDocument();
        expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });

    it("filters by platform via the platform dropdown", async () => {
        useCases.setState({
            cases: [
                makeCase({ customer: "Alice Johnson", platform: "PayPal" }),
                makeCase({ customer: "Bob Smith", platform: "Stripe" }),
            ],
        });

        renderDashboard();

        await userEvent.selectOptions(screen.getByDisplayValue("All Platforms"), "PayPal");

        expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
        expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
    });

    it("matches platform in the free-text search", async () => {
        useCases.setState({
            cases: [
                makeCase({ customer: "Alice Johnson", platform: "PayPal" }),
                makeCase({ customer: "Bob Smith", platform: "Stripe" }),
            ],
        });

        renderDashboard();

        await userEvent.type(screen.getByPlaceholderText(/search by customer/i), "stripe");

        expect(screen.getByText("Bob Smith")).toBeInTheDocument();
        expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });
});
