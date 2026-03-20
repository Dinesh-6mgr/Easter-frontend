const KEY = 'easter_user_id';

// Generate a random ID like "user_a3f9b2c1"
const generate = () =>
  'user_' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);

// Returns existing userId from localStorage, or creates + stores a new one
export const getUserId = () => {
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = generate();
    localStorage.setItem(KEY, id);
  }
  return id;
};
