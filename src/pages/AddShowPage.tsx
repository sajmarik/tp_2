
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShowForm from '@/components/ShowForm';
import { addShow } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { useShows } from '@/contexts/ShowContext';

const AddShowPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { refreshShows } = useShows();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await addShow(formData);
      
      if (result) {
        toast({
          title: "Success",
          description: "Show added successfully!",
          duration: 3000,
        });
        await refreshShows();
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding show:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <header className="flex items-center px-4 py-3 bg-showapp-blue text-white sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-white hover:bg-showapp-darkBlue"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Add Show</h1>
      </header>

      <main className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <ShowForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
    </>
  );
};

export default AddShowPage;
