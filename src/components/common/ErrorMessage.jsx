import Button from './Button';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center py-12">
    <p className="text-5xl mb-4">😕</p>
    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{message}</p>
    {onRetry && <Button onClick={onRetry}>Try Again</Button>}
  </div>
);

export default ErrorMessage;
