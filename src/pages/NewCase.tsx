import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCases } from "../store/useCases";
import type { CaseStatus, CaseStage } from "../types/case";
import CaseStatusSelector from "../components/CaseStatusSelector";
import CaseStageSelector from "../components/CaseStageSelector";
import { validateCaseForm, type CaseFormErrors } from "../utils/validateCaseForm";

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
    const [errors, setErrors] = useState<CaseFormErrors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateCaseForm({ customer, amount, reason, merchant, deadline });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

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
        <div className="max-w-xl mx-auto bg-white p-6 md:p-10 shadow rounded-lg space-y-8 md:space-y-10">
            <h1 className="text-3xl font-bold tracking-tight">Create New Case</h1>

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
                    <CaseStatusSelector status={status} onChange={setStatus} />
                </div>

                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Reason</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Unauthorized transaction"
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
                        placeholder="My Online Store"
                        aria-invalid={!!errors.merchant}
                        className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.merchant ? "border-red-400" : ""}`}
                    />
                    {errors.merchant && <p className="text-sm text-red-600">{errors.merchant}</p>}
                </div>

                <div className="space-y-2">
                    <CaseStageSelector stage={stage} onChange={setStage} />
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
                    Create Case
                </button>
            </form>
        </div>
    );
}
