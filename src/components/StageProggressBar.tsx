import type { CaseStage } from "../types/case";

const stages: CaseStage[] = [
    "inquiry",
    "chargeback",
    "pre-arbitration",
    "arbitration",
];

export default function StageProgressBar({ stage }: { stage: CaseStage }) {
    const currentIndex = stages.indexOf(stage);

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between">
                {stages.map((s, index) => {
                    const isCompleted = index < currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={s} className="flex-1 flex flex-col items-center relative">
                            <div
                                className={`
                  w-4 h-4 rounded-full z-10
                  ${isCompleted ? "bg-green-500" : ""}
                  ${isCurrent ? "bg-blue-600" : ""}
                  ${!isCompleted && !isCurrent ? "bg-gray-300" : ""}
                `}
                            />

                            <span
                                className={`
                  mt-2 text-xs text-center
                  ${isCurrent ? "font-bold text-blue-600" : "text-gray-600"}
                `}
                            >
                                {s}
                            </span>

                            {index < stages.length - 1 && (
                                <div
                                    className={`
                    absolute top-2 left-1/2 w-full h-1
                    ${isCompleted ? "bg-green-500" : "bg-gray-300"}
                  `}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
