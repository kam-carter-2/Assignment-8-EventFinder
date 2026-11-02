
import { Link } from 'react-router-dom';
import './EventCard.css';

function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0];

  const image =
    event.images?.find((img) => img.ratio === '16_9' && img.width >= 640) ||
    event.images?.[0];

  const eventDate = event.dates?.start?.localDate || 'Date TBA';

  const venueName = venue?.name || 'Venue TBA';

  return (
    <article className="event-card">
      <img
        src={
          image?.url ||
          'https://placehold.co/600x338?text=Event+Image'
        }
        alt={event.name || 'Event image'}
        className="event-image"
        loading="lazy"
      />

      <div className="event-info">
        <h3 className="event-title">
          {event.name || 'Untitled Event'}
        </h3>

        <p className="event-date">
          📅 {eventDate}
        </p>

        <p className="event-venue">
          📍 {venueName}
        </p>

        <Link
          to={`/events/${event.id}`}
          className="view-button"
          aria-label={`View details for ${event.name || 'event'}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
