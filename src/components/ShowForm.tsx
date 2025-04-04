
import React, { useState, useEffect, ChangeEvent } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Show } from '@/services/api';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.enum(["movie", "anime", "serie"], {
    required_error: "Please select a category.",
  }),
});

interface ShowFormProps {
  initialData?: Show;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

const ShowForm: React.FC<ShowFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: (initialData?.category as "movie" | "anime" | "serie") || "movie",
    },
  });

  useEffect(() => {
    if (initialData?.image) {
      setImagePreview(`http://localhost:5000${initialData.image}`);
    }
  }, [initialData]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter show title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter show description" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="serie">Series</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-3">
          <FormLabel>Show Image</FormLabel>
          <div className="flex flex-col items-center gap-4">
            {imagePreview ? (
              <div className="relative w-full h-48">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-md" 
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-muted flex items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">No image selected</p>
              </div>
            )}
            
            <div className="flex gap-4 w-full">
              <label htmlFor="gallery" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  asChild
                >
                  <div>
                    <ImageIcon size={18} />
                    <span>Gallery</span>
                  </div>
                </Button>
                <Input
                  id="gallery"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              
              <label htmlFor="camera" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  asChild
                >
                  <div>
                    <Camera size={18} />
                    <span>Camera</span>
                  </div>
                </Button>
                <Input
                  id="camera"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-showapp-blue hover:bg-showapp-darkBlue" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Show' : 'Add Show'}
        </Button>
      </form>
    </Form>
  );
};

export default ShowForm;
