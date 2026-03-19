import api from './api';
import toast from 'react-hot-toast';

class LeaderboardService {
  async getTopScores() {
    try {
      const response = await api.get('/scores');
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
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
      console.error('Error submitting score:', error);
      
      if (error.errors) {
        error.errors.forEach(err => {
          toast.error(err.msg || err.message);
        });
      } else {
        toast.error(error.message || 'Failed to submit score');
      }
      
      throw error;
    }
  }

  async getUserRank(score) {
    try {
      const response = await api.get(`/scores/rank/${score}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rank:', error);
      return null;
    }
  }
}

export default new LeaderboardService();