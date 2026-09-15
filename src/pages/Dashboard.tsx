import { useCases } from "../store/useCases";
import { useNavigate } from "react-router-dom";
import StageBadge from "../components/StageBadge";
import StatusBadge from "../components/StatusBadge";
import DashboardStats from "../components/DashboardStats";
import type { CaseStage } from "../types/case";
import { useState } from "react";

export default function Dashboard() {
    const { cases } = useCases();
    const navigate = useNavigate();

    const [stageFilter, setStageFilter] = useState<CaseStage | "all">("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [search, setSearch] = useState("");

    function getDaysLeft(deadline: string) {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    const filteredCases = cases
        .filter((c) => stageFilter === "all" || c.stage === stageFilter)
        .filter((c) => statusFilter === "all" || c.status === statusFilter)
        .filter((c) =>
            search.trim() === ""
                ? true
                : c.customer.toLowerCase().includes(search.toLowerCase()) ||
                c.reason.toLowerCase().includes(search.toLowerCase()) ||
                c.merchant.toLowerCase().includes(search.toLowerCase())
        );

    const sortedCases = [...filteredCases].sort((a, b) => {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    return (
        <div className="space-y-10">

            <div className="flex items-center justify-between gap-3 flex-wrap">
                <h1 className="text-3xl font-bold tracking-tight">Cases</h1>

                <a
                    href="/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    + New Case
                </a>
            </div>

            <DashboardStats cases={cases} />

            <div className="flex items-center gap-2 flex-wrap">
                {(["all", "inquiry", "chargeback", "pre-arbitration", "arbitration"] as const).map(
                    (stage) => (
                        <button
                            key={stage}
                            onClick={() => setStageFilter(stage)}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition ${stageFilter === stage
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {stage === "all" ? "All" : stage}
                        </button>
                    )
                )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-3 md:gap-4 md:items-center">
                <select
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value as CaseStage | "all")}
                    className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="all">All Stages</option>
                    <option value="inquiry">Inquiry</option>
                    <option value="chargeback">Chargeback</option>
                    <option value="pre-arbitration">Pre-Arbitration</option>
                    <option value="arbitration">Arbitration</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="all">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="pending">Pending</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by customer, reason, merchant..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 text-sm flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {sortedCases.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-12 text-center space-y-3">
                    <p className="text-lg font-semibold text-gray-800">
                        {cases.length === 0
                            ? "No cases yet"
                            : "No cases match your filters"}
                    </p>
                    <p className="text-sm text-gray-500">
                        {cases.length === 0
                            ? "Create your first chargeback case to get started."
                            : "Try adjusting the search or filters above."}
                    </p>
                    {cases.length === 0 && (
                        <a
                            href="/new"
                            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            + New Case
                        </a>
                    )}
                </div>
            ) : (
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr className="text-sm text-gray-700">
                            <th className="p-3">ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Stage</th>
                            <th className="p-3">Deadline</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {sortedCases.map((c) => (
                            <tr
                                key={c.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-3 font-mono text-xs text-gray-500" title={c.id}>
                                    {c.id.slice(0, 8)}
                                </td>
                                <td className="p-3">{c.customer}</td>
                                <td className="p-3">${c.amount.toFixed(2)}</td>

                                <td className="p-3">
                                    <StatusBadge status={c.status} />
                                </td>

                                <td className="p-3">
                                    <StageBadge stage={c.stage} />
                                </td>

                                <td className="p-3">
                                    {(() => {
                                        const daysLeft = getDaysLeft(c.deadline);

                                        let color = "text-green-600";
                                        if (daysLeft <= 3 && daysLeft > 0) color = "text-yellow-600";
                                        if (daysLeft <= 0) color = "text-red-600";

                                        return (
                                            <span className={`font-semibold ${color}`}>
                                                {daysLeft > 0 ? `${daysLeft}d` : "Expired"}
                                            </span>
                                        );
                                    })()}
                                </td>

                                <td className="p-3">
                                    <button
                                        onClick={() => navigate(`/case/${c.id}`)}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}
