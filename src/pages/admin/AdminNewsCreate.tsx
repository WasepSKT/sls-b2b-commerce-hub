import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Image, Save } from "lucide-react";

const AdminNewsCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [publishDate, setPublishDate] = useState<Date>();
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    tags: "",
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: "News post saved",
      description: "Your news post has been saved successfully.",
    });
    navigate("/admin/news");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Create News Post</h2>
            <p className="text-gray-500 mt-1">
              Create and publish news articles and announcements
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/admin/news")}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter post title"
                    value={newsData.title}
                    onChange={(e) =>
                      setNewsData({ ...newsData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Write your post content here..."
                    className="min-h-[300px]"
                    value={newsData.content}
                    onChange={(e) =>
                      setNewsData({ ...newsData, content: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your post for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Meta Title</Label>
                  <Input
                    placeholder="Enter meta title"
                    value={newsData.metaTitle}
                    onChange={(e) =>
                      setNewsData({ ...newsData, metaTitle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    placeholder="Enter meta description"
                    value={newsData.metaDescription}
                    onChange={(e) =>
                      setNewsData({
                        ...newsData,
                        metaDescription: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input
                    placeholder="Enter tags separated by commas"
                    value={newsData.tags}
                    onChange={(e) =>
                      setNewsData({ ...newsData, tags: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newsData.category}
                    onValueChange={(value) =>
                      setNewsData({ ...newsData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newsData.status}
                    onValueChange={(value) =>
                      setNewsData({ ...newsData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {publishDate ? (
                          format(publishDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={publishDate}
                        onSelect={setPublishDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Featured Post</Label>
                  <Switch
                    checked={newsData.featured}
                    onCheckedChange={(checked) =>
                      setNewsData({ ...newsData, featured: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4">
                  {newsData.image ? (
                    <img
                      src={newsData.image}
                      alt="Featured"
                      className="max-h-[200px] object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNewsData({
                                    ...newsData,
                                    image: reader.result as string,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                {newsData.image && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setNewsData({ ...newsData, image: "" })}
                  >
                    Remove Image
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewsCreate; 