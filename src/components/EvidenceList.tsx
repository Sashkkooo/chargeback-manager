import type { EvidenceItem } from "../types/case";

export default function EvidenceList({
    evidence,
    onDelete,
    onView,
}: {
    evidence: EvidenceItem[];
    onDelete: (ev: EvidenceItem) => void;
    onView?: (index: number) => void;
}) {
    if (evidence.length === 0) {
        return (
            <p className="text-gray-500 italic text-sm">
                No evidence uploaded
            </p>
        );
    }

    return (
        <ul className="space-y-3 mt-4">
            {evidence.map((ev, index) => (
                <li
                    key={ev.id}
                    onClick={() => onView?.(index)}
                    className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm 
                               cursor-pointer hover:bg-gray-50 transition"
                >
                    {/* Thumbnail */}
                    <div>
                        {ev.type.startsWith("image/") ? (
                            <img
                                src={ev.url}
                                alt={ev.filename}
                                className="w-20 h-20 object-cover rounded-lg border"
                            />
                        ) : (
                            <div className="w-20 h-20 flex items-center justify-center border rounded-lg bg-gray-100 text-gray-600 text-sm">
                                {ev.type.includes("pdf") ? "📄 PDF" : "📦 File"}
                            </div>
                        )}
                    </div>

                    {/* Filename */}
                    <div className="flex-1">
                        <span className="text-blue-600 underline break-all font-medium">
                            {ev.filename}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                            {ev.type}
                        </p>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(ev);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
