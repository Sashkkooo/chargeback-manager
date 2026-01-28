import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCases } from "../store/useCases";
import type { CaseStatus, CaseStage } from "../types/case";

export default function EditCase() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { cases, updateCase } = useCases();
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

    const [customer, setCustomer] = useState(item.customer);
    const [amount, setAmount] = useState(String(item.amount));
    const [status, setStatus] = useState<CaseStatus>(item.status);

    const [reason, setReason] = useState(item.reason);
    const [merchant, setMerchant] = useState(item.merchant);
    const [stage, setStage] = useState<CaseStage>(item.stage);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        updateCase(item.id, {
            customer,
            amount: Number(amount),
            status,
            reason,
            merchant,
            stage,
        });

        navigate(`/case/${item.id}`);
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 shadow rounded space-y-6">
            <h1 className="text-3xl font-bold">Edit Case</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Customer */}
                <div>
                    <label className="block mb-1 font-medium">Customer Name</label>
                    <input
                        type="text"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="block mb-1 font-medium">Amount ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as CaseStatus)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="pending">Open</option>
                        <option value="approved">Pending</option>
                        <option value="rejected">Won</option>
                        <option value="rejected">Lost</option>
                    </select>
                </div>

                {/* Reason */}
                <div>
                    <label className="block mb-1 font-medium">Reason</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Merchant */}
                <div>
                    <label className="block mb-1 font-medium">Merchant</label>
                    <input
                        type="text"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Stage */}
                <div>
                    <label className="block mb-1 font-medium">Stage</label>
                    <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value as CaseStage)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="inquiry">Inquiry</option>
                        <option value="chargeback">Chargeback</option>
                        <option value="pre-arbitration">Pre-Arbitration</option>
                        <option value="arbitration">Arbitration</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
