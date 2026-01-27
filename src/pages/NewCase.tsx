import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCases } from "../store/useCases";
import type { CaseStatus } from "../store/useCases";

export default function NewCase() {
    const navigate = useNavigate();
    const addCase = useCases((state) => state.addCase);

    const [customer, setCustomer] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<CaseStatus>("pending");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addCase({
            customer,
            amount: Number(amount),
            status,
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
                        placeholder="John Doe"
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
                        placeholder="120"
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
