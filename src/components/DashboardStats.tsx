import type { CaseItem } from "../types/case";

function StatTile({
    label,
    value,
    valueClassName = "text-gray-900",
}: {
    label: string;
    value: string;
    valueClassName?: string;
}) {
    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-1">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className={`text-2xl font-semibold ${valueClassName}`}>{value}</p>
        </div>
    );
}

export default function DashboardStats({ cases }: { cases: CaseItem[] }) {
    const total = cases.length;
    const won = cases.filter((c) => c.status === "won").length;
    const lost = cases.filter((c) => c.status === "lost").length;
    const resolved = won + lost;
    const winRate = resolved === 0 ? null : Math.round((won / resolved) * 100);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatTile label="Total cases" value={String(total)} />
            <StatTile label="Won" value={String(won)} valueClassName="text-green-600" />
            <StatTile label="Lost" value={String(lost)} valueClassName="text-red-600" />
            <StatTile
                label="Win rate"
                value={winRate === null ? "—" : `${winRate}%`}
                valueClassName="text-blue-600"
            />
        </div>
    );
}
