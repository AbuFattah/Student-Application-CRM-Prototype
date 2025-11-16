import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { UserPlus, FileText, Users, DollarSign, ClipboardList, Send } from 'lucide-react';
import type { User } from '../../App';

interface MarketingOfficerDashboardProps {
  user: User;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: 'new' | 'contacted' | 'file-opened' | 'transferred';
  dateAdded: string;
  notes?: string;
}

export default function MarketingOfficerDashboard({ user }: MarketingOfficerDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Shabab Ahmed',
      email: 'shabab@email.com',
      phone: '+880123333232',
      country: 'Bangladesh',
      status: 'contacted',
      dateAdded: '2025-11-15',
      notes: 'Interested in Computer Science programs',
    },
    {
      id: '2',
      name: 'Shouvik Rahamn',
      email: 'srahamn@email.com',
      phone: '+91 87654 32109',
      country: 'Bangladesh',
      status: 'file-opened',
      dateAdded: '2025-11-14',
      notes: 'Payment received, documents checklist sent',
    },
    {
      id: '3',
      name: 'Mohammed Hassan',
      email: 'mohammed.h@email.com',
      phone: '+92 321 7654321',
      country: 'Bangladesh',
      status: 'new',
      dateAdded: '2025-11-16',
    },
  ]);

  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [checklistOpen, setChecklistOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Marketing Dashboard</h2>
          <p className="text-gray-600">Manage leads and student onboarding</p>
        </div>
        <Dialog open={addLeadOpen} onOpenChange={setAddLeadOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="size-4 mr-2" />
              Add New Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Register a new student lead</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leadName">Full Name</Label>
                <Input id="leadName" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadEmail">Email</Label>
                <Input id="leadEmail" type="email" placeholder="student@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadPhone">Phone Number</Label>
                <Input id="leadPhone" type="tel" placeholder="+00 00000 00000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadCountry">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="Nepal">Nepal</SelectItem>
                    <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadNotes">Notes</Label>
                <Textarea id="leadNotes" placeholder="Add any initial notes..." />
              </div>
              <Button className="w-full">Add Lead</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-blue-600" />
              <p className="text-2xl">{leads.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Files Opened</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-green-600" />
              <p className="text-2xl">{leads.filter((l) => l.status === 'file-opened').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Contact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ClipboardList className="size-5 text-orange-600" />
              <p className="text-2xl">{leads.filter((l) => l.status === 'new').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>This Month Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="size-5 text-green-600" />
              <p className="text-2xl">$12,400</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2" onClick={() => setChecklistOpen(true)}>
              <FileText className="size-5 text-blue-600" />
              <div className="text-left">
                <p>Send Offer Letter Checklist</p>
                <p className="text-xs text-gray-600">Required documents for offer letter</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <ClipboardList className="size-5 text-purple-600" />
              <div className="text-left">
                <p>Send Visa Checklist</p>
                <p className="text-xs text-gray-600">Final visa submission documents</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <Send className="size-5 text-green-600" />
              <div className="text-left">
                <p>Transfer to Application</p>
                <p className="text-xs text-gray-600">Ready for university application</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <Card>
        <CardHeader>
          <CardTitle>My Leads</CardTitle>
          <CardDescription>All students you're managing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p>{lead.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>{lead.email}</span>
                    <span>•</span>
                    <span>{lead.phone}</span>
                    <span>•</span>
                    <span>{lead.country}</span>
                  </div>
                  {lead.notes && <p className="text-sm text-gray-600 mt-1">{lead.notes}</p>}
                </div>
                <Badge
                  variant={
                    lead.status === 'file-opened'
                      ? 'default'
                      : lead.status === 'contacted'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {lead.status.replace('-', ' ')}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Checklist Dialog */}
      <Dialog open={checklistOpen} onOpenChange={setChecklistOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Offer Letter Document Checklist</DialogTitle>
            <DialogDescription>Required documents for university offer letter</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <ChecklistItem title="Passport Copy" description="Valid for at least 6 months" />
              <ChecklistItem title="Academic Transcripts" description="All previous education records" />
              <ChecklistItem title="Degree Certificates" description="Completed degree certificates" />
              <ChecklistItem title="English Language Test" description="IELTS/TOEFL/PTE results" />
              <ChecklistItem title="Personal Statement" description="Statement of purpose" />
              <ChecklistItem title="Letters of Recommendation" description="At least 2 academic references" />
              <ChecklistItem title="CV/Resume" description="Updated curriculum vitae" />
              <ChecklistItem title="Passport-size Photos" description="Recent photographs" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Send to Student</Button>
              <Button variant="outline" onClick={() => setChecklistOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChecklistItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <div className="size-5 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0" />
      <div className="flex-1">
        <p>{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
