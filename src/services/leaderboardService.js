import api from './api';
import toast from 'react-hot-toast';

class LeaderboardService {
  async getTopScores() {
    try {
      const response = await api.get('/scores');
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to load leaderboard');
      throw error;
    }
  }

  async submitScore(scoreData) {
    try {
      const response = await api.post('/scores', scoreData);
      toast.success('Score submitted successfully! 🎉');
      return response.data;
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((err) => toast.error(err.msg || err.message));
      } else {
        toast.error(error.message || 'Failed to submit score');
      }
      throw error;
    }
  }

  async getChurches() {
    try {
      const response = await api.get('/scores/churches');
      return response.data.data; // string[]
    } catch {
      return [];
    }
  }

  async addChurch(name) {
    try {
      const response = await api.post('/scores/churches', { name });
      return response.data.data;
    } catch {
      return name; // fail gracefully
    }
  }

  async checkTopRank(score) {
    try {
      const response = await api.get(`/scores/check-top/${score}`);
      return response.data;
    } catch {
      return { rank: null, qualifies: true };
    }
  }
}

const leaderboardService = new LeaderboardService();
export default leaderboardService;
