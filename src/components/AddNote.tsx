import { useState } from "react";

export default function AddNote({
    onAdd,
}: {
    onAdd: (noteText: string) => void;
}) {
    const [note, setNote] = useState("");

    function handleSubmit() {
        if (!note.trim()) return;

        onAdd(note.trim());
        setNote("");
    }

    return (
        <div className="p-5 border rounded-lg bg-gray-50 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Add Note</h3>

            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your internal note here..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                rows={3}
            />

            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Add Note
                </button>
            </div>
        </div>
    );
}
