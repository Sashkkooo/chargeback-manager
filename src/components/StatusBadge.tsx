import type { CaseStatus } from "../types/case";

const statusColors: Record<CaseStatus, string> = {
    open: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    won: "bg-green-100 text-green-800",
    lost: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: CaseStatus }) {
    return (
        <span
            className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[status]}`}
        >
            {status}
        </span>
    );
}
