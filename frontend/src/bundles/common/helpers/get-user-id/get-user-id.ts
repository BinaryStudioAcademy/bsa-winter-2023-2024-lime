import { type JwtPayload, jwtDecode } from 'jwt-decode';

interface TokenPayload extends JwtPayload {
    userId: string;
}

const getUserId = (token: string): TokenPayload => {
    return jwtDecode(token);
};

export { getUserId };
