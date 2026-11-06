'use client';
import { usePopup } from './PopupContext';
import type { AcceptType } from '../types';

type SubmitBtnProps = {
    type: AcceptType;
    disabled?: boolean;
};
export function SubmitBtn({type, disabled = false}: SubmitBtnProps) {
    const { popupOpen } = usePopup();

    return (
        <div className="text-right mt-5">
            <button
                type="button"
                className="border focus:ring focus:ring-opacity-50 p-2.5 text-lg border-primary bg-sber-green text-white
                    hover:bg-sber-green focus:bg-sber-green hover:shadow-lg rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sber-green disabled:hover:shadow-none"
                onClick={() => popupOpen(type)}
                disabled={disabled}
                >Подписать</button>
        </div>
    )
}