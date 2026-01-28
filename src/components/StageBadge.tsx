import type { CaseStage } from "../types/case";

const stageColors: Record<CaseStage, string> = {
    inquiry: "bg-blue-100 text-blue-800",
    chargeback: "bg-orange-100 text-orange-800",
    "pre-arbitration": "bg-purple-100 text-purple-800",
    arbitration: "bg-red-100 text-red-800",
};

export default function StageBadge({ stage }: { stage: CaseStage }) {
    return (
        <span
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize tracking-wide ${stageColors[stage]}`}
        >
            {stage}
        </span>
    );
}
