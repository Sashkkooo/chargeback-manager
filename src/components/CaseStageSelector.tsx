import type { CaseItem, CaseStage } from "../types/case";

export default function CaseStageSelector({
    item,
    onChange,
}: {
    item: CaseItem;
    onChange: (newStage: CaseStage) => void;
}) {
    return (
        <div className="mt-4">
            <label className="block font-semibold mb-1">Stage</label>
            <select
                value={item.stage}
                onChange={(e) => onChange(e.target.value as CaseStage)}
                className="border rounded p-2 w-full"
            >
                <option value="inquiry">Inquiry</option>
                <option value="chargeback">Chargeback</option>
                <option value="pre-arbitration">Pre-Arbitration</option>
                <option value="arbitration">Arbitration</option>
            </select>
        </div>
    );
}
