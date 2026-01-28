import StageProgressBar from "./StageProggressBar";
import StageBadge from "./StageBadge";
import StatusBadge from "./StatusBadge";
import DeadlineTimer from "./DeadlineTimer";
import type { CaseStage, CaseStatus } from "../types/case";

export default function CaseHeader({
    stage,
    status,
    deadline,
}: {
    stage: CaseStage;
    status: CaseStatus;
    deadline: string;
}) {
    return (
        <div className="space-y-3">
            <StageProgressBar stage={stage} />

            <div className="flex items-center gap-3">
                <StageBadge stage={stage} />
                <StatusBadge status={status} />
            </div>

            <DeadlineTimer deadline={deadline} />
        </div>
    );
}
