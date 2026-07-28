import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()

export class MailService {

  constructor(

    private readonly mailerService: MailerService,

  ) {}

  async sendResetPasswordEmail(

    email: string,

    link: string,

  ) {

    await this.mailerService.sendMail({

      to: email,

      subject: "Đặt lại mật khẩu",

      html: `

        <h2>Task Manager</h2>

        <p>Bạn vừa yêu cầu đặt lại mật khẩu.</p>

        <p>

          <a href="${link}">

            Nhấn vào đây để đặt lại mật khẩu

          </a>

        </p>

      `,

    });

  }

}