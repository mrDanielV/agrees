'use client';

import type { AcceptType, ShowToast } from '../types';

type SubmitBtnProps = {
    agreeType: AcceptType;
    disabled?: boolean;
    showToast: ShowToast;
    onClick: () => void;
};
export function SubmitBtn({agreeType, disabled = false, showToast, onClick}: SubmitBtnProps) {
    return (
        <div className="text-right mt-5">
            <button
                type="submit"
                className="border focus:ring focus:ring-opacity-50 p-2.5 text-lg border-primary bg-sber-green text-white
                    hover:bg-sber-green focus:bg-sber-green hover:shadow-lg rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sber-green disabled:hover:shadow-none"
                onClick={onClick}
                disabled={disabled}
            >{disabled ? 'Подписано' : 'Подписать'}</button>
        </div>
    )
}