'use client'

import { useState } from 'react';
import {Block} from '../components/Block'
import {PopupCodeWin} from '../components/PopupCodeWin'
import { usePopup } from '../components/PopupContext';
import { Toast } from '../components/Toast';

export default function AcceptPage() {
  const [openBlock, setOpenBlock] = useState<string | null>(null);
  const { popupIsOpen, popupClose } = usePopup();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const blocks = [
    {code: "Personal", name: "Согласие на обработку персональных данных"},
    {code: "EDO", name: "Согласие о присоединении к ЭДО"}
  ];

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