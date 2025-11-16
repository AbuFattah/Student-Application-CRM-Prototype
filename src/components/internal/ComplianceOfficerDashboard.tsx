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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  MessageSquare,
} from "lucide-react";
import type { User } from "../../App";

interface DocumentReview {
  id: string;
  studentName: string;
  documentType: string;
  uploadedDate: string;
  status: "pending" | "verified" | "rejected" | "resubmit";
  notes?: string;
}

interface ComplianceOfficerDashboardProps {
  user: User;
}

export default function ComplianceOfficerDashboard({
  user,
}: ComplianceOfficerDashboardProps) {
  const [documents] = useState<DocumentReview[]>([
    {
      id: "1",
      studentName: "Rahim Uddin",
      documentType: "Bank Statement",
      uploadedDate: "2025-11-15",
      status: "pending",
    },
    {
      id: "2",
      studentName: "Mitu Akter",
      documentType: "Passport Copy",
      uploadedDate: "2025-11-15",
      status: "pending",
    },
    {
      id: "3",
      studentName: "Abdullah Al Mamun",
      documentType: "Academic Transcripts",
      uploadedDate: "2025-11-14",
      status: "verified",
      notes: "All documents verified and authentic",
    },
    {
      id: "4",
      studentName: "Fatima Khatun",
      documentType: "English Language Test",
      uploadedDate: "2025-11-13",
      status: "verified",
      notes: "IELTS score verified",
    },
    {
      id: "5",
      studentName: "Sohan Rahman",
      documentType: "Degree Certificate",
      uploadedDate: "2025-11-12",
      status: "resubmit",
      notes: "Document quality is poor. Please upload a clearer scan.",
    },
  ]);

  const [selectedDoc, setSelectedDoc] = useState<DocumentReview | null>(null);
  const [viewDocOpen, setViewDocOpen] = useState(false);

  const pendingDocs = documents.filter((d) => d.status === "pending");
  const verifiedDocs = documents.filter((d) => d.status === "verified");
  const rejectedDocs = documents.filter(
    (d) => d.status === "rejected" || d.status === "resubmit"
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Compliance Dashboard</h2>
        <p className="text-gray-600">Verify documents and ensure compliance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-blue-600" />
              <p className="text-2xl">{documents.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-orange-600" />
              <p className="text-2xl">{pendingDocs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Verified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <p className="text-2xl">{verifiedDocs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Require Action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-red-600" />
              <p className="text-2xl">{rejectedDocs.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common compliance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
            >
              <CheckCircle2 className="size-5 text-green-600" />
              <div className="text-left">
                <p>Bulk Verify</p>
                <p className="text-xs text-gray-600">
                  Verify multiple documents at once
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
            >
              <MessageSquare className="size-5 text-blue-600" />
              <div className="text-left">
                <p>Request Documents</p>
                <p className="text-xs text-gray-600">
                  Ask student for missing files
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
            >
              <FileText className="size-5 text-purple-600" />
              <div className="text-left">
                <p>Generate Report</p>
                <p className="text-xs text-gray-600">
                  Compliance status report
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Document Reviews</CardTitle>
          <CardDescription>Review and verify student documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">
                Pending ({pendingDocs.length})
              </TabsTrigger>
              <TabsTrigger value="all">All ({documents.length})</TabsTrigger>
              <TabsTrigger value="verified">
                Verified ({verifiedDocs.length})
              </TabsTrigger>
              <TabsTrigger value="action">
                Action Required ({rejectedDocs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3 mt-4">
              {pendingDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onView={() => {
                    setSelectedDoc(doc);
                    setViewDocOpen(true);
                  }}
                />
              ))}
              {pendingDocs.length === 0 && (
                <EmptyState message="No pending documents" />
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-3 mt-4">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onView={() => {
                    setSelectedDoc(doc);
                    setViewDocOpen(true);
                  }}
                />
              ))}
            </TabsContent>

            <TabsContent value="verified" className="space-y-3 mt-4">
              {verifiedDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onView={() => {
                    setSelectedDoc(doc);
                    setViewDocOpen(true);
                  }}
                />
              ))}
              {verifiedDocs.length === 0 && (
                <EmptyState message="No verified documents" />
              )}
            </TabsContent>

            <TabsContent value="action" className="space-y-3 mt-4">
              {rejectedDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onView={() => {
                    setSelectedDoc(doc);
                    setViewDocOpen(true);
                  }}
                />
              ))}
              {rejectedDocs.length === 0 && (
                <EmptyState message="No documents requiring action" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Document Types Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Document Types Summary</CardTitle>
          <CardDescription>Overview by document category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <DocumentTypeRow
              type="Passport"
              pending={5}
              verified={42}
              rejected={2}
            />
            <DocumentTypeRow
              type="Academic Transcripts"
              pending={8}
              verified={38}
              rejected={1}
            />
            <DocumentTypeRow
              type="Bank Statements"
              pending={6}
              verified={35}
              rejected={3}
            />
            <DocumentTypeRow
              type="English Language Test"
              pending={4}
              verified={40}
              rejected={0}
            />
            <DocumentTypeRow
              type="Degree Certificates"
              pending={3}
              verified={36}
              rejected={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Document View Dialog */}
      <Dialog open={viewDocOpen} onOpenChange={setViewDocOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Document Review</DialogTitle>
            <DialogDescription>
              {selectedDoc?.studentName} - {selectedDoc?.documentType}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="size-20 text-gray-400" />
              <p className="text-gray-500 ml-4">Document Preview</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Student:</p>
                <p>{selectedDoc?.studentName}</p>
              </div>
              <div>
                <p className="text-gray-600">Document Type:</p>
                <p>{selectedDoc?.documentType}</p>
              </div>
              <div>
                <p className="text-gray-600">Uploaded:</p>
                <p>{selectedDoc?.uploadedDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <Badge
                  variant={
                    selectedDoc?.status === "verified"
                      ? "default"
                      : selectedDoc?.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {selectedDoc?.status}
                </Badge>
              </div>
            </div>
            {selectedDoc?.notes && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm">{selectedDoc.notes}</p>
              </div>
            )}
            {selectedDoc?.status === "pending" && (
              <div className="flex gap-2">
                <Button className="flex-1">
                  <CheckCircle2 className="size-4 mr-2" />
                  Verify Document
                </Button>
                <Button variant="outline" className="flex-1">
                  <XCircle className="size-4 mr-2" />
                  Request Resubmit
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DocumentCard({
  document,
  onView,
}: {
  document: DocumentReview;
  onView: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <FileText className="size-10 text-blue-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p>{document.studentName}</p>
        <p className="text-sm text-gray-600">{document.documentType}</p>
        <p className="text-xs text-gray-500">
          Uploaded: {document.uploadedDate}
        </p>
        {document.notes && (
          <p className="text-xs text-gray-600 mt-1">{document.notes}</p>
        )}
      </div>
      <Badge
        variant={
          document.status === "verified"
            ? "default"
            : document.status === "pending"
            ? "secondary"
            : "destructive"
        }
      >
        {document.status === "verified" && (
          <CheckCircle2 className="size-3 mr-1" />
        )}
        {document.status === "pending" && <Clock className="size-3 mr-1" />}
        {(document.status === "rejected" || document.status === "resubmit") && (
          <XCircle className="size-3 mr-1" />
        )}
        {document.status}
      </Badge>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="size-4 mr-2" />
          Review
        </Button>
        {document.status === "pending" && (
          <>
            <Button size="sm" variant="default">
              <CheckCircle2 className="size-4" />
            </Button>
            <Button size="sm" variant="outline">
              <XCircle className="size-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function DocumentTypeRow({
  type,
  pending,
  verified,
  rejected,
}: {
  type: string;
  pending: number;
  verified: number;
  rejected: number;
}) {
  const total = pending + verified + rejected;
  const verifiedPercentage = Math.round((verified / total) * 100);

  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg">
      <div className="flex-1">
        <p>{type}</p>
        <p className="text-sm text-gray-600">{total} total documents</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-600">Pending</p>
          <p className="text-orange-600">{pending}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Verified</p>
          <p className="text-green-600">{verified}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Rejected</p>
          <p className="text-red-600">{rejected}</p>
        </div>
      </div>
      <div className="text-right w-20">
        <p className="text-sm text-green-600">{verifiedPercentage}%</p>
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
