import dynamic from "next/dynamic";

const EventsPage = () => {
  const EventsCard = dynamic(
    () => import("@/components/event-card/EventsCard"),
    {
      ssr: false,
    }
  );
  return <EventsCard />;
};
export default EventsPage;
