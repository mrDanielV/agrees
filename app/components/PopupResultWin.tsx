//import {CodeInput} from '../components/CodeInput'

export function PopupResultWin({onClose}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center
                        bg-black/10 backdrop-blur-sm p-4">
            <div className="w-[400px] max-w-full bg-white rounded-2xl
                            shadow-2xl shadow-black/20 p-6">

                <div className="flex flex-col items-center justify-between">
                    <div className="text-sber-green">
                        <svg 
                            stroke="currentColor" 
                            fill="none" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            height="40" 
                            width="40" 
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                
                    <div className="py-2 text-lg">Документ успешно подписан!</div>

                    <div className="text-left mt-3">
                        <button className="border focus:ring focus:ring-opacity-50 p-2.5 px-5 text-lg border-primary bg-sber-green text-white 
                            hover:bg-sber-green focus:bg-sber-green hover:shadow-lg rounded-lg"
                            onClick={onClose}
                            >OK</button>
                    </div>
                </div>

            </div>
        </div>
    )
}