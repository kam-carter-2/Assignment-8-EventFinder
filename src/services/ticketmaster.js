
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

const checkApiKey = () => {
  if (!API_KEY) {
    throw new Error(
      'Ticketmaster API key is missing. Check your root .env file and restart Vite.'
    );
  }
};

const fetchTicketmaster = async (url) => {
  checkApiKey();

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.fault?.faultstring ||
      errorData.errors?.[0]?.detail ||
      `Ticketmaster request failed: ${response.status}`
    );
  }

  return response.json();
};

export const getEvents = async (city = 'New York', size = 20) => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    size: String(size),
    city,
    sort: 'date,asc'
  });

  const data = await fetchTicketmaster(
    `${BASE_URL}/events.json?${params.toString()}`
  );

  return data._embedded?.events || [];
};

export const getEventById = async (id) => {
  const data = await fetchTicketmaster(
    `${BASE_URL}/events/${encodeURIComponent(id)}.json?apikey=${encodeURIComponent(API_KEY)}`
  );

  return data;
};
