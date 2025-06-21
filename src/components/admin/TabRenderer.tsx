
import React from "react";
import DashboardOverview from "./DashboardOverview";
import AdminProfileTab from "./AdminProfileTab";
import InternsTab from "./InternsTab";
import ScheduledCallsTab from "./ScheduledCallsTab";
import ContactMessagesTab from "./ContactMessagesTab";
import SalaryInquiriesTab from "./SalaryInquiriesTab";
import TechnicalSupportTab from "./TechnicalSupportTab";
import RecycleBinTab from "./RecycleBinTab";
import ManageAdminsTab from "./ManageAdminsTab";
import JobManagement from "../JobManagement";

interface TabRendererProps {
  activeTab: string;
  stats: any;
  showWarning: boolean;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  extendSession: () => void;
  setShowWarning: (show: boolean) => void;
  userRole: string | null;
}

const TabRenderer: React.FC<TabRendererProps> = ({
  activeTab,
  stats,
  showWarning,
  timeLeft,
  formatTime,
  extendSession,
  setShowWarning,
  userRole
}) => {
  switch (activeTab) {
    case 'overview':
      return (
        <DashboardOverview
          stats={stats}
          showWarning={showWarning}
          timeLeft={timeLeft}
          formatTime={formatTime}
          extendSession={extendSession}
          setShowWarning={setShowWarning}
          userRole={userRole}
        />
      );
    case 'interns':
      return <InternsTab />;
    case 'scheduled-calls':
      return <ScheduledCallsTab />;
    case 'contact-messages':
      return <ContactMessagesTab />;
    case 'jobs':
      return <JobManagement />;
    case 'salary':
      return <SalaryInquiriesTab />;
    case 'support':
      return <TechnicalSupportTab />;
    case 'recycle-bin':
      return <RecycleBinTab />;
    case 'manage-admins':
      return <ManageAdminsTab />;
    case 'profile':
      return <AdminProfileTab />;
    default:
      return <div>Tab not found</div>;
  }
};

export default TabRenderer;
