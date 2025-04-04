
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Film, Heart, Settings, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@email.com');
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      duration: 3000,
    });
    
    setIsSaving(false);
  };

  const renderMenuItem = (icon: React.ReactNode, label: string, onClick?: () => void) => (
    <Button
      variant="ghost"
      className="justify-start w-full h-14"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-full">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex-grow"></div>
      <ChevronLeft className="h-5 w-5 rotate-180" />
    </Button>
  );

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
        <h1 className="text-xl font-bold">Profile</h1>
      </header>

      <main className="pb-16">
        <Tabs defaultValue="profile" className="w-full">
          <div className="sticky top-[57px] bg-white z-10 shadow-sm">
            <TabsList className="w-full h-14 bg-white">
              <TabsTrigger value="profile" className="flex-1 h-full data-[state=active]:bg-showapp-blue/10">
                Profile
              </TabsTrigger>
              <TabsTrigger value="edit" className="flex-1 h-full data-[state=active]:bg-showapp-blue/10">
                Edit Profile
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="profile">
            <div className="flex flex-col items-center py-8">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="https://i.pravatar.cc/300" alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">{name}</h2>
              <p className="text-gray-500 mb-6">{email}</p>
              
              <div className="w-full max-w-md px-4">
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {renderMenuItem(<Film className="h-5 w-5 text-showapp-blue" />, "My Shows")}
                  {renderMenuItem(<Heart className="h-5 w-5 text-showapp-blue" />, "Favorites")}
                  {renderMenuItem(<Settings className="h-5 w-5 text-showapp-blue" />, "Settings")}
                  {renderMenuItem(
                    <LogOut className="h-5 w-5 text-red-500" />, 
                    "Logout",
                    () => navigate('/login')
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="edit">
            <div className="p-4 max-w-md mx-auto">
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-showapp-blue hover:bg-showapp-darkBlue"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default ProfilePage;
