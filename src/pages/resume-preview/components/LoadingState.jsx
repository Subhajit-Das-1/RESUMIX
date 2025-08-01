import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ message = "Loading resume preview..." }) => {
  return (
    <div className="flex-1 bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Icon name="FileText" size={32} className="text-blue-600 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Preparing Your Resume
        </h2>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;