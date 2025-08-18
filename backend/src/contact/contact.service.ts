import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const emailUser = this.configService.get<string>('EMAIL_USER');
    const emailPass = this.configService.get<string>('EMAIL_PASS');

    if (!emailUser || !emailPass) {
      throw new Error('Email configuration is missing. Please check your .env file.');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }

  async sendEmail(createContactDto: CreateContactDto) {
    const mailOptions = {
      from: `"${createContactDto.name}" <${createContactDto.email}>`,
      to: 'orkhisayman@gmail.com', // Your email where you want to receive messages
      subject: `[Portfolio Contact] ${createContactDto.subject}`,
      text: createContactDto.message,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${createContactDto.name}</p>
        <p><strong>Email:</strong> ${createContactDto.email}</p>
        <p><strong>Subject:</strong> ${createContactDto.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${createContactDto.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully');
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw new Error('Failed to send message');
    }
  }
}
