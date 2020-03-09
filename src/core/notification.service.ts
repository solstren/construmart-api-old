import { AppConstants } from './../utils/app-constants';
import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sgMail from '@sendgrid/mail';
// const nodemailer = require('nodemailer')

@Injectable()
export class NotificationService {
    /**construmart@email.com
     *F6D7DB1E02D1B05E03535810B5470AAFD407
     *D757C3799E035FF1FC9639ED7DCA68078777
     */
    constructor() { }

    async sendEmailUsingNodeMailer(from: string, to: string, fromName: string, subject: string, body: string, htmlBody: string): Promise<void> {
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

    async sendMailUsingSendgrid(from: string, to: string, fromName: string, subject: string, body: string, htmlBody: string): Promise<void> {
        console.log(`SENDGRID ==> ${process.env.SENDGRID_API_KEY}`);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: to,
            from: from,
            subject: subject,
            text: '',
            html: htmlBody,
        };
        try {
            let result = await sgMail.send(msg);
            console.log(result[0]);
            console.log(result[1]);
        } catch (err) {
            console.error(err.toString());
            throw new UnprocessableEntityException('Failed to send email');
        }
        console.log(`Message sent`);
    }
}
