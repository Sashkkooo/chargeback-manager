import { useParams, useNavigate } from "react-router-dom";
import { useCases } from "../store/useCases";
import { useState } from "react";
import type { CaseStage } from "../types/case";
import StageBadge from "../components/StageBadge";


export default function CaseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isDrag, setIsDrag] = useState(false);
    const [note, setNote] = useState("");
    const [showTimeline, setShowTimeline] = useState(false);


    const { cases, removeCase, updateCase } = useCases();
    const item = cases.find((c) => c.id === id);

    if (!item) {
        return (
            <div className="p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-4">Case not found</h1>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const handleDelete = () => {
        removeCase(item.id);
        navigate("/");
    };


    const stages: CaseStage[] = [
        "inquiry",
        "chargeback",
        "pre-arbitration",
        "arbitration",
    ];


    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded space-y-6">
            <h1 className="text-3xl font-bold">Case Details</h1>

            <div className="mt-4">
                <div className="flex items-center justify-between">
                    {stages.map((stage, index) => {
                        const currentIndex = stages.indexOf(item.stage);
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;

                        return (
                            <div key={stage} className="flex-1 flex flex-col items-center">
                                {/* Circle */}
                                <div
                                    className={`
              w-4 h-4 rounded-full 
              ${isCompleted ? "bg-green-500" : ""}
              ${isCurrent ? "bg-blue-600" : ""}
              ${!isCompleted && !isCurrent ? "bg-gray-300" : ""}
            `}
                                />

                                {/* Label */}
                                <span
                                    className={`
              mt-2 text-xs 
              ${isCurrent ? "font-bold text-blue-600" : "text-gray-600"}
            `}
                                >
                                    {stage}
                                </span>

                                {/* Line connector */}
                                {index < stages.length - 1 && (
                                    <div
                                        className={`
                h-1 w-full mt-2
                ${isCompleted ? "bg-green-500" : "bg-gray-300"}
              `}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BASIC INFO */}
            <div className="space-y-2">
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Customer:</strong> {item.customer}</p>
                <p><strong>Amount:</strong> ${item.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {item.status}</p>
            </div>

            {/* DISPUTE INFO */}
            <div className="space-y-2">
                <p><strong>Reason:</strong> {item.reason}</p>
                <p><strong>Merchant:</strong> {item.merchant}</p>
                <p>
                    <strong>Stage:</strong>
                    <StageBadge stage={item.stage} />
                </p>

            </div>

            {/* DATES */}
            <div className="space-y-2">
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
            </div>

            <div className="mt-4">
                <label className="block font-semibold mb-1">Stage</label>
                <select
                    value={item.stage}
                    onChange={(e) => {
                        const newStage = e.target.value as CaseStage;

                        updateCase(item.id, {
                            stage: newStage,
                            timeline: [
                                ...item.timeline,
                                {
                                    id: crypto.randomUUID(),
                                    message: `Stage changed from ${item.stage} to ${newStage}`,
                                    timestamp: new Date().toISOString(),
                                    actor: "merchant" as const,
                                },
                            ],
                        });
                    }}
                    className="border rounded p-2 w-full"
                >
                    <option value="inquiry">Inquiry</option>
                    <option value="chargeback">Chargeback</option>
                    <option value="pre-arbitration">Pre-Arbitration</option>
                    <option value="arbitration">Arbitration</option>
                </select>
            </div>


            {/* EVIDENCE */}
            {/* EVIDENCE UPLOAD (Drag & Drop + Multiple Files) */}
            <div
                className={`mt-4 p-6 border-2 border-dashed rounded text-center transition cursor-pointer ${isDrag ? "border-blue-500 bg-blue-50" : "border-gray-400"
                    }`}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDrag(true)}
                onDragLeave={() => setIsDrag(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDrag(false);

                    const files = Array.from(e.dataTransfer.files);
                    if (files.length === 0) return;

                    const newEvidenceItems = files.map((file) => ({
                        id: crypto.randomUUID(),
                        filename: file.name,
                        url: URL.createObjectURL(file),
                        type: file.type,
                    }));

                    updateCase(item.id, {
                        evidence: [...item.evidence, ...newEvidenceItems],
                        timeline: [
                            ...item.timeline,
                            ...newEvidenceItems.map((ev) => ({
                                id: crypto.randomUUID(),
                                message: `Evidence uploaded: ${ev.filename}`,
                                timestamp: new Date().toISOString(),
                                actor: "merchant" as const,
                            })),
                        ],
                    });
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
                    onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;

                        const newEvidenceItems = files.map((file) => ({
                            id: crypto.randomUUID(),
                            filename: file.name,
                            url: URL.createObjectURL(file),
                            type: file.type,
                        }));

                        updateCase(item.id, {
                            evidence: [...item.evidence, ...newEvidenceItems],
                            timeline: [
                                ...item.timeline,
                                ...newEvidenceItems.map((ev) => ({
                                    id: crypto.randomUUID(),
                                    message: `Evidence uploaded: ${ev.filename}`,
                                    timestamp: new Date().toISOString(),
                                    actor: "merchant" as const,
                                })),
                            ],
                        });
                    }}
                />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Evidence</h2>

                {item.evidence.length === 0 ? (
                    <p className="text-gray-500">No evidence uploaded</p>
                ) : (
                    <ul className="space-y-3">
                        {item.evidence.map((ev) => (
                            <li key={ev.id} className="flex items-center gap-4">

                                {/* THUMBNAIL + LINK */}
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

                                {/* FILENAME LINK */}
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
                                    onClick={() => {
                                        const updatedEvidence = item.evidence.filter((e) => e.id !== ev.id);

                                        updateCase(item.id, {
                                            evidence: updatedEvidence,
                                            timeline: [
                                                ...item.timeline,
                                                {
                                                    id: crypto.randomUUID(),
                                                    message: `Evidence removed: ${ev.filename}`,
                                                    timestamp: new Date().toISOString(),
                                                    actor: "merchant" as const,
                                                },
                                            ],
                                        });
                                    }}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* ADD NOTE */}
            <div className="mt-6 p-4 border rounded">
                <h3 className="font-semibold mb-2">Add Note</h3>

                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write your internal note here..."
                    className="w-full border rounded p-2 mb-3"
                    rows={3}
                />

                <button
                    onClick={() => {
                        if (!note.trim()) return;

                        const newEvent = {
                            id: crypto.randomUUID(),
                            message: note.trim(),
                            timestamp: new Date().toISOString(),
                            actor: "merchant" as const,
                        };

                        updateCase(item.id, {
                            timeline: [...item.timeline, newEvent],
                        });

                        setNote("");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Note
                </button>
            </div>

            {/* TIMELINE */}
            <div
                className="mt-6 p-4 border rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                onClick={() => setShowTimeline(!showTimeline)}
            >
                <h2 className="text-xl font-semibold flex justify-between items-center">
                    Timeline
                    <span className="text-gray-600 text-sm">
                        {showTimeline ? "▲" : "▼"}
                    </span>
                </h2>
            </div>
            {showTimeline && (
                <div className="mt-2">
                    {item.timeline.length === 0 ? (
                        <p className="text-gray-500">No timeline events</p>
                    ) : (
                        <ul className="space-y-2">
                            {item.timeline.map((t) => (
                                <li key={t.id} className="border p-3 rounded bg-white">
                                    <p>
                                        <strong>{t.actor}</strong> —{" "}
                                        {new Date(t.timestamp).toLocaleString()}
                                    </p>
                                    <p>{t.message}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate(`/case/${item.id}/edit`)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
