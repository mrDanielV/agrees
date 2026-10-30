'use client';
import { usePopup } from './PopupContext';

export function SubmitBtn() {
    const { popupOpen } = usePopup();

    return (
        <div className="text-right mt-5">
            <button className="border focus:ring focus:ring-opacity-50 p-2.5 text-lg border-primary bg-sber-green text-white 
                hover:bg-sber-green focus:bg-sber-green hover:shadow-lg rounded-lg"
                onClick={popupOpen}
                >Подписать</button>
        </div>
    )
}