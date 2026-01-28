import { useEffect } from "react";

export default function EvidenceModal({
    item,
    onClose,
    onDelete,
    onNext,
    onPrev,
}: {
    item: { id: string; filename: string; url: string; type: string };
    onClose: () => void;
    onDelete: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    // Close on ESC
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const isImage = item.type.startsWith("image/");
    const isPDF = item.type === "application/pdf";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-6 relative space-y-6">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-light transition"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight break-all pr-10">
                    {item.filename}
                </h2>

                {/* Preview */}
                <div className="flex justify-center items-center h-[65vh] bg-gray-100 rounded-lg overflow-hidden border">
                    {isImage && (
                        <img
                            src={item.url}
                            alt={item.filename}
                            className="max-h-full max-w-full object-contain"
                        />
                    )}

                    {isPDF && (
                        <iframe
                            src={item.url}
                            className="w-full h-full rounded-lg"
                        />
                    )}

                    {!isImage && !isPDF && (
                        <p className="text-gray-600 text-sm">Preview not available</p>
                    )}
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center pt-2">

                    {/* Prev */}
                    <button
                        onClick={onPrev}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                        ← Prev
                    </button>

                    {/* Middle actions */}
                    <div className="flex gap-3">
                        <a
                            href={item.url}
                            download={item.filename}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Download
                        </a>

                        <button
                            onClick={onDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                        >
                            Delete
                        </button>
                    </div>

                    {/* Next */}
                    <button
                        onClick={onNext}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}
