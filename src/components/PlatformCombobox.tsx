import { useEffect, useRef, useState } from "react";

export default function PlatformCombobox({
    value,
    onChange,
    options,
    placeholder = "e.g. PayPal, Stripe, Shopify...",
    className = "",
}: {
    value: string;
    onChange: (value: string) => void;
    options: readonly string[];
    placeholder?: string;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const query = value.trim().toLowerCase();
    const filtered = query === ""
        ? options
        : options.filter((option) => option.toLowerCase().includes(query));

    function selectOption(option: string) {
        onChange(option);
        setOpen(false);
    }

    return (
        <div ref={containerRef} className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setOpen(true);
                    setHighlighted(0);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={(e) => {
                    if (!open || filtered.length === 0) return;
                    if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
                    } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setHighlighted((h) => Math.max(h - 1, 0));
                    } else if (e.key === "Enter" && filtered[highlighted]) {
                        e.preventDefault();
                        selectOption(filtered[highlighted]);
                    } else if (e.key === "Escape") {
                        setOpen(false);
                    }
                }}
                placeholder={placeholder}
                autoComplete="off"
                role="combobox"
                aria-expanded={open}
                aria-autocomplete="list"
                className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
            />

            {open && filtered.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto bg-white border rounded-lg shadow-lg text-sm">
                    {filtered.map((option, index) => (
                        <li
                            key={option}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                selectOption(option);
                            }}
                            className={`px-3 py-2 cursor-pointer ${index === highlighted ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                                }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
