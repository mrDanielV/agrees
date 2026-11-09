import {SubmitBtn} from '../components/SubmitBtn'
import type { ShowToast } from '../types';

type PersonalProps = {
    onToast: ShowToast;
    isSigned: boolean;
};

export function Personal({onToast, isSigned}: PersonalProps) {
    return (
        <>
            Согласие на обработку персональных данных

            <SubmitBtn type="personal" disabled={isSigned} showToast={onToast} />
        </>
    )
}
