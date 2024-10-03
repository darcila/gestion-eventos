export class AutenticacionAppService {
    async validarToken(token: string | undefined): Promise<boolean> {
        console.log('validarToken', token);
        return await true
    }
}
