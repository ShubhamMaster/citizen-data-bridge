
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FormSubmissionCRUD from '@/components/admin/FormSubmissionCRUD';
import { FileText, MessageSquare, DollarSign, Handshake, Phone, Lightbulb, UserPlus, Calendar, Users } from 'lucide-react';

const FormSubmissions = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FileText className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Form Submissions</h1>
          <p className="text-muted-foreground">Manage all form submissions from your website</p>
        </div>
      </div>

      <FormSubmissionCRUD />
    </div>
  );
};

export default FormSubmissions;
