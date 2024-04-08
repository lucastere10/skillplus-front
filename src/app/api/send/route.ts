import { Resend } from 'resend';
import * as React from 'react';
import {EmailTemplate} from '@/components/Email/EmailTemplate';

export async function GET() {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['lucastere10@gmail.com'],
            subject: "Hello world",
            react: EmailTemplate() as React.ReactElement,
        });

        if (error) {
            return Response.json({ error });
        }

        return Response.json({ data });
    } catch (error) {
        return Response.json({ error });
    }
}
