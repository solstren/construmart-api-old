import { ResponseMessages } from './../utils/response-messages';
import { AppConstants } from './../utils/app-constants';
import { Injectable, InternalServerErrorException, UnprocessableEntityException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sgMail from '@sendgrid/mail';
// const nodemailer = require('nodemailer')

@Injectable()
export class NotificationService {
    constructor() { }

    async sendEmailUsingNodeMailer(from: string, to: string, fromName: string, subject: string, body: string, htmlBody: string): Promise<void> {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: AppConstants.DEFAULT_EMAIL_FROM, // generated ethereal user
                pass: AppConstants.SOMETHING // generated ethereal password
            }
        });

        try {
            let info = await transporter.sendMail({
                from: `"${fromName}" <${from}>`, // sender address
                to: `${to}`, // list of receivers
                subject: `${subject}`, // Subject line
                text: '', // plain text body
                html: `${htmlBody}` // html body
            });
            console.log(`Message semt: ${info.messageId}`);
        } catch (error) {
            Logger.error(`${error.detail || error.message}`);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }
    }

    async sendEmailUsingSendgrid(from: string, to: string, fromName: string, subject: string, body: string, htmlBody: string): Promise<void> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: to,
            from: from,
            subject: subject,
            text: body || subject,
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
