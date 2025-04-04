"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/types";
import { format } from "date-fns";

interface EventListProps {
  events: Event[];
  date: Date;
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

export function EventList({ events, date, onEdit, onDelete }: EventListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        {format(date, "MMMM d, yyyy")}
      </h2>

      {events.length === 0 ? (
        <p className="text-muted-foreground">
          No events scheduled for this day.
        </p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4">
            <h3 className="font-medium text-lg">{event.title}</h3>
            {event.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {event.description}
              </p>
            )}
            <div className="mt-3 text-sm space-y-1">
              {event.location && <p>Location: {event.location}</p>}
              <p>Time: {format(new Date(event.event_date), "MMMM d, yyyy")}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(event.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
