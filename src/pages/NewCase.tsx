import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCases } from "../store/useCases";
import type { CaseStatus, CaseStage } from "../types/case";

export default function NewCase() {
    const navigate = useNavigate();
    const addCase = useCases((state) => state.addCase);

    const [customer, setCustomer] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<CaseStatus>("pending");

    const [reason, setReason] = useState("");
    const [merchant, setMerchant] = useState("");
    const [stage, setStage] = useState<CaseStage>("inquiry");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addCase({
            customer,
            amount: Number(amount),
            status,
            reason,
            merchant,
            stage,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            evidence: [],
            timeline: [],
        });

        navigate("/");
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 shadow rounded space-y-6">
            <h1 className="text-3xl font-bold">Create New Case</h1>

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
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
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
                        placeholder="Unauthorized transaction"
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
                        placeholder="My Online Store"
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
                    Create Case
                </button>
            </form>
        </div>
    );
}
