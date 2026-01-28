import type { CaseItem } from "../types/case";

export default function CaseMeta({ item }: { item: CaseItem }) {
    return (
        <div className="p-5 border rounded-lg bg-gray-50 shadow-sm space-y-6">

            {/* Section 1: Basic Info */}
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Basic Information
                </h3>

                <div className="grid grid-cols-2 gap-y-1 text-sm">
                    <p className="text-gray-600">ID:</p>
                    <p className="font-medium text-gray-900">{item.id}</p>

                    <p className="text-gray-600">Customer:</p>
                    <p className="font-medium text-gray-900">{item.customer}</p>

                    <p className="text-gray-600">Amount:</p>
                    <p className="font-medium text-gray-900">${item.amount.toFixed(2)}</p>

                    <p className="text-gray-600">Status:</p>
                    <p className="font-medium text-gray-900 capitalize">{item.status}</p>
                </div>
            </div>

            {/* Section 2: Case Details */}
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Case Details
                </h3>

                <div className="grid grid-cols-2 gap-y-1 text-sm">
                    <p className="text-gray-600">Reason:</p>
                    <p className="font-medium text-gray-900">{item.reason}</p>

                    <p className="text-gray-600">Merchant:</p>
                    <p className="font-medium text-gray-900">{item.merchant}</p>
                </div>
            </div>

            {/* Section 3: Timestamps */}
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Timestamps
                </h3>

                <div className="grid grid-cols-2 gap-y-1 text-sm">
                    <p className="text-gray-600">Created At:</p>
                    <p className="font-medium text-gray-900">
                        {new Date(item.createdAt).toLocaleString()}
                    </p>

                    <p className="text-gray-600">Updated At:</p>
                    <p className="font-medium text-gray-900">
                        {new Date(item.updatedAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
