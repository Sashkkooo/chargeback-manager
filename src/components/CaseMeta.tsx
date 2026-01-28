import type { CaseItem } from "../types/case";

export default function CaseMeta({ item }: { item: CaseItem }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Customer:</strong> {item.customer}</p>
                <p><strong>Amount:</strong> ${item.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {item.status}</p>
            </div>

            <div className="space-y-2">
                <p><strong>Reason:</strong> {item.reason}</p>
                <p><strong>Merchant:</strong> {item.merchant}</p>
            </div>

            <div className="space-y-2">
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
}
