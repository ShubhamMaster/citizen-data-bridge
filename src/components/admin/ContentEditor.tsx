import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

type Props = {
  section: string;
  label: string;
};

const ContentEditor: React.FC<Props> = ({ section, label }) => {
  const {
    content,
    setContent,
    loading,
    saving,
    error,
    saveContent,
  } = useWebsiteContent(section);

  // Default state for common fields
  const [editState, setEditState] = useState<any>({
    title: "",
    subtitle: "",
    description: "",
    services: [],
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (content) {
      setEditState(content);
    }
  }, [content]);

  // Simple mappings for which fields to show
  let fields: JSX.Element[] = [];
  if (section === "hero") {
    fields = [
      <Input
        key="title"
        className="mb-2"
        placeholder="Headline"
        value={editState.title || ""}
        onChange={(e) => setEditState({ ...editState, title: e.target.value })}
      />,
      <Textarea
        key="subtitle"
        className="mb-2"
        placeholder="Subtitle"
        value={editState.subtitle || ""}
        onChange={(e) => setEditState({ ...editState, subtitle: e.target.value })}
      />
    ];
  } else if (section === "about") {
    fields = [
      <Textarea
        key="description"
        className="mb-2"
        placeholder="About Us"
        value={editState.description || ""}
        onChange={(e) => setEditState({ ...editState, description: e.target.value })}
      />
    ];
  } else if (section === "services") {
    fields = [
      <Textarea
        key="services"
        className="mb-2"
        placeholder="Services (comma separated)"
        value={Array.isArray(editState.services) ? editState.services.join(", ") : ""}
        onChange={(e) =>
          setEditState({
            ...editState,
            services: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean),
          })
        }
      />
    ];
  } else if (section === "contact") {
    fields = [
      <Input
        key="address"
        className="mb-2"
        placeholder="Address"
        value={editState.address || ""}
        onChange={(e) => setEditState({ ...editState, address: e.target.value })}
      />,
      <Input
        key="email"
        className="mb-2"
        placeholder="Email"
        value={editState.email || ""}
        onChange={(e) => setEditState({ ...editState, email: e.target.value })}
      />,
      <Input
        key="phone"
        className="mb-2"
        placeholder="Phone"
        value={editState.phone || ""}
        onChange={(e) => setEditState({ ...editState, phone: e.target.value })}
      />
    ];
  }

  return (
    <form
      className="p-3 border rounded mb-4 bg-gray-50"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveContent(editState);
      }}
    >
      <div className="font-semibold mb-2">{label}</div>
      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <>
          {fields}
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              disabled={saving}
              className="bg-civora-teal hover:bg-civora-teal/90"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save
            </Button>
            {error && (
              <span className="text-xs text-red-600">{error}</span>
            )}
          </div>
        </>
      )}
    </form>
  );
};
export default ContentEditor;
