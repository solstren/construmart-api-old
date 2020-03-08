export class AppUtils {
    public static GenerateOtp(): string {
        var string = '0123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ';
        let OTP = '';

        // Find the length of string 
        var len = string.length;
        for (let i = 0; i < 6; i++) {
            OTP += string[Math.floor(Math.random() * len)];
        }
        return OTP;
    }
}