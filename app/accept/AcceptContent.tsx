'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {Block} from '../components/Block'
import {PopupCodeWin} from '../components/PopupCodeWin'
import { usePopup } from '../components/PopupContext';
import { Toast } from '../components/Toast';
import { Spinner } from '../components/Spinner';
import { getAgrees } from '../lib/api';

export default function AcceptContent() {
  const [openBlock, setOpenBlock] = useState<string | null>(null);
  const { popupIsOpen, popupClose } = usePopup();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const blocks = [
    {code: "Personal", name: "Согласие на обработку персональных данных"},
    {code: "EDO", name: "Согласие о присоединении к ЭДО"}
  ];

  const searchParams = useSearchParams();
  const key = searchParams.get('key'); // вернет 'demo' или null

  const [settings, setSettings] = useState<{
    agrees: { personal: boolean; edo: boolean };
    personalText: string;
  } | null>(null);

  useEffect(() => { 
    if(!key) {
      return;
    }
    getAgrees(key).then((data) => {
      if (data.success === false) {
        showToast('Ссылка недействительна!', 'error');
        setSettings('error');
        return; // прерываем выполнение
      }

      setSettings(data.data);
    });
  }, [key]);

  const handleToggle = (code:string) => {
      if (openBlock === code) {
          setOpenBlock(null)
      } else {
          setOpenBlock(code)
      }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
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
          />
        ))}
        
      </div>

      {popupIsOpen && <PopupCodeWin onClose={popupClose} />}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}