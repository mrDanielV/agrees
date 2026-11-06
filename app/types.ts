// Тип документа, который подписывается
export type AcceptType = 'personal' | 'edo';

// Состояние подписанных согласий
export type AgreesState = {
  personal: boolean;
  edo: boolean;
};

// Настройки, приходящие с сервера
export type Settings = {
  agrees: AgreesState;
  personalText: string;
  type: AcceptType | null; // какой документ открыт изначально (опционально)
};

// Результат запроса настроек: либо данные, либо ошибка
export type SettingsState = Settings | 'error' | null;

// Тип уведомления (тоста)
export type ToastType = 'success' | 'error';

// Данные тоста
export type ToastData = {
  message: string;
  type: ToastType;
} | null;

// Показ тоста (используется в компонентах)
export type ShowToast = (message: string, type: ToastType) => void;

// Описание блока документа
export type BlockItem = {
  code: AcceptType;
  name: string;
};
