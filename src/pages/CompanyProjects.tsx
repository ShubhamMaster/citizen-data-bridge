
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, FileText } from 'lucide-react';

const CompanyProjects = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Company Projects
          </h1>
          <p className="text-muted-foreground">Manage and track company project portfolios</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Project Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Company Projects Page</h3>
            <p className="text-muted-foreground mb-4">
              This page is under development. It will allow you to manage company project portfolios, 
              track project progress, and view detailed project information.
            </p>
            <div className="text-sm text-muted-foreground">
              Features coming soon:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Project timeline management</li>
                <li>Resource allocation tracking</li>
                <li>Client project portfolios</li>
                <li>Project status reporting</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProjects;
