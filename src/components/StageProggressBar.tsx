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
        <div className="py-4">
            <div className="flex items-center justify-between relative">

                {/* Horizontal line behind the steps */}
                <div className="absolute top-2 left-0 right-0 h-1 bg-gray-200 rounded" />

                {stages.map((s, index) => {
                    const isCompleted = index < currentIndex;
                    const isCurrent = index === currentIndex;

                    const dotColor = isCompleted
                        ? "bg-green-500"
                        : isCurrent
                        ? "bg-blue-600"
                        : "bg-gray-300";

                    const labelColor = isCurrent
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600";

                    return (
                        <div
                            key={s}
                            className="flex-1 flex flex-col items-center relative z-10"
                        >
                            {/* Step dot */}
                            <div
                                className={`w-5 h-5 rounded-full border-2 border-white shadow ${dotColor}`}
                            />

                            {/* Label */}
                            <span
                                className={`mt-2 text-xs capitalize tracking-wide ${labelColor}`}
                            >
                                {s}
                            </span>

                            {/* Progress line segment */}
                            {index < stages.length - 1 && (
                                <div
                                    className={`
                                        absolute top-2 left-1/2 h-1 w-full
                                        ${isCompleted ? "bg-green-500" : "bg-gray-200"}
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
