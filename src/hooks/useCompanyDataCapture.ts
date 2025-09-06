
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CompanyData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  address?: string;
  organization?: string;
}

export const useCompanyDataCapture = () => {
  const { toast } = useToast();

  const captureCompanyData = async (data: CompanyData) => {
    try {
      // Extract company name from various fields
      const companyName = data.company || data.organization || data.name || 'Unknown Company';
      
      // Call the database function to extract and store company data
      const { data: result, error } = await supabase.rpc('extract_and_store_company_data', {
        company_name: companyName,
        email: data.email || null,
        phone: data.phone || null,
        website: data.website || null,
        address: data.address || null,
        social_platform: null,
        social_url: null
      });

      if (error) {
        console.error('Error capturing company data:', error);
        return null;
      }

      console.log('Company data captured successfully:', result);
      return result;
    } catch (error) {
      console.error('Error in captureCompanyData:', error);
      return null;
    }
  };

  const extractEmailDomain = (email: string): string | null => {
    const domain = email.split('@')[1];
    return domain ? domain.split('.')[0] : null;
  };

  const captureFromForm = async (formData: any) => {
    // Extract relevant fields from form data
    const companyData: CompanyData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || formData.organization,
      website: formData.website,
      address: formData.address
    };

    // If no explicit company name, try to derive from email domain
    if (!companyData.company && companyData.email) {
      const domain = extractEmailDomain(companyData.email);
      if (domain) {
        companyData.company = domain.charAt(0).toUpperCase() + domain.slice(1);
      }
    }

    return await captureCompanyData(companyData);
  };

  return {
    captureCompanyData,
    captureFromForm,
    extractEmailDomain
  };
};
