import { useCases } from "../store/useCases";
import { useNavigate } from "react-router-dom";
import StageBadge from "../components/StageBadge";
import type { CaseStage } from "../types/case";
import { useState } from "react";
import StatusBadge from "../components/StatusBadge";




export default function Dashboard() {
    const { cases } = useCases();
    const [stageFilter, setStageFilter] = useState<CaseStage | "all">("all");
    const filteredCases =
        stageFilter === "all"
            ? cases
            : cases.filter((c) => c.stage === stageFilter);

    const navigate = useNavigate()

    function getDaysLeft(deadline: string) {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }



    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Cases</h1>
                <div className="flex gap-2">
                    {["all", "inquiry", "chargeback", "pre-arbitration", "arbitration"].map((stage) => (
                        <button
                            key={stage}
                            onClick={() => setStageFilter(stage as any)}
                            className={`px-3 py-1 rounded text-sm ${stageFilter === stage
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }`}
                        >
                            {stage === "all" ? "All" : stage}
                        </button>
                    ))}
                </div>


                <a
                    href="/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + New Case
                </a>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Stage</th>
                            <th className="p-3">Actions</th>
                            <th className="p-3">Deadline</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCases.map((c) => (
                            <tr key={c.id} className="border-b">
                                <td className="p-3">{c.id}</td>
                                <td className="p-3">{c.customer}</td>
                                <td className="p-3">${c.amount.toFixed(2)}</td>
                                <td className="p-3">
                                    <td className="p-3">
                                        <StatusBadge status={c.status} />
                                    </td>

                                </td>
                                <td className="p-3">
                                    <StageBadge stage={c.stage} />
                                </td>

                                <td className="p-3">
                                    <button
                                        onClick={() => navigate(`/case/${c.id}`)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </button>

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

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
