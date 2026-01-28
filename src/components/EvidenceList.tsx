import type { EvidenceItem } from "../types/case";

export default function EvidenceList({
    evidence,
    onDelete,
}: {
    evidence: EvidenceItem[];
    onDelete: (ev: EvidenceItem) => void;
}) {
    if (evidence.length === 0) {
        return <p className="text-gray-500">No evidence uploaded</p>;
    }

    return (
        <ul className="space-y-3 mt-4">
            {evidence.map((ev) => (
                <li key={ev.id} className="flex items-center gap-4 p-3 border rounded bg-white">

                    {/* THUMBNAIL */}
                    <a href={ev.url} target="_blank" className="block">
                        {ev.type.startsWith("image/") ? (
                            <img
                                src={ev.url}
                                alt={ev.filename}
                                className="w-20 h-20 object-cover rounded border"
                            />
                        ) : (
                            <div className="w-20 h-20 flex items-center justify-center border rounded bg-gray-100 text-gray-600 text-sm">
                                {ev.type.includes("pdf") ? "📄 PDF" : "📦 File"}
                            </div>
                        )}
                    </a>

                    {/* FILENAME */}
                    <div className="flex-1">
                        <a
                            href={ev.url}
                            target="_blank"
                            className="text-blue-600 underline break-all"
                        >
                            {ev.filename}
                        </a>
                    </div>

                    {/* DELETE BUTTON */}
                    <button
                        onClick={() => onDelete(ev)}
                        className="text-red-600 hover:text-red-800 text-sm"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
