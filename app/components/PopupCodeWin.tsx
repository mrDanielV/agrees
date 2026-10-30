export function PopupCodeWin({ children }: { children?: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center
                        bg-black/10 backdrop-blur-sm p-4">
            <div className="w-[400px] max-w-full bg-white rounded-2xl
                            shadow-2xl shadow-black/20 p-6">
                {children ?? '111111'}
            </div>
        </div>
    )
}