import { useParams, useNavigate } from "react-router-dom";
import { useCases } from "../store/useCases";

export default function CaseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { cases, removeCase } = useCases();
    const item = cases.find((c) => c.id === id);

    if (!item) {
        return (
            <div className="p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-4">Case not found</h1>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const handleDelete = () => {
        removeCase(item.id);
        navigate("/");
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded space-y-6">
            <h1 className="text-3xl font-bold">Case Details</h1>

            {/* BASIC INFO */}
            <div className="space-y-2">
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Customer:</strong> {item.customer}</p>
                <p><strong>Amount:</strong> ${item.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {item.status}</p>
            </div>

            {/* DISPUTE INFO */}
            <div className="space-y-2">
                <p><strong>Reason:</strong> {item.reason}</p>
                <p><strong>Merchant:</strong> {item.merchant}</p>
                <p><strong>Stage:</strong> {item.stage}</p>
            </div>

            {/* DATES */}
            <div className="space-y-2">
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
            </div>

            {/* EVIDENCE */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Evidence</h2>
                {item.evidence.length === 0 ? (
                    <p className="text-gray-500">No evidence uploaded</p>
                ) : (
                    <ul className="list-disc pl-6">
                        {item.evidence.map((ev) => (
                            <li key={ev.id}>
                                <a href={ev.url} className="text-blue-600 underline" target="_blank">
                                    {ev.filename}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* TIMELINE */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Timeline</h2>
                {item.timeline.length === 0 ? (
                    <p className="text-gray-500">No timeline events</p>
                ) : (
                    <ul className="space-y-2">
                        {item.timeline.map((t) => (
                            <li key={t.id} className="border p-3 rounded">
                                <p><strong>{t.actor}</strong> — {new Date(t.timestamp).toLocaleString()}</p>
                                <p>{t.message}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate(`/case/${item.id}/edit`)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
