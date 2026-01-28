import { useState } from "react";
import { format } from "date-fns";
import type { TimelineEvent } from "../types/case";

export default function TimelineAccordion({
    timeline,
}: {
    timeline: TimelineEvent[];
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-6">

            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="font-semibold text-blue-600 hover:text-blue-800 transition"
            >
                Timeline {open ? "▲" : "▼"}
            </button>

            {/* Accordion content */}
            {open && (
                <div className="mt-4 relative border-l border-gray-300 pl-6 space-y-6">

                    {timeline.map((t) => (
                        <div key={t.id} className="relative">

                            {/* Bullet */}
                            <div className="absolute -left-3 top-2 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow" />

                            {/* Card */}
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium capitalize text-gray-900">
                                        {t.actor}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {format(new Date(t.timestamp), "dd MMM yyyy, HH:mm")}
                                    </span>
                                </div>

                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {t.message}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}
