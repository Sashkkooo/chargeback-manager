export default function CaseActions({
    onEdit,
    onDelete,
}: {
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex justify-end gap-3 pt-4 border-t">
            <button
                onClick={onEdit}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition"
            >
                Edit
            </button>

            <button
                onClick={onDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
                Delete
            </button>
        </div>
    );
}
