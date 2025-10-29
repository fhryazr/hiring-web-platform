"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date?: Date): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface DatePickerProps {
  label: string;
  placeholder?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean; // 🔹 tambahan baru
}

export function DatePicker({
  label,
  placeholder = "Select a date",
  value,
  onChange,
  required = false, // 🔹 default false
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(
    value ?? new Date()
  );

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={label.toLowerCase()} className="px-1">
        <span>
          {label}
          {required && (
            <span className="after:content-['*'] after:text-danger-main ml-1" />
          )}
        </span>
      </Label>

      <div className="relative flex gap-2">
        <Input
          id={label.toLowerCase()}
          readOnly
          required={required} // 🔹 agar ikut validasi native form
          value={formatDate(value ?? undefined)}
          placeholder={placeholder}
          className="bg-background pr-10 cursor-pointer"
          onClick={() => setOpen(true)}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}>
            <Calendar
              mode="single"
              selected={value ?? undefined}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                onChange(date ?? null);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
