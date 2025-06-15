
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CompanySettingsCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Company Settings</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="company-name">Company Name</Label>
        <Input
          id="company-name"
          defaultValue="Civora Nexus"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="contact-email">Contact Email</Label>
        <Input
          id="contact-email"
          defaultValue="civoranexus@gmail.com"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="company-status">Company Status</Label>
        <Input
          id="company-status"
          defaultValue="Newly Launched Startup"
          className="mt-1"
          readOnly
        />
      </div>
      <Button className="w-full bg-civora-teal hover:bg-civora-teal/90">
        Save Settings
      </Button>
    </CardContent>
  </Card>
);

export default CompanySettingsCard;
