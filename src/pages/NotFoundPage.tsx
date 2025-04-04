
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col items-center max-w-md w-full text-center">
        <div className="bg-yellow-100 p-4 rounded-full mb-6">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4 w-full">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-showapp-blue hover:bg-showapp-darkBlue"
          >
            Go to Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
