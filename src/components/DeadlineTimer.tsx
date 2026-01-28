export default function DeadlineTimer({ deadline }: { deadline: string }) {
    function getDaysLeft(deadline: string) {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    const daysLeft = getDaysLeft(deadline);

    let color = "text-green-700 bg-green-100";
    if (daysLeft <= 3 && daysLeft > 0) color = "text-yellow-700 bg-yellow-100";
    if (daysLeft <= 0) color = "text-red-700 bg-red-100";

    return (
        <div
            className={`inline-block px-3 py-1.5 rounded-lg text-sm font-semibold ${color}`}
        >
            {daysLeft > 0
                ? `${daysLeft} days left to respond`
                : "Deadline passed"}
        </div>
    );
}
