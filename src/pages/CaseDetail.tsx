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


export default function CaseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { cases, updateCase, updateCaseStatus } = useCases();
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


    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded space-y-6">
            <h1 className="text-3xl font-bold">Case Details</h1>

            <CaseHeader
                stage={item.stage}
                status={item.status}
                deadline={item.deadline}
            />

            <CaseMeta item={item} />

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

            <CaseStatusSelector status={item.status} onChange={(newStatus) => updateCaseStatus(item.id, newStatus)} />

            {/* EVIDENCE UPLOAD */}
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

            {/* EVIDENCE LIST */}
            <EvidenceList
                evidence={item.evidence}
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

            {/* ADD NOTE */}
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

            {/* TIMELINE */}
            <TimelineAccordion timeline={item.timeline} />

        </div>
    );
}
