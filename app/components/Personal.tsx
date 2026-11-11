import {SubmitBtn} from '../components/SubmitBtn'
import {TextField} from '../components/TextField'
import {SelectField} from '../components/SelectField'
import {DateField} from '../components/DateField'
import { useForm, SubmitHandler } from 'react-hook-form';
import type { ShowToast } from '../types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useSign} from '../lib/useSign'

type PersonalProps = {
    onToast: ShowToast;
    isSigned: boolean;
    initData: JSON
};

const documentTypes = [
  { value: 'passport', label: 'Паспорт РФ' },
  { value: 'foreign', label: 'Иностранный паспорт' },
];

const personalSchema = z.object({
  lastName: z.string().min(2, 'Минимум 2 буквы').regex(/^[А-Яа-яЁё]+$/, 'Только кириллица'),
  firstName: z.string().min(2, 'Минимум 2 буквы').regex(/^[А-Яа-яЁё]+$/, 'Только кириллица'),
  middleName: z.string().regex(/^[А-Яа-яЁё]+$/, 'Только кириллица').optional(), // отчество необязательно

  // Добавляем вложенный объект document
  document: z.object({
    type: z.string().min(1, 'Обязательное поле'),
    seria: z.string().regex(/^\d+$/, 'Только цифры').length(4, 'Серия должна быть 4 цифры'),
    number: z.string().regex(/^\d+$/, 'Только цифры').length(6, 'Номер должен быть 6 цифр'),
    doi: z.string().min(1, 'Обязательное поле'),
    issued: z.string().min(1, 'Обязательное поле'),
  }),
  
  // Адрес пока можно оставить пустым объектом или добавить простую строку
  address: z.string().min(1, 'Обязательное поле'),
  addressAdd: z.string().optional(),
});
type PersonalFormData = z.infer<typeof personalSchema>;

export function Personal({onToast, isSigned, initData}: PersonalProps) {
    const { sign } = useSign(onToast);

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<PersonalFormData>({
        resolver: zodResolver(personalSchema),
        mode: 'onTouched',
    });
  
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        sign('edo', data);        
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Группа ФИО */}
                <div className="mb-5">
                    <label className="text-gray-600 mb-1 block">Субъект персональных данных</label>
                    <div className="grid lg:grid-cols-3 gap-6">
                        <TextField label="" placeholder="Фамилия" error={errors.lastName?.message} {...register('lastName')} />
                        <TextField label="" placeholder="Имя" error={errors.firstName?.message} {...register('firstName')} />
                        <TextField label="" placeholder="Отчество" error={errors.middleName?.message} {...register('middleName')} />
                    </div>
                </div>

                {/* Группа Паспорт */}
                <div className="mb-5">
                    <label className="text-gray-600 mb-1 block">Реквизиты документа</label>
                    <div className="grid lg:grid-cols-4 gap-6">
                        <SelectField placeholder="Паспорт РФ" options={documentTypes} {...register('document.type')} error={errors.document?.type?.message} /> {/* селект, но пока инпут */}
                        <TextField placeholder="Серия" {...register('document.seria')} error={errors.document?.seria?.message} />
                        <TextField placeholder="Номер" {...register('document.number')} error={errors.document?.number?.message} />
                        <DateField placeholder="Дата выдачи" {...register('document.doi')} error={errors.document?.doi?.message} /> {/* Дата выдачи (пока инпут) */}
                    </div>
                </div>
                <div className="mb-5">
                    <label className="text-gray-600 mb-1 block">Кем выдан</label>
                    <div className="grid lg:grid-cols-1 gap-6">
                        <TextField placeholder="Кем выдан" {...register('document.issued')} error={errors.document?.issued?.message} />
                    </div>
                </div>

                {/* Адрес */}
                <div className="mb-5">
                    <label className="text-gray-600 mb-1 block">Адрес места жительства (регистрации) или места пребывания</label>
                    <div className="grid lg:grid-cols-1 gap-6">
                        <TextField placeholder="" {...register('address')} error={errors.address?.message} />
                    </div>
                </div>
                <div className="mb-5">
                    <label className="text-gray-600 mb-1 block">Добавить к адресу</label>
                    <div className="grid lg:grid-cols-1 gap-6">
                        <TextField placeholder="" {...register('addressAdd')} error={errors.addressAdd?.message} />
                    </div>
                </div>

                { <div>{initData?.personalText}</div> }

                <SubmitBtn agreeType="personal" disabled={isSigned} showToast={onToast} />
                
            </form>

        </>
    )
}
