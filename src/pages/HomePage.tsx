
import React, { useState } from 'react';
import { Film, Tv, FileVideo } from 'lucide-react';
import { useShows } from '@/contexts/ShowContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ShowCard from '@/components/ShowCard';
import { useNavigate } from 'react-router-dom';
import AppDrawer from '@/components/AppDrawer';
import { deleteShow } from '@/services/api';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { toast } from '@/components/ui/use-toast';

const HomePage: React.FC = () => {
  const { shows, refreshShows, isLoading } = useShows();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showToDelete, setShowToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const movies = shows.filter(show => show.category === 'movie');
  const series = shows.filter(show => show.category === 'serie');
  const anime = shows.filter(show => show.category === 'anime');

  const handleDeleteShow = async () => {
    if (showToDelete !== null) {
      const success = await deleteShow(showToDelete);
      if (success) {
        toast({
          title: "Success",
          description: "Show deleted successfully",
          duration: 3000,
        });
        await refreshShows();
      }
      setIsDeleteDialogOpen(false);
      setShowToDelete(null);
    }
  };

  const confirmDelete = (id: number) => {
    setShowToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const renderShowGrid = (shows: any[]) => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-showapp-blue"></div>
        </div>
      );
    }

    if (shows.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-500 mb-4">No shows found in this category</p>
          <Button
            onClick={() => navigate('/add-show')}
            variant="default"
            className="bg-showapp-blue hover:bg-showapp-darkBlue"
          >
            Add Your First Show
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} onDelete={confirmDelete} />
        ))}
      </div>
    );
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-showapp-blue text-white sticky top-0 z-10">
        <div className="flex items-center">
          <AppDrawer />
          <h1 className="text-xl font-bold">ShowApp</h1>
        </div>
        <Button
          onClick={() => navigate('/add-show')}
          variant="ghost"
          className="text-white hover:bg-showapp-darkBlue"
          size="icon"
        >
          <Film className="h-5 w-5" />
        </Button>
      </header>

      <main className="pb-16">
        <Tabs defaultValue="movies" className="w-full">
          <div className="sticky top-[57px] bg-white z-10 shadow-sm">
            <TabsList className="w-full h-14 bg-white">
              <TabsTrigger value="movies" className="flex-1 h-full data-[state=active]:bg-showapp-blue/10">
                <Film className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Movies</span>
              </TabsTrigger>
              <TabsTrigger value="series" className="flex-1 h-full data-[state=active]:bg-showapp-blue/10">
                <Tv className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Series</span>
              </TabsTrigger>
              <TabsTrigger value="anime" className="flex-1 h-full data-[state=active]:bg-showapp-blue/10">
                <FileVideo className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Anime</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="movies" className="mt-0">
            {renderShowGrid(movies)}
          </TabsContent>
          
          <TabsContent value="series" className="mt-0">
            {renderShowGrid(series)}
          </TabsContent>
          
          <TabsContent value="anime" className="mt-0">
            {renderShowGrid(anime)}
          </TabsContent>
        </Tabs>

        <ConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteShow}
          title="Delete Show"
          description="Are you sure you want to delete this show? This action cannot be undone."
          confirmLabel="Delete"
        />
      </main>
    </>
  );
};

export default HomePage;
