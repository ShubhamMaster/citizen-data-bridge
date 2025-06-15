import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock as ClockIcon, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Time slot values in readable format with leading zeros and AM/PM
const TIME_SLOTS = [
  "08:00 AM - 11:00 AM",
  "11:00 AM - 02:00 PM",
  "02:00 PM - 05:00 PM",
];

export default function ScheduleCallDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(""); // NEW FIELD
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Used to close popover after date selection
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Handle date selection and close popover
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setCalendarOpen(false); // closes popover after selection
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("scheduled_calls").insert([
        {
          name,
          mobile, // Include mobile in the insert
          date: date ? format(date, "yyyy-MM-dd") : null,
          time,
          reason,
        }
      ]);
      if (error) {
        toast({
          title: "Error scheduling call",
          description: "Failed to schedule your call. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Call scheduled!",
          description: "Thank you, your callback has been scheduled.",
        });
        // Reset form after submission
        setName("");
        setMobile(""); // Reset the field
        setDate(undefined);
        setTime("");
        setReason("");
        setOpen(false);
      }
    } catch (e) {
      toast({
        title: "Unexpected error",
        description: "Something went wrong.",
        variant: "destructive"
      });
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full sm:w-auto font-semibold text-base bg-civora-teal hover:bg-civora-teal/90 text-white shadow-md"
          style={{ backgroundColor: "#2EA6AA", color: "#fff" }}
        >
          Schedule a Call
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg">Schedule a Call</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field, no icon */}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="call-name">
              Name
            </label>
            <Input
              id="call-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
              autoComplete="name"
              placeholder="Your Name"
            />
          </div>

          {/* Mobile field (no icon) */}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="call-mobile">
              Mobile Number
            </label>
            <Input
              id="call-mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full"
              autoComplete="tel"
              placeholder="Your Mobile Number"
              pattern="^[0-9+\-\s()]{8,16}$"
              maxLength={16}
            />
          </div>

          {/* Date field continues to use the calendar icon for interaction clarity */}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="call-date">
              Date
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  onClick={() => setCalendarOpen(!calendarOpen)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  disabled={(d) => d < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time slot picker -- removed icon for consistency */}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="call-time">
              Time
            </label>
            <select
              id="call-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-civora-teal focus:outline-none"
            >
              <option value="">Select a time</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Reason field (no icon, as before) */}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="reason">
              Reason
            </label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly tell us the reason for the call"
              required
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-civora-teal hover:bg-civora-teal/90 text-white"
              disabled={submitting || !name || !mobile || !date || !time || !reason}
            >
              {submitting ? "Scheduling..." : "Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
