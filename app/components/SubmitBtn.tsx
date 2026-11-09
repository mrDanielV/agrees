'use client';

import { useSearchParams } from 'next/navigation';
import { usePopup } from './PopupContext';
import { sendSign } from '../lib/api';
import type { AcceptType, ShowToast } from '../types';

type SubmitBtnProps = {
    type: AcceptType;
    disabled?: boolean;
    showToast: ShowToast;
};
export function SubmitBtn({type, disabled = false, showToast}: SubmitBtnProps) {
    const { popupOpen } = usePopup();

    // API ключ
    const searchParams = useSearchParams();
    const key = searchParams.get('key'); // accept?key=<key>

    const sendSignCall = (type: AcceptType) => {
        if(!type || !key) {
            return;
        }
        sendSign(key, type).then((data) => {
            if(data.success) {
                showToast('СМС отправлена', 'success');
                popupOpen(type);
            } else {
                showToast('Ошибка отправки СМС', 'error');
            }
        });
    }

    return (
        <div className="text-right mt-5">
            <button
                type="button"
                className="border focus:ring focus:ring-opacity-50 p-2.5 text-lg border-primary bg-sber-green text-white
                    hover:bg-sber-green focus:bg-sber-green hover:shadow-lg rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sber-green disabled:hover:shadow-none"
                //onClick={() => popupOpen(type)}
                onClick={() => sendSignCall(type)}
                disabled={disabled}
                >{disabled ? 'Подписано' : 'Подписать'}</button>
        </div>
    )
}