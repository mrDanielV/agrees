import {SubmitBtn} from '../components/SubmitBtn'
import {TextField} from '../components/TextField'
import { useForm, SubmitHandler } from 'react-hook-form';
import type { ShowToast } from '../types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type PersonalProps = {
    onToast: ShowToast;
    isSigned: boolean;
};

const personalSchema = z.object({
  lastName: z.string().min(2, 'Минимум 2 буквы').regex(/^[А-Яа-яЁё]+$/, 'Только кириллица'),
  firstName: z.string().min(2, 'Минимум 2 буквы').regex(/^[А-Яа-яЁё]+$/, 'Только кириллица'),
  middleName: z.string().regex(/^[А-Яа-яЁё]+$/, 'Только кириллица').optional(), // отчество необязательно
});
type PersonalFormData = z.infer<typeof personalSchema>;

export function Personal({onToast, isSigned}: PersonalProps) {

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<PersonalFormData>({
        resolver: zodResolver(personalSchema),
        mode: 'onTouched',
    });
  
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
                        <TextField placeholder="Паспорт РФ" /> {/* селект, но пока инпут */}
                        <TextField placeholder="Серия" />
                        <TextField placeholder="Номер" />
                        <TextField placeholder="Дата выдачи" /> {/* Дата выдачи (пока инпут) */}
                    </div>
                </div>
                
            </form>


            <SubmitBtn type="personal" disabled={isSigned} showToast={onToast} />
        </>
    )
}
