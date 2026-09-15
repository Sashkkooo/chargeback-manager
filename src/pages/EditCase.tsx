import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCases } from "../store/useCases";
import type { CaseItem, CaseStatus, CaseStage, TimelineEvent, TimelineActor } from "../types/case";
import { validateCaseForm, type CaseFormErrors } from "../utils/validateCaseForm";
import PlatformCombobox from "../components/PlatformCombobox";
import { KNOWN_PLATFORMS } from "../constants/platforms";


function toDateInputValue(iso: string): string {
    const time = new Date(iso).getTime();
    return Number.isNaN(time) ? "" : iso.slice(0, 10);
}

export default function EditCase() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { cases, updateCase } = useCases();
    const item = cases.find((c) => c.id === id);

    const [customer, setCustomer] = useState(item?.customer ?? "");
    const [amount, setAmount] = useState(String(item?.amount ?? ""));
    const [status, setStatus] = useState<CaseStatus>(item?.status ?? "open");
    const [reason, setReason] = useState(item?.reason ?? "");
    const [merchant, setMerchant] = useState(item?.merchant ?? "");
    const [platform, setPlatform] = useState(item?.platform ?? "");
    const [stage, setStage] = useState<CaseStage>(item?.stage ?? "inquiry");
    const [deadline, setDeadline] = useState(item ? toDateInputValue(item.deadline) : "");
    const [errors, setErrors] = useState<CaseFormErrors>({});

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateCaseForm({ customer, amount, reason, merchant, platform, deadline });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const updatedCase: Partial<CaseItem> = {
            customer,
            amount: Number(amount),
            status,
            reason,
            merchant,
            platform,
            stage,
            deadline: new Date(deadline).toISOString(),
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

    function diffCase(oldCase: CaseItem, newCase: Partial<CaseItem>) {
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

        if (oldCase.platform !== newCase.platform) {
            changes.push(`Platform changed from "${oldCase.platform}" to "${newCase.platform}"`);
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
        <div className="max-w-xl mx-auto bg-white p-6 md:p-10 shadow rounded-lg space-y-8 md:space-y-10">
            <h1 className="text-3xl font-bold tracking-tight">Edit Case</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        aria-invalid={!!errors.customer}
                        className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.customer ? "border-red-400" : ""}`}
                    />
                    {errors.customer && <p className="text-sm text-red-600">{errors.customer}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Amount ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="0.01"
                        aria-invalid={!!errors.amount}
                        className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.amount ? "border-red-400" : ""}`}
                    />
                    {errors.amount && <p className="text-sm text-red-600">{errors.amount}</p>}
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
                        aria-invalid={!!errors.reason}
                        className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.reason ? "border-red-400" : ""}`}
                    />
                    {errors.reason && <p className="text-sm text-red-600">{errors.reason}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Merchant</label>
                    <input
                        type="text"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        aria-invalid={!!errors.merchant}
                        className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.merchant ? "border-red-400" : ""}`}
                    />
                    {errors.merchant && <p className="text-sm text-red-600">{errors.merchant}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Platform</label>
                    <PlatformCombobox
                        value={platform}
                        onChange={setPlatform}
                        options={KNOWN_PLATFORMS}
                        className={errors.platform ? "border-red-400" : ""}
                    />
                    {errors.platform && <p className="text-sm text-red-600">{errors.platform}</p>}
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
                        aria-invalid={!!errors.deadline}
                        className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.deadline ? "border-red-400" : ""}`}
                    />
                    {errors.deadline && <p className="text-sm text-red-600">{errors.deadline}</p>}
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
