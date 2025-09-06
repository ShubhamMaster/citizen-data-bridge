
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface EmailRequest {
  to: string;
  subject?: string;
  html?: string;
  formType?: string;
  formData?: any;
}

// --- Templating logic from send-contact-confirmation ---
interface CompanyData {
  company_logo?: string;
  company_name?: string;
}

interface ContactData {
  email?: string;
  phone?: string;
  full_name?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  preference: number;
}

interface EmailHeaderData {
  companyData: CompanyData;
  title: string;
}

interface EmailFooterData {
  contactData: ContactData;
  socialLinks: SocialLink[];
  companyName: string;
}

const getSocialIcon = (platform: string): string => {
  const icons: Record<string, string> = {
    linkedin: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    instagram: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
    twitter: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
    x: 'https://cdn-icons-png.flaticon.com/512/733/733579.png'
  };
  const iconUrl = icons[platform.toLowerCase()];
  if (iconUrl) {
    return `<img src="${iconUrl}" alt="${platform}" width="20" height="20" style="display:inline-block; vertical-align:middle;">`;
  }
  return platform.charAt(0).toUpperCase();
};

const createEmailHeader = (data: EmailHeaderData): string => {
  const { companyData, title } = data;
  return `
    <div style="background: linear-gradient(135deg, #142c52 0%, #2394a7 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">
        ${companyData.company_name || 'Civora Nexus'}
      </h1>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 15px 0 0 0; font-size: 16px; font-weight: 500; line-height: 1.4;">
        ${title}
      </p>
    </div>
  `;
};

const createEmailFooter = (data: EmailFooterData): string => {
  const { contactData, socialLinks, companyName } = data;
  const socialLinksHtml = socialLinks.length > 0 ? `
    <div style="text-align: center; margin: 15px 0;">
      <div style="display: inline-flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
        ${socialLinks.map(link => `
          <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 6px; background: #f8f9fa; text-decoration: none; width: 32px; height: 32px; text-align: center; line-height: 20px;">
            ${getSocialIcon(link.platform)}
          </a>
        `).join('')}
      </div>
    </div>
  ` : '';
  return `
    <div style="background: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
      <div style="margin-bottom: 15px;">
        <div style="display: inline-block; text-align: left; background: white; padding: 12px; max-width: 100%; width: auto;">
          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
            Email: ${contactData.email || 'contact@civoranexus.com'}<br>
            Phone: ${contactData.phone || '7350675192'}<br>
            Contact Person: ${contactData.full_name || 'Contact'}<br>
            Business Hours: Monday - Friday, 9:00 AM - 6:00 PM IST
          </p>
        </div>
      </div>
      ${socialLinksHtml}
      <div style="padding-top: 10px; border-top: 1px solid #cbd5e1;">
        <p style="color: #94a3b8; font-size: 11px; margin: 0; line-height: 1.4;">
          © ${new Date().getFullYear()} ${companyName}. All rights reserved.
        </p>
      </div>
    </div>
  `;
};

const createEmailBody = (userName: string, userEmail: string, description: string): string => {
  return `
    <div style="padding: 30px 20px;">
      <h2 style="color: #142c52; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; line-height: 1.3;">Hello ${userName},</h2>
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
        ${description} Our team will review your submission and get back to you within the specified timeframe.
      </p>
      <div style="background-color: #f0f9ff; padding: 20px; margin: 25px 0; border: 1px solid #e0f2fe;">
        <p style="color: #0369a1; font-size: 13px; line-height: 1.5; margin: 0; font-weight: 500;">
          <strong>Next Steps:</strong> Our team will review your submission and contact you within the specified timeframe. In the meantime, feel free to explore our website to learn more about our innovative solutions.
        </p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://civoranexus.com" style="background: linear-gradient(135deg, #142c52 0%, #2394a7 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: 600; font-size: 14px; display: inline-block;">
          Visit Our Website
        </a>
      </div>
    </div>
  `;
};

const assembleEmail = (
  headerData: EmailHeaderData,
  bodyContent: string,
  footerData: EmailFooterData
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${headerData.title}</title>
      <style>/* ...styles omitted for brevity... */</style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        ${createEmailHeader(headerData)}
        ${bodyContent}
        ${createEmailFooter(footerData)}
      </div>
    </body>
    </html>
  `;
};

const fetchCompanyData = async (): Promise<CompanyData> => {
  try {
    const { data, error } = await supabase
      .from('civora_nexus_companies')
      .select('company_logo, company_name')
      .eq('company_id', '9622904d-4f26-4e99-8909-7beb93f7babf')
      .single();
    if (error) {
      console.error('Error fetching company data:', error);
      return { company_name: 'Civora Nexus', company_logo: '' };
    }
    return { company_logo: data.company_logo || '', company_name: data.company_name || 'Civora Nexus' };
  } catch (error) {
    console.error('Error in fetchCompanyData:', error);
    return { company_name: 'Civora Nexus', company_logo: '' };
  }
};

const fetchContactData = async (): Promise<ContactData> => {
  try {
    const { data, error } = await supabase
      .from('civora_nexus_company_contacts')
      .select('email, phone, full_name')
      .eq('contact_id', 'support_contact_125625')
      .single();
    if (error) {
      console.error('Error fetching contact data:', error);
      return { email: 'contact@civoranexus.com', phone: '7350675192', full_name: 'Contact' };
    }
    return {
      email: data.email || 'contact@civoranexus.com',
      phone: data.phone || '7350675192',
      full_name: data.full_name || 'Contact'
    };
  } catch (error) {
    console.error('Error in fetchContactData:', error);
    return { email: 'contact@civoranexus.com', phone: '7350675192', full_name: 'Contact' };
  }
};

const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  try {
    const { data, error } = await supabase
      .from('civora_nexus_social_links')
      .select('platform, url, preference')
      .in('social_id', ['social_linkedin_761586', 'social_instagram_856952', 'social_twitter_652832'])
      .order('preference', { ascending: true });
    if (error) {
      console.error('Error fetching social links:', error);
      return [];
    }
    return data.map(item => ({ platform: item.platform || '', url: item.url || '', preference: item.preference || 0 }));
  } catch (error) {
    console.error('Error in fetchSocialLinks:', error);
    return [];
  }
};

const getEmailTemplate = (formType: string) => {
  const templates = {
    contact: {
      subject: "Thank you for contacting us - We'll be in touch soon",
      title: "Thank You for Contacting Us!",
      description: "We have received your inquiry and want to thank you for your interest in Civora Nexus."
    },
    investment: {
      subject: "Investment Inquiry Received - Thank you for your interest",
      title: "Thank You for Your Investment Interest!",
      description: "We have received your investment inquiry and appreciate your interest in Civora Nexus. Our investment team will review your proposal and contact you within 24-48 hours."
    },
    partnership: {
      subject: "Partnership Inquiry Received - Let's collaborate",
      title: "Thank You for Your Partnership Interest!",
      description: "We have received your partnership proposal and are excited about potential collaboration opportunities. Our partnership team will review your proposal and get back to you soon."
    },
    collaboration: {
      subject: "R&D Collaboration Request Received - Innovation awaits",
      title: "Thank You for Your Collaboration Interest!",
      description: "We have received your R&D collaboration request and are thrilled about the potential for innovation together. Our research team will review your proposal and contact you within 48 hours."
    },
    consultation: {
      subject: "Consultation Request Received - We're here to help",
      title: "Thank You for Your Consultation Request!",
      description: "We have received your consultation request and are ready to help you achieve your goals. Our expert team will review your requirements and schedule a consultation within 24 hours."
    },
    sales: {
      subject: "Sales Inquiry Received - Let's discuss your needs",
      title: "Thank You for Your Sales Inquiry!",
      description: "We have received your sales inquiry and appreciate your interest in our solutions. Our sales team will review your requirements and contact you within 24 hours."
    },
    technical: {
      subject: "Technical Support Request Received - Expert help on the way",
      title: "Thank You for Your Technical Support Request!",
      description: "We have received your technical support request. Our technical experts will review your requirements and provide detailed guidance within 24-48 hours."
    },
    innovation: {
      subject: "Innovation Lab Application Received - Welcome to innovation",
      title: "Thank You for Your Innovation Lab Application!",
      description: "We have received your Innovation Lab application and are excited about your innovative ideas. Our team will review your application and contact you within 48 hours."
    },
    saas: {
      subject: "SaaS Project Request Received - Let's build something amazing",
      title: "Thank You for Your SaaS Project Request!",
      description: "We have received your SaaS project request and are excited to help bring your vision to life. Our development team will review your requirements and contact you within 24 hours."
    },
    salary: {
      subject: "Salary Inquiry Received - We value your interest",
      title: "Thank You for Your Salary Inquiry!",
      description: "We have received your salary inquiry and appreciate your interest in career opportunities with Civora Nexus. Our HR team will review your information and contact you within 24 hours."
    },
    internship: {
      subject: "Internship Application Received - Exciting opportunities ahead",
      title: "Thank You for Your Internship Application!",
      description: "We have received your internship application and are excited about your interest in joining our team. Our HR team will review your application and contact you within 48 hours."
    }
  };
  return templates[formType] || templates.contact;
};

const fetchBrevoApiKey = async (senderEmail: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('api_key')
    .eq('email', senderEmail)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) {
    console.error('Error fetching Brevo API key:', error);
    return null;
  }
  return data.api_key;
};

const sendBrevoEmail = async (emailData: any, apiKey: string) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify(emailData)
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Brevo API error:', errorData);
    throw new Error(`Brevo API error: ${response.status}`);
  }

  return response.json();
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { to, subject, html, formType, formData }: EmailRequest = await req.json();
    let finalSubject = subject;
    let finalHtml = html;
    // If formType is provided, use the template logic
    if (formType) {
      // Fetch company/contact/social data
      const [companyData, contactData, socialLinks] = await Promise.all([
        fetchCompanyData(),
        fetchContactData(),
        fetchSocialLinks()
      ]);
      const template = getEmailTemplate(formType);
      finalSubject = template.subject;
      const headerData: EmailHeaderData = {
        companyData,
        title: template.title
      };
      const footerData: EmailFooterData = {
        contactData,
        socialLinks,
        companyName: companyData.company_name || 'Civora Nexus'
      };
      const emailBody = createEmailBody(formData?.name || '', formData?.email || '', template.description);
      finalHtml = assembleEmail(headerData, emailBody, footerData);
    }
    const senderEmail = "noreply@civoranexus.com";
    const brevoApiKey = await fetchBrevoApiKey(senderEmail);
    if (!brevoApiKey) {
      throw new Error(`No Brevo API key found for email: ${senderEmail}`);
    }
    const emailData = {
      sender: { name: "Civora Nexus", email: senderEmail },
      to: [{ email: to }],
      subject: finalSubject,
      htmlContent: finalHtml,
    };
    const result = await sendBrevoEmail(emailData, brevoApiKey);
    return new Response(
      JSON.stringify({ success: true, messageId: result.messageId, result }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in noreply email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
