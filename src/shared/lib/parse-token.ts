export interface TokenPayload {
    email: string;
    userId: string;

}
export const getToken = (): string | null => {
    return localStorage.getItem('user_access_token');
};

export const parsedToken = (): TokenPayload | null => {
    const token = getToken();
    if (!token) return null;

    try {
        const [, payloadBase64] = token.split('.');
        if (!payloadBase64) return null;

        const decodedPayload = atob(payloadBase64);
        return JSON.parse(decodedPayload) as TokenPayload;
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
};
