import type { AcceptType, Settings } from '../types';

export type ApiError = {
    code: string;
    msg: string;
};

export type GetAgreesResponse =
    | { success: true; data: Settings }
    | { success: false; error?: ApiError };

export type CheckCodeResponse =
    | { success: true }
    | { success: false; error?: ApiError };

export async function getAgrees(key: string): Promise<GetAgreesResponse> {
    const url = '/api/accept';
    const data = { key: key };

    if(key != 'demo') {
        return {success: false};
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        return {success: false};
    }
}

export async function checkCode(key: string, type: AcceptType, code: string): Promise<CheckCodeResponse> {
    const url = '/api/sign/check';
    const data = { key: key, type:type, code: code };

    if(key != 'demo') {
        return {success: false, error: {code: 'invalidKey', msg: 'Ссылка устарела!'}};
    }
    if(code == '1111') {
        return {success: false, error: {code: 'err', msg: 'Неверный СМС-код'}};
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        return {success: false};
    }
}

