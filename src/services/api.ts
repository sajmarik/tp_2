
import { toast } from "@/components/ui/use-toast";

const API_URL = "http://localhost:5000";

export interface Show {
  id: number;
  title: string;
  description: string;
  category: 'movie' | 'anime' | 'serie';
  image: string;
}

export const fetchShows = async (): Promise<Show[]> => {
  try {
    const response = await fetch(`${API_URL}/shows`);
    if (!response.ok) {
      throw new Error('Failed to fetch shows');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching shows:', error);
    toast({
      title: "Error",
      description: "Failed to load shows. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

export const addShow = async (formData: FormData): Promise<Show | null> => {
  try {
    const response = await fetch(`${API_URL}/shows`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add show');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding show:', error);
    toast({
      title: "Error",
      description: "Failed to add show. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

export const updateShow = async (id: number, formData: FormData): Promise<Show | null> => {
  try {
    const response = await fetch(`${API_URL}/shows/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update show');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating show:', error);
    toast({
      title: "Error",
      description: "Failed to update show. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

export const deleteShow = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/shows/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete show');
    }

    return true;
  } catch (error) {
    console.error('Error deleting show:', error);
    toast({
      title: "Error",
      description: "Failed to delete show. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

export const loginUser = async (email: string, password: string): Promise<boolean> => {
  // This is a mock implementation since backend doesn't have auth
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation (in real app, this would be a server check)
    if (email === "test@example.com" && password === "password") {
      return true;
    }
    
    throw new Error('Invalid credentials');
  } catch (error) {
    console.error('Login error:', error);
    toast({
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};
