import { useParams, useNavigate } from "react-router-dom";
import { useCases } from "../store/useCases";
import TimelineAccordion from "../components/TimelineAccordion";
import EvidenceList from "../components/EvidenceList";
import EvidenceUpload from "../components/EvidenceUpload";
import AddNote from "../components/AddNote";
import CaseStatusSelector from "../components/CaseStatusSelector";
import CaseStageSelector from "../components/CaseStageSelector";
import CaseMeta from "../components/CaseMeta";
import CaseHeader from "../components/CaseHeader";
import CaseActions from "../components/CaseAction";
import ConfirmModal from "../components/ConfirmModal";
import EvidenceModal from "../components/EvidenceModal";
import { useState } from "react";
import CaseSummaryPanel from "../components/CaseSummaryPanel";

export default function CaseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { cases, updateCase, removeCase } = useCases();
    const item = cases.find((c) => c.id === id);

    const [showConfirm, setShowConfirm] = useState(false);
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);

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

    return (
        <div className="max-w-2xl mx-auto bg-white p-10 shadow rounded-lg space-y-10">

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight">Case Details</h1>

            {/* Summary */}
            <CaseSummaryPanel
                deadline={item.deadline}
                evidenceCount={item.evidence.length}
                lastUpdated={item.updatedAt}
                stage={item.stage}
            />

            {/* Header */}
            <CaseHeader
                stage={item.stage}
                status={item.status}
                deadline={item.deadline}
            />

            {/* Meta */}
            <CaseMeta item={item} />

            {/* Stage Selector */}
            <div className="space-y-2">
                <CaseStageSelector
                    item={item}
                    onChange={(newStage) => {
                        updateCase(item.id, {
                            stage: newStage,
                            timeline: [
                                ...item.timeline,
                                {
                                    id: crypto.randomUUID(),
                                    message: `Stage changed from ${item.stage} to ${newStage}`,
                                    timestamp: new Date().toISOString(),
                                    actor: "merchant",
                                },
                            ],
                        });
                    }}
                />
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
                <CaseStatusSelector
                    status={item.status}
                    onChange={(newStatus) => {
                        updateCase(item.id, {
                            status: newStatus,
                            timeline: [
                                ...item.timeline,
                                {
                                    id: crypto.randomUUID(),
                                    message: `Status changed from ${item.status} to ${newStatus}`,
                                    timestamp: new Date().toISOString(),
                                    actor: "merchant",
                                },
                            ],
                            updatedAt: new Date().toISOString(),
                        });
                    }}
                />
            </div>

            {/* Evidence Upload */}
            <div className="space-y-2">
                <label className="font-medium text-gray-700">Upload Evidence</label>
                <EvidenceUpload
                    onUpload={(newEvidenceItems) => {
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

            {/* Evidence List */}
            <EvidenceList
                evidence={item.evidence}
                onView={(index) => setViewerIndex(index)}
                onDelete={(ev) => {
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
            />

            {/* Add Note */}
            <AddNote
                onAdd={(noteText) => {
                    const newEvent = {
                        id: crypto.randomUUID(),
                        message: noteText,
                        timestamp: new Date().toISOString(),
                        actor: "merchant" as const,
                    };

                    updateCase(item.id, {
                        timeline: [...item.timeline, newEvent],
                    });
                }}
            />

            {/* Timeline */}
            <TimelineAccordion timeline={item.timeline} />

            {/* Actions */}
            <CaseActions
                onEdit={() => navigate(`/case/${item.id}/edit`)}
                onDelete={() => setShowConfirm(true)}
            />

            {/* Delete Confirmation */}
            {showConfirm && (
                <ConfirmModal
                    title="Delete Case"
                    message="Are you sure you want to delete this case? This action cannot be undone."
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        removeCase(item.id);
                        navigate("/");
                    }}
                />
            )}

            {/* Evidence Viewer Modal */}
            {viewerIndex !== null && (
                <EvidenceModal
                    item={item.evidence[viewerIndex]}
                    onClose={() => setViewerIndex(null)}
                    onDelete={() => {
                        updateCase(item.id, {
                            evidence: item.evidence.filter((_, i) => i !== viewerIndex),
                            timeline: [
                                ...item.timeline,
                                {
                                    id: crypto.randomUUID(),
                                    message: `Evidence removed: ${item.evidence[viewerIndex].filename}`,
                                    timestamp: new Date().toISOString(),
                                    actor: "merchant",
                                },
                            ],
                        });
                        setViewerIndex(null);
                    }}
                    onNext={() =>
                        setViewerIndex((prev) =>
                            prev! + 1 < item.evidence.length ? prev! + 1 : 0
                        )
                    }
                    onPrev={() =>
                        setViewerIndex((prev) =>
                            prev! - 1 >= 0 ? prev! - 1 : item.evidence.length - 1
                        )
                    }
                />
            )}
        </div>
    );
}
