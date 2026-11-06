import {SubmitBtn} from '../components/SubmitBtn'

type PersonalProps = {
    isSigned: boolean;
};

export function Personal({isSigned}: PersonalProps) {
    return (
        <>
            Согласие на обработку персональных данных

            <SubmitBtn type="personal" disabled={isSigned} />
        </>
    )
}
