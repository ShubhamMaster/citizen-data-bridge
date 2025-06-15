
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Eye, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

type ApplicationsCardProps = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filteredApplications: any[];
  exportCSV: () => void;
  exportPDF: () => void;
  setViewedApp: (app: any) => void;
  viewedApp: any | null;
  handleDownloadApplication: (app: any) => void;
  handleStatusChange: (id: number, newStatus: string) => void;
  statusSaving: string | null;
};

const ApplicationsCard: React.FC<ApplicationsCardProps> = ({
  searchTerm,
  setSearchTerm,
  filteredApplications,
  exportCSV,
  exportPDF,
  setViewedApp,
  viewedApp,
  handleDownloadApplication,
  handleStatusChange,
  statusSaving
}) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>Job Applications</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
              aria-label="Search applications"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportCSV}>Export as Excel (CSV)</DropdownMenuItem>
              <DropdownMenuItem onClick={exportPDF}>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      {filteredApplications.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500">
            As a new company, you'll see job applications here once candidates start applying.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* ...copy the applications table and modal structure from AdminDashboard.tsx... */}
        </div>
      )}
    </CardContent>
  </Card>
);

export default ApplicationsCard;

