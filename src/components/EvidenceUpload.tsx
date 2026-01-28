import { useState } from "react";
import type { EvidenceItem } from "../types/case";

export default function EvidenceUpload({
    onUpload,
}: {
    onUpload: (items: EvidenceItem[]) => void;
}) {
    const [isDrag, setIsDrag] = useState(false);

    function handleFiles(files: File[]) {
        if (files.length === 0) return;

        const newEvidenceItems: EvidenceItem[] = files.map((file) => ({
            id: crypto.randomUUID(),
            filename: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
        }));

        onUpload(newEvidenceItems);
    }

    return (
        <div
            className={`mt-4 p-6 border-2 border-dashed rounded text-center transition cursor-pointer ${isDrag ? "border-blue-500 bg-blue-50" : "border-gray-400"
                }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDrag(true)}
            onDragLeave={() => setIsDrag(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDrag(false);
                handleFiles(Array.from(e.dataTransfer.files));
            }}
            onClick={() => document.getElementById("fileUploadInput")?.click()}
        >
            <p className="text-gray-600">Drag & Drop evidence here</p>
            <p className="text-sm text-gray-400">or click to select files</p>

            <input
                id="fileUploadInput"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(Array.from(e.target.files || []))}
            />
        </div>
    );
}
