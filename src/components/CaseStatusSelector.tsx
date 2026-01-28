import type { CaseStatus } from "../types/case";

export default function CaseStatusSelector({
    status,
    onChange,
}: {
    status: CaseStatus;
    onChange: (newStatus: CaseStatus) => void;
}) {
    return (
        <div className="space-y-2">
            <label className="block font-medium text-gray-700">Status</label>

            <select
                value={status}
                onChange={(e) => onChange(e.target.value as CaseStatus)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
            </select>
        </div>
    );
}
