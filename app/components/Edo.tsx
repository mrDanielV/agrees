import Image from 'next/image';


import {SubmitBtn} from '../components/SubmitBtn'
import {useSign} from '../lib/useSign'
import type { ShowToast } from '../types';

type EdoProps = {
    onToast: ShowToast;
    isSigned: boolean;
};
export function Edo({onToast, isSigned}: EdoProps) {
    const { sign } = useSign(onToast);

    return (
        <div>
            <button 
                className='flex gap-4 items-center' 
                onClick={() => onToast('Файл недоступен', 'error')}
            >
                <Image
                    src="/pdf.svg"
                    alt="СОГЛАШЕНИЕ О ПОРЯДКЕ ВЗАИМОДЕЙСТВИЯ С КЛИЕНТАМИ ООО СК «СБЕРБАНК СТРАХОВАНИЕ ЖИЗНИ» ПО УДАЛЕННЫМ КАНАЛАМ ОБСЛУЖИВАНИЯ"
                    width={80}
                    height={80}
                    priority
                    className=""
                />
                <span>Соглашение о порядке взаимодействия с клиентами ООО СК «Сбербанк страхование жизни» по удаленным каналам обслуживания.pdf</span>
            </button>
            <SubmitBtn agreeType="edo" disabled={isSigned} showToast={onToast} onClick={() => sign('edo', null)} />
        </div>
    )
}