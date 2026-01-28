import type { CaseItem, CaseStage } from "../types/case";

export default function CaseStageSelector({
    item,
    onChange,
}: {
    item: CaseItem;
    onChange: (newStage: CaseStage) => void;
}) {
    return (
        <div className="space-y-2">
            <label className="block font-medium text-gray-700">Stage</label>

            <select
                value={item.stage}
                onChange={(e) => onChange(e.target.value as CaseStage)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                <option value="inquiry">Inquiry</option>
                <option value="chargeback">Chargeback</option>
                <option value="pre-arbitration">Pre-Arbitration</option>
                <option value="arbitration">Arbitration</option>
            </select>
        </div>
    );
}
