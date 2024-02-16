import sgMail, { type MailDataRequired } from '@sendgrid/mail';

import { restorePasswordEmail } from '~/common/emails/emails.js';

class EmailService {
    private from: string;

    public constructor(apiKey: string, from: string) {
        sgMail.setApiKey(apiKey);
        this.from = from;
    }

    private async send(email: Omit<MailDataRequired, 'from'>): Promise<void> {
        await sgMail.send({ ...email, from: this.from } as MailDataRequired);
    }

    public async sendRestorePassword(to: string): Promise<void> {
        const email = { ...restorePasswordEmail, to };

        await this.send(email);
    }
}

export { EmailService };
