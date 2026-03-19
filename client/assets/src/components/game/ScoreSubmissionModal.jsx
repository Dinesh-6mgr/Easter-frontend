import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from '../common/Modal';
import Button from '../common/Button';
import leaderboardService from '../../services/leaderboardService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const ScoreSubmissionModal = ({ isOpen, onClose, score }) => {
  const [formData, setFormData] = useState({ name: '', church: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useLocalStorage('score-submitted', false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', church: '' });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (hasSubmitted) {
      toast.error('You have already submitted a score!');
      onClose();
      return;
    }

    setIsSubmitting(true);

    try {
      await leaderboardService.submitScore({
        ...formData,
        score
      });
      
      setHasSubmitted(true);
      toast.success('Score submitted successfully! 🎉');
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🎉 Congratulations!">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="text-5xl mb-4"
          >
            🏆
          </motion.div>
          <p className="text-2xl font-bold text-easter-purple mb-2">
            You scored {score} points!
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your details to join the leaderboard
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-easter-purple focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Church Name
          </label>
          <input
            type="text"
            name="church"
            value={formData.church}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={100}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-easter-purple focus:border-transparent"
            placeholder="Enter your church name"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Score'}
          </Button>
        </div>

        {hasSubmitted && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400 text-center">
            You can only submit one score per device
          </p>
        )}
      </form>
    </Modal>
  );
};

export default ScoreSubmissionModal;