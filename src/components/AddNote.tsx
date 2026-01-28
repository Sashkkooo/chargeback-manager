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
        <div className="mt-6 p-4 border rounded">
            <h3 className="font-semibold mb-2">Add Note</h3>

            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your internal note here..."
                className="w-full border rounded p-2 mb-3"
                rows={3}
            />

            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Note
            </button>
        </div>
    );
}
