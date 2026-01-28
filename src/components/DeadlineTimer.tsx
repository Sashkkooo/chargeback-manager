export default function DeadlineTimer({ deadline }: { deadline: string }) {
    function getDaysLeft(deadline: string) {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    const daysLeft = getDaysLeft(deadline);

    let color = "text-green-600";
    if (daysLeft <= 3 && daysLeft > 0) color = "text-yellow-600";
    if (daysLeft <= 0) color = "text-red-600";

    return (
        <p className={`text-sm font-semibold mt-4 ${color}`}>
            {daysLeft > 0 ? `${daysLeft} days left to respond` : "Deadline passed"}
        </p>
    );
}
