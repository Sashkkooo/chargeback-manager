import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import PlatformCombobox from "./PlatformCombobox";

const PLATFORMS = ["PayPal", "Stripe", "Shopify"] as const;

function Controlled({ onChange }: { onChange: (v: string) => void }) {
    const [value, setValue] = useState("");
    return (
        <PlatformCombobox
            value={value}
            onChange={(v) => {
                setValue(v);
                onChange(v);
            }}
            options={PLATFORMS}
        />
    );
}

describe("PlatformCombobox", () => {
    it("shows all options on focus", async () => {
        render(<Controlled onChange={() => {}} />);

        await userEvent.click(screen.getByRole("combobox"));

        expect(screen.getByText("PayPal")).toBeInTheDocument();
        expect(screen.getByText("Stripe")).toBeInTheDocument();
        expect(screen.getByText("Shopify")).toBeInTheDocument();
    });

    it("filters suggestions as the user types (e.g. 'Pay' -> PayPal)", async () => {
        const onChange = vi.fn();
        render(<PlatformCombobox value="Pay" onChange={onChange} options={PLATFORMS} />);

        await userEvent.click(screen.getByRole("combobox"));

        expect(screen.getByText("PayPal")).toBeInTheDocument();
        expect(screen.queryByText("Stripe")).not.toBeInTheDocument();
        expect(screen.queryByText("Shopify")).not.toBeInTheDocument();
    });

    it("calls onChange with the picked option when clicked", async () => {
        const onChange = vi.fn();
        render(<PlatformCombobox value="Pay" onChange={onChange} options={PLATFORMS} />);

        await userEvent.click(screen.getByRole("combobox"));
        await userEvent.click(screen.getByText("PayPal"));

        expect(onChange).toHaveBeenCalledWith("PayPal");
    });

    it("allows free text that isn't in the options list", async () => {
        const onChange = vi.fn();
        render(<Controlled onChange={onChange} />);

        await userEvent.type(screen.getByRole("combobox"), "MyCustomProcessor");

        expect(onChange).toHaveBeenLastCalledWith("MyCustomProcessor");
        expect(screen.getByRole("combobox")).toHaveValue("MyCustomProcessor");
    });
});
