
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShowForm from '@/components/ShowForm';
import { updateShow, fetchShows, Show } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { useShows } from '@/contexts/ShowContext';

const EditShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { refreshShows } = useShows();

  useEffect(() => {
    const loadShow = async () => {
      try {
        const shows = await fetchShows();
        const foundShow = shows.find(s => s.id === Number(id));
        if (foundShow) {
          setShow(foundShow);
        } else {
          toast({
            title: "Error",
            description: "Show not found",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading show:', error);
        toast({
          title: "Error",
          description: "Failed to load show details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadShow();
    }
  }, [id, navigate]);

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await updateShow(Number(id), formData);
      
      if (result) {
        toast({
          title: "Success",
          description: "Show updated successfully!",
          duration: 3000,
        });
        await refreshShows();
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating show:', error);
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
        <h1 className="text-xl font-bold">Edit Show</h1>
      </header>

      <main className="p-4 max-w-2xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-showapp-blue"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {show && (
              <ShowForm 
                initialData={show}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default EditShowPage;
