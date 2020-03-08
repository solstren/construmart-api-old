import { AppConstants } from './../utils/app-constants';
import { Injectable, HttpService, Param } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer')

@Injectable()
export class NotificationService {
    /**construmart@email.com
     *F6D7DB1E02D1B05E03535810B5470AAFD407
     */
    constructor(private readonly _httpService: HttpService) { }

    async sendEmail(from: string, to: string, fromName: string, subject: string, body: string, htmlBody: string) {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: AppConstants.ELASTIC_EMAIL_SMTP_HOST,
            port: AppConstants.ELASTIC_EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

        let info = await transporter.sendMail({
            from: `"${fromName}" <${from}>`, // sender address
            to: `${to}`, // list of receivers
            subject: `${subject}`, // Subject line
            text: `${body}`, // plain text body
            html: `${htmlBody}` // html body
        });

        console.log(`Message semt: ${info.messageId}`);
    }
}
