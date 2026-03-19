import api from './api';

const SESSION_KEY = 'easter_visited';

const visitorService = {
  // Call once per session — increments count and returns total
  async ping() {
    // Only ping once per browser session
    if (sessionStorage.getItem(SESSION_KEY)) {
      const res = await api.get('/visitors');
      return res.data.count;
    }
    sessionStorage.setItem(SESSION_KEY, '1');
    const res = await api.post('/visitors/ping');
    return res.data.count;
  },
};

export default visitorService;
