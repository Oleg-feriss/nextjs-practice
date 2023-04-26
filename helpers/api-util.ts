import { EventData } from '@/types/event.interface';

export const getAllEvents = async (): Promise<EventData[]> => {
  const response = await fetch(
    'https://nextjs-course-5a8d9-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();

  const events: EventData[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async (): Promise<EventData[]> => {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string): Promise<EventData | null> => {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id) || null;
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}): Promise<EventData[]> => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
