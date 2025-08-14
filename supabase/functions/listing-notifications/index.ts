import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'submitted' | 'approved' | 'rejected';
  listingId: string;
  userEmail: string;
  userName: string;
  carDetails: string;
  rejectionReason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, userEmail, userName, carDetails, rejectionReason }: NotificationRequest = await req.json();

    let subject = "";
    let html = "";

    switch (type) {
      case 'submitted':
        subject = "Listing Submitted - Under Review";
        html = `
          <h1>Thank you for your submission, ${userName}!</h1>
          <p>Your listing for <strong>${carDetails}</strong> has been successfully submitted to Motorado.</p>
          <p>Your listing is now under review by our team and will be published once approved.</p>
          <p>We'll notify you as soon as the review is complete.</p>
          <p>Best regards,<br>The Motorado Team</p>
        `;
        break;
      
      case 'approved':
        subject = "Great News! Your Listing is Now Live";
        html = `
          <h1>Congratulations, ${userName}!</h1>
          <p>Your listing for <strong>${carDetails}</strong> has been approved and is now live on Motorado.</p>
          <p>Potential buyers can now view and contact you about your vehicle.</p>
          <p>Visit Motorado to see your listing online.</p>
          <p>Best regards,<br>The Motorado Team</p>
        `;
        break;
      
      case 'rejected':
        subject = "Listing Review Update";
        html = `
          <h1>Hello ${userName},</h1>
          <p>Thank you for submitting your listing for <strong>${carDetails}</strong>.</p>
          <p>Unfortunately, we were unable to approve your listing for the following reason:</p>
          <p><em>${rejectionReason}</em></p>
          <p>Please make the necessary changes and feel free to submit a new listing.</p>
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>The Motorado Team</p>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "Motorado <noreply@motorado.com>",
      to: [userEmail],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in listing-notifications function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);