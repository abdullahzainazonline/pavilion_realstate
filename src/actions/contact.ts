"use server";

import { Resend } from "resend";

// Initialize Resend with your API key from environment variables
// Note: In a real app, you MUST add RESEND_API_KEY to your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_now');

export async function submitContactForm(formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
}) {
    try {
        const { name, email, phone, message } = formData;

        // 1. Email to the Sales Team (Abdullah)
        await resend.emails.send({
            from: "Pavilion Square Inquiries <onboarding@resend.dev>", // Requires verified domain in production
            to: "abdullahzayn04@gmail.com",
            subject: `New Lead: ${name} - Pavilion Square KL`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #c9a84c;">New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #c9a84c; border-radius: 4px;">
            ${message || "<em>No message provided.</em>"}
          </div>
        </div>
      `,
        });

        // 2. Beautiful Auto-Reply to the User
        await resend.emails.send({
            from: "Pavilion Square KL <onboarding@resend.dev>", // Requires verified domain in production
            to: email,
            subject: "Welcome to Elevated Luxury - Pavilion Square KL",
            html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #060914; color: #ffffff; border: 1px solid #333; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          
          <!-- Elegant Header Component -->
          <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #060914 0%, #1a1506 100%); border-bottom: 2px solid #c9a84c;">
            <p style="margin: 0; font-size: 14px; letter-spacing: 4px; text-transform: uppercase; color: #c9a84c; font-weight: bold;">PAVILION SQUARE KL</p>
          </div>

          <!-- Body Content Component -->
          <div style="padding: 40px 30px;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 300; margin-bottom: 20px;">Dear ${name},</h1>
            
            <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for expressing your interest in <strong style="color: #ffd700;">Pavilion Square KL</strong>. We have successfully received your inquiry.
            </p>
            
            <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Rising 67 floors above the prestigious KLCC precinct, Pavilion Square redefines urban luxury. 
              Our dedicated sales consultants are reviewing your details and will contact you directly at <a style="color: #c9a84c;" href="tel:${phone}">${phone}</a> within the next 24 hours to schedule a private gallery viewing.
            </p>

            <!-- Quick Info Box -->
            <div style="background-color: rgba(255,255,255,0.05); border: 1px solid rgba(201,168,76,0.3); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <h3 style="color: #c9a84c; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-top: 0; margin-bottom: 15px;">Your Provided Details</h3>
              <p style="margin: 5px 0; font-size: 14px; color: #aaaaaa;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #aaaaaa;"><strong>Phone:</strong> ${phone}</p>
            </div>

            <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-bottom: 10px;">
              We look forward to speaking with you.
            </p>
            <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin-top: 5px;">
              Best Regards,<br>
              <span style="color: #c9a84c;">The Sales Team</span>
            </p>
          </div>

          <!-- Footer Component -->
          <div style="background-color: #030611; padding: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
             <p style="color: #666666; font-size: 12px; margin: 0;">S-22-12, Menara YNH, 163, Mont Kiara, 50480 Kuala Lumpur</p>
             <p style="color: #666666; font-size: 12px; margin: 10px 0 0 0;">&copy; ${new Date().getFullYear()} YNH Property Berhad. All rights reserved.</p>
          </div>
        </div>
      `,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Resend Error:", error);
        return { success: false, error: error.message };
    }
}
