'use client'

//import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {CodeInput} from '../components/CodeInput'

import { checkCode } from '../lib/api';
import type { AcceptType, ShowToast } from '../types';

type PopupCodeWinProps = {
    onClose: () => void;
    showToast: ShowToast;
    setVerified: (verified: boolean) => void;
    handleSign: (type: AcceptType) => void;
    type: AcceptType | null;
}
export function PopupCodeWin({onClose, showToast, setVerified, handleSign, type}: PopupCodeWinProps) {
    const searchParams = useSearchParams();
    const key = searchParams.get('key');
    console.log(type);


    const onComplete = (code:string) => {
        if (code.length < 4) {
            showToast('Неверный формат кода СМС', 'error');
            return;
        }

        if (!key || !type) {
            showToast('Ссылка недействительна!', 'error');
            return;
        }

        checkCode(key, type, code).then((data) => {
            if (data.success === false) {
                const msg = data.error?.msg || 'Ошибка!';
                showToast(msg, 'error');
                return;
            }

            setVerified(true);
            handleSign(type);
            onClose();
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center
                        bg-black/10 backdrop-blur-sm p-4">
            <div className="w-[400px] max-w-full bg-white rounded-2xl
                            shadow-2xl shadow-black/20 p-6">
                
                <div className="mb-3 text-2xl pr-8">Подписание</div>

                <div className="mb-4 text-lg text-gray-500">Введите код из СМС</div>

                <CodeInput onComplete={onComplete} />

                <div className="text-left mt-5">
                    <button className="border focus:ring focus:ring-opacity-50 p-2.5 px-5 text-lg border-primary bg-sber-green text-white 
                        hover:bg-sber-green focus:bg-sber-green hover:shadow-lg rounded-lg"
                        //onClick={popupOpen}
                        >Отправить повторно</button>
                </div>

            </div>
        </div>
    )
}