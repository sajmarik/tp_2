
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Show } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

interface ShowCardProps {
  show: Show;
  onDelete: (id: number) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onDelete }) => {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:5000";

  const handleEdit = () => {
    navigate(`/edit-show/${show.id}`);
  };

  const handleDelete = () => {
    onDelete(show.id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48">
        <img
          src={show.image ? `${apiUrl}${show.image}` : '/placeholder.svg'}
          alt={show.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate">{show.title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {show.category.charAt(0).toUpperCase() + show.category.slice(1)}
        </p>
        <p className="text-sm line-clamp-2">{show.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleEdit}
          className="flex items-center gap-1"
        >
          <Pencil size={16} /> Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleDelete}
          className="flex items-center gap-1"
        >
          <Trash2 size={16} /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShowCard;
