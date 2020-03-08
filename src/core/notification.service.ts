import { AppConstants } from './../utils/app-constants';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer')

@Injectable()
export class NotificationService {
    /**construmart@email.com
     *F6D7DB1E02D1B05E03535810B5470AAFD407
     *D757C3799E035FF1FC9639ED7DCA68078777
     */
    constructor() { }

    async sendEmail(from: string, to: string, fromName: string, subject: string, body: string, htmlBody: string): Promise<void> {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: AppConstants.DOCUMENT_NAME, // generated ethereal user
                pass: AppConstants.SOMETHING // generated ethereal password
            }
        });

        let info = await transporter.sendMail({
            from: `"${fromName}" <${from}>`, // sender address
            to: `${to}`, // list of receivers
            subject: `${subject}`, // Subject line
            text: '', // plain text body
            html: `${htmlBody}` // html body
        });

        console.log(`Message semt: ${info.messageId}`);
    }
}
