
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScheduleCallDialog() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Just log for now; you can hook up to Supabase if needed
    console.log({
      date,
      time,
      reason,
    });
    setSubmitting(false);
    setOpen(false);
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
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="call-date">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  disabled={(d) => d < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="call-time">
              Time
            </label>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 opacity-50" />
              <Input
                id="call-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full"
                min="08:00"
                max="20:00"
              />
            </div>
          </div>
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
            <Button type="submit" className="w-full bg-civora-teal hover:bg-civora-teal/90 text-white" disabled={submitting || !date || !time || !reason}>
              {submitting ? "Scheduling..." : "Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
