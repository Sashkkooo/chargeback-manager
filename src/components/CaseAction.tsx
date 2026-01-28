export default function CaseActions({
    onEdit,
    onDelete,
}: {
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex gap-4">
            <button
                onClick={onEdit}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                Edit
            </button>

            <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    );
}
