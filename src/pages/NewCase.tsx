import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCases } from "../store/useCases";
import type { CaseStatus, CaseStage } from "../types/case";
import CaseStatusSelector from "../components/CaseStatusSelector";
import CaseStageSelector from "../components/CaseStageSelector";

export default function NewCase() {
    const navigate = useNavigate();
    const addCase = useCases((state) => state.addCase);

    const [customer, setCustomer] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<CaseStatus>("open");
    const [reason, setReason] = useState("");
    const [merchant, setMerchant] = useState("");
    const [deadline, setDeadline] = useState("");
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
            deadline: new Date(deadline).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            evidence: [],
            timeline: [
                {
                    id: crypto.randomUUID(),
                    message: "Case created",
                    timestamp: new Date().toISOString(),
                    actor: "system",
                },
            ],
        });

        navigate("/");
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-10 shadow rounded-lg space-y-10">
            <h1 className="text-3xl font-bold tracking-tight">Create New Case</h1>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Customer */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Amount ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <CaseStatusSelector status={status} onChange={setStatus} />
                </div>

                {/* Reason */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Reason</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        placeholder="Unauthorized transaction"
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Merchant */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Merchant</label>
                    <input
                        type="text"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        required
                        placeholder="My Online Store"
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Stage */}
                <div className="space-y-2">
                    <CaseStageSelector item={{ stage } as any} onChange={setStage} />
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Create Case
                </button>
            </form>
        </div>
    );
}
