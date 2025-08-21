import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Send,
  Search,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HelpSupport = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How do I add a new course to the platform?",
      answer: "To add a new course, navigate to 'Course Management' > 'Add Course' in the sidebar. Fill out the required information including course title, description, instructor, and curriculum details. You can also upload course materials and set pricing.",
      category: "Course Management",
    },
    {
      question: "How can I track student progress?",
      answer: "Student progress can be tracked through the 'Students Enrolled' section. You'll see detailed analytics including completion rates, time spent, grades, and last access dates. You can also export this data for further analysis.",
      category: "Student Management",
    },
    {
      question: "How do I configure email notifications?",
      answer: "Go to Settings > Email to configure SMTP settings and customize email templates. You can enable/disable various notification types in Settings > Notifications.",
      category: "Platform Settings",
    },
    {
      question: "Can I customize the platform branding?",
      answer: "Yes, you can customize the platform logo, colors, and description in Settings > General. Upload your organization's logo and modify the platform description to match your branding.",
      category: "Platform Settings",
    },
    {
      question: "How do I generate reports?",
      answer: "Navigate to 'Reports & Analytics' to access comprehensive analytics. You can view enrollment trends, course performance, revenue data, and export reports in various formats.",
      category: "Analytics",
    },
    {
      question: "How do I manage user roles and permissions?",
      answer: "User roles can be managed in Settings > Users. You can set default roles for new users, configure registration settings, and manage permissions for different user types.",
      category: "User Management",
    },
  ];

  const supportTickets = [
    {
      id: "#TK-001",
      subject: "Course video upload issues",
      status: "open",
      priority: "high",
      created: "2024-01-20",
      lastUpdate: "2024-01-20",
    },
    {
      id: "#TK-002",
      subject: "Email notification not working",
      status: "in-progress",
      priority: "medium",
      created: "2024-01-19",
      lastUpdate: "2024-01-20",
    },
    {
      id: "#TK-003",
      subject: "Student enrollment report error",
      status: "resolved",
      priority: "low",
      created: "2024-01-18",
      lastUpdate: "2024-01-19",
    },
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Complete guide to setting up your LMS platform",
      type: "guide",
      icon: BookOpen,
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video tutorials for common tasks",
      type: "video",
      icon: Video,
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      type: "docs",
      icon: FileText,
    },
    {
      title: "User Manual",
      description: "Comprehensive user manual (PDF)",
      type: "download",
      icon: Download,
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTicket = () => {
    toast({
      title: "Support Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-destructive text-destructive-foreground";
      case "in-progress": return "bg-warning text-warning-foreground";
      case "resolved": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers, submit tickets, and access resources
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ticket-subject">Subject</Label>
                  <Input id="ticket-subject" placeholder="Brief description of the issue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticket-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket-description">Description</Label>
                <Textarea
                  id="ticket-description"
                  placeholder="Please provide detailed information about your issue..."
                  className="min-h-[120px]"
                />
              </div>
              <Button onClick={handleSubmitTicket} className="bg-primary hover:bg-primary-hover">
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        <span>{faq.question}</span>
                        <Badge variant="outline" className="ml-auto">
                          {faq.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No FAQ items found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium">{ticket.id}</span>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority} priority
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="font-medium mb-2">{ticket.subject}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Created: {new Date(ticket.created).toLocaleDateString()}
                      </div>
                      <div>
                        Last update: {new Date(ticket.lastUpdate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <resource.icon className="h-6 w-6 text-primary" />
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <Button variant="outline" className="w-full">
                    {resource.type === 'download' ? 'Download' : 'Access'} {resource.title}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-success"></div>
                  <span>Platform setup and configuration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-success"></div>
                  <span>Add your first course</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-success"></div>
                  <span>Invite educators and students</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-muted"></div>
                  <span>Configure email notifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-muted"></div>
                  <span>Set up payment processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-muted"></div>
                  <span>Review analytics and reports</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Email Support</Label>
                  <p className="text-sm text-muted-foreground">support@update-lms.com</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone Support</Label>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Business Hours</Label>
                  <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Emergency Support</Label>
                  <p className="text-sm text-muted-foreground">24/7 for critical issues</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Critical Issues</span>
                  <Badge variant="destructive">1 hour</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">High Priority</span>
                  <Badge variant="outline">4 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Medium Priority</span>
                  <Badge variant="outline">24 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Low Priority</span>
                  <Badge variant="outline">48 hours</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Before Contacting Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Check the FAQ section for common solutions</p>
                <p>• Review our documentation and user guides</p>
                <p>• Try clearing your browser cache and cookies</p>
                <p>• Check if the issue persists in an incognito/private browser window</p>
                <p>• Note any error messages and steps to reproduce the issue</p>
                <p>• Include your browser version and operating system when reporting bugs</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupport;