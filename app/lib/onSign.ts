import { useSearchParams } from 'next/navigation';
import { usePopup } from '../components/PopupContext';
import { sendSign } from '../lib/api';
import type { AcceptType, ShowToast } from '../types';

export function useSign(showToast: ShowToast, signData: JSON) {
    const { popupOpen } = usePopup();
    const searchParams = useSearchParams();
    const key = searchParams.get('key');

    const sign = (type: AcceptType) => {
        if (!type || !key) {
            showToast('Ссылка недействительна!', 'error');
            return;
        }

        sendSign(key, type, signData).then((data) => {
            if (data.success) {
                showToast('СМС отправлена', 'success');
                popupOpen(type);
            } else {
                showToast('Ошибка отправки СМС', 'error');
            }
        });
    };

    return { sign };
}