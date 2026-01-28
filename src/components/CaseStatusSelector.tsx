import type { CaseStatus } from "../types/case";

export default function CaseStatusSelector({
    status,
    onChange,
}: {
    status: CaseStatus;
    onChange: (newStatus: CaseStatus) => void;
}) {
    return (
        <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
                value={status}
                onChange={(e) => onChange(e.target.value as CaseStatus)}
                className="border rounded px-2 py-1 text-sm"
            >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
            </select>
        </div>
    );
}
