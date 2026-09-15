import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
    it.each([
        ["open", "text-blue-800"],
        ["pending", "text-yellow-800"],
        ["won", "text-green-800"],
        ["lost", "text-red-800"],
    ] as const)("renders the %s status with its color", (status, colorClass) => {
        render(<StatusBadge status={status} />);

        const badge = screen.getByText(status);
        expect(badge).toBeInTheDocument();
        expect(badge.className).toContain(colorClass);
    });
});
