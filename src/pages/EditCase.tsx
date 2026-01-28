import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCases } from "../store/useCases";
import type { CaseStatus, CaseStage, TimelineEvent, TimelineActor } from "../types/case";

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
    const [deadline, setDeadline] = useState(item.deadline);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedCase: Partial<typeof item> = {
            customer,
            amount: Number(amount),
            status,
            reason,
            merchant,
            stage,
            deadline,
        };

        const changes = diffCase(item, updatedCase);

        const timelineEvents: TimelineEvent[] = changes.length > 0
            ? changes.map(msg => ({
                id: crypto.randomUUID(),
                message: msg,
                timestamp: new Date().toISOString(),
                actor: "merchant" as TimelineActor,
            }))
            : [
                {
                    id: crypto.randomUUID(),
                    message: "Case updated",
                    timestamp: new Date().toISOString(),
                    actor: "merchant" as TimelineActor,
                },
            ];

        updateCase(item.id, {
            ...item,
            ...updatedCase,
            timeline: [...item.timeline, ...timelineEvents],
        });

        navigate(`/case/${item.id}`);
    };

    function diffCase(oldCase: any, newCase: Partial<typeof oldCase>) {
        const changes: string[] = [];

        if (oldCase.customer !== newCase.customer) {
            changes.push(`Customer changed from "${oldCase.customer}" to "${newCase.customer}"`);
        }

        if (oldCase.amount !== newCase.amount) {
            changes.push(`Amount changed from ${oldCase.amount} to ${newCase.amount}`);
        }

        if (oldCase.status !== newCase.status) {
            changes.push(`Status changed from ${oldCase.status} to ${newCase.status}`);
        }

        if (oldCase.reason !== newCase.reason) {
            changes.push(`Reason changed from "${oldCase.reason}" to "${newCase.reason}"`);
        }

        if (oldCase.merchant !== newCase.merchant) {
            changes.push(`Merchant changed from "${oldCase.merchant}" to "${newCase.merchant}"`);
        }

        if (oldCase.stage !== newCase.stage) {
            changes.push(`Stage changed from ${oldCase.stage} to ${newCase.stage}`);
        }

        if (oldCase.deadline !== newCase.deadline) {
            changes.push(`Deadline changed from ${oldCase.deadline} to ${newCase.deadline}`);
        }

        return changes;
    }

    return (
        <div className="max-w-xl mx-auto bg-white p-10 shadow rounded-lg space-y-10">
            <h1 className="text-3xl font-bold tracking-tight">Edit Case</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
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

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as CaseStatus)}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Reason</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Merchant</label>
                    <input
                        type="text"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Stage</label>
                    <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value as CaseStage)}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="inquiry">Inquiry</option>
                        <option value="chargeback">Chargeback</option>
                        <option value="pre-arbitration">Pre-Arbitration</option>
                        <option value="arbitration">Arbitration</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
