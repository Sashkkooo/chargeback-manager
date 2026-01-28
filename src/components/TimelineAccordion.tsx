import { useState } from "react";
import type { TimelineEvent } from "../types/case";

export default function TimelineAccordion({ timeline }: { timeline: TimelineEvent[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-6">
            <button
                onClick={() => setOpen(!open)}
                className="font-semibold text-blue-600"
            >
                Timeline {open ? "▲" : "▼"}
            </button>

            {open && (
                <div className="mt-3 space-y-3">
                    {timeline.map((t) => (
                        <div key={t.id} className="p-3 border rounded">
                            <p className="text-sm">{t.message}</p>
                            <p className="text-xs text-gray-500">{t.timestamp}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
