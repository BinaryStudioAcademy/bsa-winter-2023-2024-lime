import sgMail, { type MailDataRequired } from '@sendgrid/mail';

class EmailService {
    private from: string;
    private templateId: string;

    public constructor(apiKey: string, from: string, templateId: string) {
        sgMail.setApiKey(apiKey);
        this.from = from;
        this.templateId = templateId;
    }

    private async send(email: Omit<MailDataRequired, 'from'>): Promise<void> {
        await sgMail.send({ ...email, from: this.from } as MailDataRequired);
    }

    public async sendRestorePassword(to: string, link: string): Promise<void> {
        const message = {
            to,
            subject: 'LIME Password Recovery',
            templateId: this.templateId,
            dynamicTemplateData: {
                link: link,
                email: this.from,
            },
        };

        await this.send(message);
    }
}

export { EmailService };
