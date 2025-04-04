"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EventDialog } from "./event-dialog";
import { EventList } from "./event-list";
import { Event } from "@/types/types";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "@/api/api";
import { useForm } from "react-hook-form";
import { eventFormSchema, EventFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";

export function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      artist_id: 0,
      user_id: 0,
      title: "",
      description: "",
      event_date: new Date(),
      location: "",
    },
  });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        toast.error("Failed to load events");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.event_date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const handleSubmit = async (values: EventFormValues) => {
    try {
      const eventDate = new Date(values.event_date);
      const timezoneOffset = eventDate.getTimezoneOffset() * 60000;
      const localISOTime = new Date(eventDate.getTime() - timezoneOffset)
        .toISOString()
        .split("T")[0];

      if (currentEvent) {
        const updatedEvent = await updateEvent(currentEvent.id, {
          ...values,
          event_date: localISOTime,
        });
        setEvents(
          events.map((e) => (e.id === currentEvent.id ? updatedEvent : e))
        );
        toast.success("Event updated successfully");
      } else {
        const newEvent = await createEvent({
          ...values,
          event_date: localISOTime,
        });
        setEvents([...events, newEvent]);
        toast.success("Event created successfully");
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save event");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("Failed to delete event");
      console.error(error);
    }
  };

  const handleAddNewEvent = () => {
    setCurrentEvent(null);
    form.reset({
      artist_id: 0,
      user_id: 0,
      title: "",
      description: "",
      event_date: selectedDate,
      location: "",
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Section - Updated styling here */}
        <div className="lg:w-2/3 bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col min-h-[600px]">
          <div className="flex-grow p-4 flex flex-col">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
                  form.setValue("event_date", date);
                }
              }}
              className="flex flex-col h-full"
              classNames={{
                months: "flex flex-col h-full",
                month: "space-y-4 flex-grow",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full flex-1 border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] flex items-center justify-center",
                row: "flex w-full mt-2",
                cell: "h-12 w-full text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: `
                  h-10 w-10 mx-auto p-0 font-normal
                  aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground
                  rounded-full flex items-center justify-center
                  transition-colors
                `,
                day_selected: `
                  text-primary-foreground bg-primary/10
                  hover:bg-primary/20 focus:bg-primary/20
                  border border-primary
                `,
                day_today:
                  "bg-accent text-accent-foreground border border-primary",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              modifiers={{
                hasEvents: events.map((event) => new Date(event.event_date)),
              }}
              modifiersStyles={{
                hasEvents: {
                  border: "2px solid #3b82f6",
                  borderRadius: "50%",
                },
              }}
            />
          </div>

          <div className="mt-6 flex gap-4 p-4">
            <Button className="flex-1" onClick={handleAddNewEvent}>
              Add New Event
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                const today = new Date();
                setSelectedDate(today);
                form.setValue("event_date", today);
              }}
            >
              Today
            </Button>
          </div>
        </div>

        {/* Events List Section */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              <EventList
                events={getEventsForDate(selectedDate)}
                date={selectedDate}
                onEdit={(event) => {
                  setCurrentEvent(event);
                  form.reset({
                    ...event,
                    event_date: new Date(event.event_date),
                  });
                  setIsDialogOpen(true);
                }}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      <EventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        form={form}
      />
    </div>
  );
}
