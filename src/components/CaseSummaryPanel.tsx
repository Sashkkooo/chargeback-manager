import { differenceInDays } from "date-fns";

export default function CaseSummaryPanel({
    deadline,
    evidenceCount,
    lastUpdated,
    stage,
}: {
    deadline: string;
    evidenceCount: number;
    lastUpdated: string;
    stage: string;
}) {
    const daysLeft = differenceInDays(new Date(deadline), new Date());

    let color = "bg-green-100 text-green-700";
    if (daysLeft <= 10) color = "bg-yellow-100 text-yellow-700";
    if (daysLeft <= 5) color = "bg-red-100 text-red-700";

    return (
        <div className="p-6 border rounded-lg bg-gray-50 shadow-sm space-y-6">

            <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
                Case Summary
            </h2>

            {/* Days Left */}
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Days Left</span>
                <span
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${color}`}
                >
                    {daysLeft} days
                </span>
            </div>

            {/* Evidence Count */}
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Evidence Items</span>
                <span className="font-semibold text-gray-900">{evidenceCount}</span>
            </div>

            {/* Stage */}
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Stage</span>
                <span className="font-semibold capitalize text-gray-900">{stage}</span>
            </div>

            {/* Last Updated */}
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-semibold text-gray-900">
                    {new Date(lastUpdated).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}
