import api from './api';

const STORAGE_KEY = 'easter_visited';

const visitorService = {
  // Count once per device (persists across sessions via localStorage)
  async ping() {
    if (localStorage.getItem(STORAGE_KEY)) {
      const res = await api.get('/visitors');
      return res.data.count;
    }
    localStorage.setItem(STORAGE_KEY, '1');
    const res = await api.post('/visitors/ping');
    return res.data.count;
  },
};

export default visitorService;
