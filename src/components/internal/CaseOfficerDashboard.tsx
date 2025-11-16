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
import { Textarea } from "../ui/textarea";
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  FileText,
  Send,
} from "lucide-react";
import type { User } from "../../App";

interface VisaCase {
  id: string;
  studentName: string;
  country: string;
  visaType: string;
  status: "ready" | "submitted" | "approved" | "rejected" | "additional-info";
  submittedDate?: string;
  decisionDate?: string;
  notes?: string;
}

interface CaseOfficerDashboardProps {
  user: User;
}

export default function CaseOfficerDashboard({
  user,
}: CaseOfficerDashboardProps) {
  const [cases] = useState<VisaCase[]>([
    {
      id: "1",
      studentName: "Rahim Uddin",
      country: "Canada",
      visaType: "Study Permit",
      status: "ready",
      notes: "All documents verified and ready for submission",
    },
    {
      id: "2",
      studentName: "Mitu Akter",
      country: "Canada",
      visaType: "Study Permit",
      status: "submitted",
      submittedDate: "2025-11-10",
      notes: "Awaiting decision from immigration",
    },
    {
      id: "3",
      studentName: "Abdullah Al Mamun",
      country: "Canada",
      visaType: "Study Permit",
      status: "approved",
      submittedDate: "2025-10-28",
      decisionDate: "2025-11-15",
      notes: "Visa approved. Documents sent to student",
    },
    {
      id: "4",
      studentName: "Fatima Khatun",
      country: "UK",
      visaType: "Student Visa",
      status: "additional-info",
      submittedDate: "2025-11-05",
      notes: "Immigration requested additional financial documents",
    },
  ]);

  const [submitVisaOpen, setSubmitVisaOpen] = useState(false);
  const [updateCaseOpen, setUpdateCaseOpen] = useState(false);

  const readyCases = cases.filter((c) => c.status === "ready");
  const submittedCases = cases.filter(
    (c) => c.status === "submitted" || c.status === "additional-info"
  );
  const approvedCases = cases.filter((c) => c.status === "approved");
  const rejectedCases = cases.filter((c) => c.status === "rejected");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Case Management</h2>
          <p className="text-gray-600">
            Manage visa applications and track decisions
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={submitVisaOpen} onOpenChange={setSubmitVisaOpen}>
            <DialogTrigger asChild>
              <Button>
                <Send className="size-4 mr-2" />
                Submit Visa Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Visa Application</DialogTitle>
                <DialogDescription>
                  Submit student visa application to immigration
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
                  <Label htmlFor="visaCountry">Destination Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visaType">Visa Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study-permit">Study Permit</SelectItem>
                      <SelectItem value="student-visa">Student Visa</SelectItem>
                      <SelectItem value="student-visa-tier4">
                        Student Visa (Tier 4)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationNumber">Application Number</Label>
                  <Input
                    id="applicationNumber"
                    placeholder="Enter application reference number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submissionNotes">Notes</Label>
                  <Textarea
                    id="submissionNotes"
                    placeholder="Add any notes about the submission..."
                  />
                </div>
                <Button className="w-full">Submit Application</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={updateCaseOpen} onOpenChange={setUpdateCaseOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="size-4 mr-2" />
                Update Case Status
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Case Status</DialogTitle>
                <DialogDescription>
                  Update visa application status and decision
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="caseStudent">Student</Label>
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
                  <Label htmlFor="caseStatus">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="additional-info">
                        Additional Information Required
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decisionDate">Decision Date</Label>
                  <Input id="decisionDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caseNotes">Notes</Label>
                  <Textarea
                    id="caseNotes"
                    placeholder="Add notes about the decision..."
                  />
                </div>
                <Button className="w-full">Update Status</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Briefcase className="size-5 text-blue-600" />
              <p className="text-2xl">{cases.length}</p>
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
              <p className="text-2xl">{readyCases.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Under Review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-blue-600" />
              <p className="text-2xl">{submittedCases.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Approved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <p className="text-2xl">{approvedCases.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Rejected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="size-5 text-red-600" />
              <p className="text-2xl">{rejectedCases.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Approval Rate</CardTitle>
            <CardDescription>Visa approval success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">92%</p>
            <p className="text-sm text-green-600 mt-2">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Processing Time</CardTitle>
            <CardDescription>Average time to decision</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">18 days</p>
            <p className="text-sm text-green-600 mt-2">
              -3 days from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cases This Month</CardTitle>
            <CardDescription>New visa applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">24</p>
            <p className="text-sm text-green-600 mt-2">+8 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Visa Cases</CardTitle>
          <CardDescription>
            Track all visa applications by status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ready">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="ready">
                Ready ({readyCases.length})
              </TabsTrigger>
              <TabsTrigger value="submitted">
                Submitted ({submittedCases.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({approvedCases.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedCases.length})
              </TabsTrigger>
              <TabsTrigger value="all">All ({cases.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="ready" className="space-y-3 mt-4">
              {readyCases.map((visaCase) => (
                <CaseCard key={visaCase.id} visaCase={visaCase} />
              ))}
              {readyCases.length === 0 && (
                <EmptyState message="No cases ready for submission" />
              )}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-3 mt-4">
              {submittedCases.map((visaCase) => (
                <CaseCard key={visaCase.id} visaCase={visaCase} />
              ))}
              {submittedCases.length === 0 && (
                <EmptyState message="No submitted cases" />
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-3 mt-4">
              {approvedCases.map((visaCase) => (
                <CaseCard key={visaCase.id} visaCase={visaCase} />
              ))}
              {approvedCases.length === 0 && (
                <EmptyState message="No approved cases" />
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-3 mt-4">
              {rejectedCases.map((visaCase) => (
                <CaseCard key={visaCase.id} visaCase={visaCase} />
              ))}
              {rejectedCases.length === 0 && (
                <EmptyState message="No rejected cases" />
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-3 mt-4">
              {cases.map((visaCase) => (
                <CaseCard key={visaCase.id} visaCase={visaCase} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Destination Countries */}
      <Card>
        <CardHeader>
          <CardTitle>Visa Applications by Country</CardTitle>
          <CardDescription>
            Distribution of applications by destination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <CountryRow
              country="Canada"
              total={45}
              approved={42}
              rejected={2}
              pending={1}
            />
            <CountryRow
              country="United Kingdom"
              total={28}
              approved={24}
              rejected={1}
              pending={3}
            />
            <CountryRow
              country="Australia"
              total={22}
              approved={20}
              rejected={1}
              pending={1}
            />
            <CountryRow
              country="United States"
              total={18}
              approved={16}
              rejected={2}
              pending={0}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CaseCard({ visaCase }: { visaCase: VisaCase }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <Briefcase className="size-10 text-blue-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p>{visaCase.studentName}</p>
        <p className="text-sm text-gray-600">
          {visaCase.country} - {visaCase.visaType}
        </p>
        {visaCase.submittedDate && (
          <p className="text-xs text-gray-500 mt-1">
            Submitted: {visaCase.submittedDate}
          </p>
        )}
        {visaCase.decisionDate && (
          <p className="text-xs text-green-600 mt-1">
            Decision: {visaCase.decisionDate}
          </p>
        )}
        {visaCase.notes && (
          <p className="text-xs text-gray-600 mt-1">{visaCase.notes}</p>
        )}
      </div>
      <Badge
        variant={
          visaCase.status === "approved"
            ? "default"
            : visaCase.status === "rejected"
            ? "destructive"
            : visaCase.status === "submitted"
            ? "secondary"
            : "outline"
        }
      >
        {visaCase.status === "approved" && (
          <CheckCircle2 className="size-3 mr-1" />
        )}
        {visaCase.status === "rejected" && <XCircle className="size-3 mr-1" />}
        {visaCase.status === "submitted" && <Clock className="size-3 mr-1" />}
        {visaCase.status.replace("-", " ")}
      </Badge>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          View
        </Button>
        {visaCase.status === "ready" && <Button size="sm">Submit</Button>}
        {visaCase.status === "approved" && (
          <Button size="sm" variant="outline">
            <Upload className="size-4 mr-2" />
            Upload Visa
          </Button>
        )}
      </div>
    </div>
  );
}

function CountryRow({
  country,
  total,
  approved,
  rejected,
  pending,
}: {
  country: string;
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}) {
  const approvalRate = Math.round((approved / total) * 100);

  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg">
      <div className="flex-1">
        <p>{country}</p>
        <p className="text-sm text-gray-600">{total} total applications</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-600">Approved</p>
          <p className="text-green-600">{approved}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Rejected</p>
          <p className="text-red-600">{rejected}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Pending</p>
          <p className="text-orange-600">{pending}</p>
        </div>
      </div>
      <div className="text-right w-20">
        <p className="text-sm text-green-600">{approvalRate}%</p>
        <p className="text-xs text-gray-500">success</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-gray-500">
      <Briefcase className="size-12 mx-auto mb-4 text-gray-400" />
      <p>{message}</p>
    </div>
  );
}
