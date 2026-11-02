export function Spinner() {
    return (
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-sber-green animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-sber-green animate-bounce [animation-delay:0.15s]"></div>
            <div className="w-3 h-3 rounded-full bg-sber-green animate-bounce [animation-delay:0.3s]"></div>
        </div>
    )
}