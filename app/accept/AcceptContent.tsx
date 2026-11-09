'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {Block} from '../components/Block'
import {PopupCodeWin} from '../components/PopupCodeWin'
import {PopupResultWin} from '../components/PopupResultWin'
import { usePopup } from '../components/PopupContext';
import { Toast } from '../components/Toast';
import { Spinner } from '../components/Spinner';
import { getAgrees } from '../lib/api';
import type { AcceptType, AgreesState, BlockItem, SettingsState, ToastData, ToastType } from '../types';

export default function AcceptContent() {
  const [openBlock, setOpenBlock] = useState<AcceptType | null>(null);
  const { popupIsOpen, popupType, popupClose } = usePopup();
  const [toast, setToast] = useState<ToastData>(null);
  const [verified, setVerified] = useState(false);

  const blocks: BlockItem[] = [
    {code: "personal", name: "Согласие на обработку персональных данных"},
    {code: "edo", name: "Согласие о присоединении к ЭДО"}
  ];

  // API ключ
  const searchParams = useSearchParams();
  const key = searchParams.get('key'); // accept?key=<key>

  const [settings, setSettings] = useState<SettingsState>(null);

  // Глобальное состояние согласий - подписано / нет
  const [agrees, setAgrees] = useState<AgreesState>({ edo: false, personal: false });
  const handleSign = (type: AcceptType) => {
    setAgrees((prev) => ({
      ...prev,       // копируем старые значения
      [type]: true,  // меняем нужный флаг на true
    }));
  };

  useEffect(() => {
    if(!key) {
      return;
    }
    getAgrees(key).then((data) => {
      if (data.success === false) {
        showToast('Ссылка недействительна!', 'error');
        setSettings('error');
        return; 
      }

      setSettings(data.data);
    });
  }, [key]);
  const handleToggle = (code: AcceptType) => {
      if (openBlock === code) {
          setOpenBlock(null)
      } else {
          setOpenBlock(code)
      }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  if (!key || settings === 'error') {
    return (
      <div className="flex-1 flex items-center justify-center bg-sber-gray p-3 pt-10">
        <div className="bg-red-50 border border-red-500 text-red-800 p-4 rounded-lg">
            Ссылка недействительна!
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex-1 flex items-center justify-center bg-sber-gray p-3 pt-10 min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-top justify-center bg-sber-gray p-3 pt-10">
      <div>
        <h1 className="text-xl font-bold text-gray-700 mb-5">В целях заключения договора, пожалуйста, ознакомьтесь с документами, заполните необходимые данные и подпишите</h1>

        {blocks.map((item) => (
          <Block code={item.code} name={item.name} key={item.code}
            isOpen={openBlock == item.code?true:false}
            onToggle={() => handleToggle(item.code)}
            onToast = {showToast}
            isSigned={agrees[item.code]}
          />
        ))}

      </div>

      {popupIsOpen && <PopupCodeWin
        onClose={popupClose}
        showToast={showToast}
        setVerified={setVerified}
        handleSign={handleSign}
        type={popupType}
      />}
      {verified && <PopupResultWin onClose={() => setVerified(false)} />}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

