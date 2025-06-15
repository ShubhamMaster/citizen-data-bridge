
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

type VisitorsCardProps = {
  websiteVisits: any[];
  stats: { totalVisitors: number };
};

const VisitorsCard: React.FC<VisitorsCardProps> = ({ websiteVisits, stats }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Website Visitors</p>
          <p className="text-3xl font-bold text-civora-navy">{stats.totalVisitors}</p>
          <p className="text-xs text-gray-500">Since launch</p>
        </div>
        <Users className="h-8 w-8 text-civora-teal" />
      </div>
      <div className="overflow-x-auto mt-5 max-h-64">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Path</th>
              <th className="px-2 py-1">Device</th>
              <th className="px-2 py-1">Brand</th>
              <th className="px-2 py-1">Model</th>
              <th className="px-2 py-1">OS</th>
              <th className="px-2 py-1">Browser</th>
              <th className="px-2 py-1">City</th>
              <th className="px-2 py-1">Country</th>
              <th className="px-2 py-1">IP</th>
            </tr>
          </thead>
          <tbody>
            {websiteVisits.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center text-gray-400 py-4">
                  No visits logged yet
                </td>
              </tr>
            ) : (
              websiteVisits.map((v) => (
                <tr key={v.id}>
                  <td className="px-2 py-1">{new Date(v.visited_at).toLocaleString()}</td>
                  <td className="px-2 py-1">{v.path}</td>
                  <td className="px-2 py-1">{v.device_type}</td>
                  <td className="px-2 py-1">{v.device_brand}</td>
                  <td className="px-2 py-1">{v.device_model}</td>
                  <td className="px-2 py-1">{v.os_name}</td>
                  <td className="px-2 py-1">{v.browser_name}</td>
                  <td className="px-2 py-1">{v.city}</td>
                  <td className="px-2 py-1">{v.country}</td>
                  <td className="px-2 py-1">{v.ip_address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);
export default VisitorsCard;
