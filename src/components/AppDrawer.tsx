
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Film, User, PlusCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppDrawer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] bg-white">
        <div className="flex flex-col h-full">
          <div className="py-6 mb-4">
            <h2 className="text-2xl font-bold text-center text-showapp-blue">ShowApp</h2>
          </div>
          
          <div className="space-y-2 flex-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/')}
            >
              <Film size={20} className="mr-2" />
              Home
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/profile')}
            >
              <User size={20} className="mr-2" />
              Profile
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/add-show')}
            >
              <PlusCircle size={20} className="mr-2" />
              Add Show
            </Button>
          </div>
          
          <div className="py-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => handleNavigation('/login')}
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppDrawer;
