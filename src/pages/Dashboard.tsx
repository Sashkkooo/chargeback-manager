import { useCases } from "../store/useCases";

export default function Dashboard() {
    const { cases } = useCases();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Cases</h1>

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
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cases.map((c) => (
                            <tr key={c.id} className="border-b">
                                <td className="p-3">{c.id}</td>
                                <td className="p-3">{c.customer}</td>
                                <td className="p-3">${c.amount.toFixed(2)}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-sm rounded ${c.status === "pending"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : c.status === "approved"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-800"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button className="text-blue-600 hover:underline">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
