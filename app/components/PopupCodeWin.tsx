'use client'

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {CodeInput} from '../components/CodeInput'

import { sendSign } from '../lib/api';
import { checkCode } from '../lib/api';
import type { AcceptType, ShowToast } from '../types';

type PopupCodeWinProps = {
    onClose: () => void;
    showToast: ShowToast;
    setVerified: (verified: boolean) => void;
    handleSign: (type: AcceptType) => void;
    type: AcceptType | null;
}

const T = 30;

export function PopupCodeWin({onClose, showToast, setVerified, handleSign, type}: PopupCodeWinProps) {
    const searchParams = useSearchParams();
    const key = searchParams.get('key');

    const [retryEnable, setRetryEnable] = useState<boolean>(true);
    const [timeLabel, setTimeLabel] = useState<number>(T)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const setTimer = () => {
        let timer = T;
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        const updateTimer = setInterval(() => {
            timer--;
            setTimeLabel(timer);
            if(timer < 1) {
                setRetryEnable(true);
                clearInterval(updateTimer);
                timerRef.current = null;
                setTimeLabel(T);
            }
            //console.log(timer);
        }, 1000);
    }
    // чистим таймер при размонтировании попапа
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    const sendSignCall = (type: AcceptType) => {
        if(!type || !key) {
            return;
        }
        if(!retryEnable) {
            return;
        }
        sendSign(key, type).then((data) => {
            if(data.success) {
                showToast('СМС отправлена', 'success');
            } else {
                showToast('Ошибка отправки СМС', 'error');
            }
        });
    }

    const retryClick = (type: AcceptType) => {
        if(!retryEnable) {
            return;
        }
        sendSignCall(type);
        setRetryEnable(false);
        setTimer();
    }

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
                    <button
                        type="button"
                        className={`border focus:ring focus:ring-opacity-50 p-2.5 px-5 text-lg rounded-lg
                            ${retryEnable
                                ? 'border-primary bg-sber-green text-white hover:bg-sber-green focus:bg-sber-green hover:shadow-lg'
                                : 'border-sber-green bg-gray-200 text-black cursor-not-allowed'}`}
                        onClick={() => retryClick(type)}
                        disabled={!retryEnable}
                        >{retryEnable ? 'Отправить повторно' : 'Повторить через: ' + timeLabel + ' сек'}</button>
                </div>

            </div>
        </div>
    )
}