import { type Email } from '~/common/types/email.type.js';

const restorePasswordEmail = (link: string): Email => {
    return {
        subject: 'LIME password recovery',
        html: `<div>
                <p>Hello!</p>
                <p>You have recently requested to reset your password for your LIME. Live In Motion Everyday account. Please use the link below to reset it:</p>
                <a href="${link}">Reset your password</a>
                <p>If you did not request a password reset, please ignore this email. This link is only valid for 24 hours. For security reasons, we recommend that you do not share this link with anyone. If need further assistance, please contact our support team at [Support Email] . We're here to support you on your fitness journey! Best regards, The LIME Team</p>
            </div>`,
    };
};

export { restorePasswordEmail };
