import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  University,
  Send,
} from "lucide-react";
import type { User } from "../../App";

interface Application {
  id: string;
  studentName: string;
  university: string;
  program: string;
  status: "ready" | "submitted" | "offer-received" | "rejected";
  submittedDate?: string;
  offerDate?: string;
}

interface ApplicationOfficerDashboardProps {
  user: User;
}

export default function ApplicationOfficerDashboard({
  user,
}: ApplicationOfficerDashboardProps) {
  const [applications] = useState<Application[]>([
    {
      id: "1",
      studentName: "Rahim Uddin",
      university: "University of Toronto",
      program: "Computer Science - Masters",
      status: "ready",
    },
    {
      id: "2",
      studentName: "Mitu Akter",
      university: "University of British Columbia",
      program: "Business Administration - MBA",
      status: "submitted",
      submittedDate: "2025-11-12",
    },
    {
      id: "3",
      studentName: "Abdullah Al Mamun",
      university: "McGill University",
      program: "Engineering - Masters",
      status: "offer-received",
      submittedDate: "2025-11-05",
      offerDate: "2025-11-15",
    },
    {
      id: "4",
      studentName: "Fatima Khatun",
      university: "University of Alberta",
      program: "Data Science - Masters",
      status: "submitted",
      submittedDate: "2025-11-14",
    },
  ]);

  const [submitAppOpen, setSubmitAppOpen] = useState(false);

  const readyApps = applications.filter((a) => a.status === "ready");
  const submittedApps = applications.filter((a) => a.status === "submitted");
  const offersReceived = applications.filter(
    (a) => a.status === "offer-received"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Application Management</h2>
          <p className="text-gray-600">
            Manage university applications and offers
          </p>
        </div>
        <Dialog open={submitAppOpen} onOpenChange={setSubmitAppOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="size-4 mr-2" />
              Submit Application
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit University Application</DialogTitle>
              <DialogDescription>
                Submit application for a student
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Rahim Uddin</SelectItem>
                    <SelectItem value="2">Mitu Akter</SelectItem>
                    <SelectItem value="3">Abdullah Al Mamun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uoft">University of Toronto</SelectItem>
                    <SelectItem value="ubc">
                      University of British Columbia
                    </SelectItem>
                    <SelectItem value="mcgill">McGill University</SelectItem>
                    <SelectItem value="ualberta">
                      University of Alberta
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  placeholder="e.g., Computer Science - Masters"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intake">Intake</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intake" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall2026">Fall 2026</SelectItem>
                    <SelectItem value="winter2026">Winter 2026</SelectItem>
                    <SelectItem value="summer2026">Summer 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Submit Application</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-blue-600" />
              <p className="text-2xl">{applications.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Ready to Submit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-orange-600" />
              <p className="text-2xl">{readyApps.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Upload className="size-5 text-blue-600" />
              <p className="text-2xl">{submittedApps.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Offers Received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <p className="text-2xl">{offersReceived.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>University Applications</CardTitle>
          <CardDescription>
            Track all university applications by status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
              <TabsTrigger value="ready">
                Ready ({readyApps.length})
              </TabsTrigger>
              <TabsTrigger value="submitted">
                Submitted ({submittedApps.length})
              </TabsTrigger>
              <TabsTrigger value="offers">
                Offers ({offersReceived.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">Rejected (0)</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {applications.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </TabsContent>

            <TabsContent value="ready" className="space-y-3 mt-4">
              {readyApps.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
              {readyApps.length === 0 && (
                <EmptyState message="No applications ready to submit" />
              )}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-3 mt-4">
              {submittedApps.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
              {submittedApps.length === 0 && (
                <EmptyState message="No submitted applications" />
              )}
            </TabsContent>

            <TabsContent value="offers" className="space-y-3 mt-4">
              {offersReceived.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
              {offersReceived.length === 0 && (
                <EmptyState message="No offers received yet" />
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-3 mt-4">
              <EmptyState message="No rejected applications" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Top Universities */}
      <Card>
        <CardHeader>
          <CardTitle>Top Universities</CardTitle>
          <CardDescription>
            Most applications sent to these institutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <UniversityRow
              name="University of Toronto"
              count={12}
              offers={10}
            />
            <UniversityRow
              name="University of British Columbia"
              count={10}
              offers={8}
            />
            <UniversityRow name="McGill University" count={8} offers={7} />
            <UniversityRow name="University of Alberta" count={7} offers={6} />
            <UniversityRow name="McMaster University" count={6} offers={5} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ApplicationCard({ application }: { application: Application }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <University className="size-10 text-blue-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p>{application.studentName}</p>
        <p className="text-sm text-gray-600">{application.university}</p>
        <p className="text-sm text-gray-600">{application.program}</p>
        {application.submittedDate && (
          <p className="text-xs text-gray-500 mt-1">
            Submitted: {application.submittedDate}
          </p>
        )}
        {application.offerDate && (
          <p className="text-xs text-green-600 mt-1">
            Offer received: {application.offerDate}
          </p>
        )}
      </div>
      <Badge
        variant={
          application.status === "offer-received"
            ? "default"
            : application.status === "submitted"
            ? "secondary"
            : "outline"
        }
      >
        {application.status === "ready" && <Clock className="size-3 mr-1" />}
        {application.status === "submitted" && (
          <Upload className="size-3 mr-1" />
        )}
        {application.status === "offer-received" && (
          <CheckCircle2 className="size-3 mr-1" />
        )}
        {application.status.replace("-", " ")}
      </Badge>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          View
        </Button>
        {application.status === "ready" && <Button size="sm">Submit</Button>}
        {application.status === "offer-received" && (
          <Button size="sm">Upload Offer</Button>
        )}
        {application.status === "submitted" && (
          <Button size="sm" variant="outline">
            Update
          </Button>
        )}
      </div>
    </div>
  );
}

function UniversityRow({
  name,
  count,
  offers,
}: {
  name: string;
  count: number;
  offers: number;
}) {
  const rate = Math.round((offers / count) * 100);
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg">
      <University className="size-8 text-blue-600 flex-shrink-0" />
      <div className="flex-1">
        <p>{name}</p>
        <p className="text-sm text-gray-600">{count} applications sent</p>
      </div>
      <div className="text-right">
        <p>{offers} offers</p>
        <p className="text-sm text-green-600">{rate}% success rate</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-gray-500">
      <FileText className="size-12 mx-auto mb-4 text-gray-400" />
      <p>{message}</p>
    </div>
  );
}
