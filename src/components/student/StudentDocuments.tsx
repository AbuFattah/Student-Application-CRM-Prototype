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
import {
  FileText,
  Upload,
  Eye,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  History,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  status: "pending" | "verified" | "rejected";
  uploadedDate: string;
  version: number;
  size: string;
}

const DOCUMENT_TYPES = [
  "Passport",
  "Academic Transcripts",
  "Degree Certificate",
  "Bank Statement",
  "English Language Test",
  "Personal Statement",
  "Recommendation Letter",
  "CV/Resume",
  "Photos",
  "Medical Certificate",
  "Police Clearance",
  "Other",
];

export default function StudentDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Passport_RahimStudent.pdf",
      type: "Passport",
      status: "verified",
      uploadedDate: "2025-11-10",
      version: 1,
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Transcripts_2024.pdf",
      type: "Academic Transcripts",
      status: "verified",
      uploadedDate: "2025-11-12",
      version: 2,
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "BankStatement_Nov2025.pdf",
      type: "Bank Statement",
      status: "pending",
      uploadedDate: "2025-11-15",
      version: 1,
      size: "890 KB",
    },
  ]);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    type: "",
    file: null as File | null,
  });

  const handleFileUpload = () => {
    if (!uploadForm.type || !uploadForm.file) return;

    const newDoc: Document = {
      id: Date.now().toString(),
      name: uploadForm.file.name,
      type: uploadForm.type,
      status: "pending",
      uploadedDate: new Date().toISOString().split("T")[0],
      version: 1,
      size: `${(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB`,
    };

    setDocuments([...documents, newDoc]);
    setUploadOpen(false);
    setUploadForm({ type: "", file: null });
  };

  const requiredDocs = DOCUMENT_TYPES.slice(0, 8);
  const uploadedTypes = documents.map((d) => d.type);
  const missingDocs = requiredDocs.filter(
    (type) => !uploadedTypes.includes(type)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Documents</h2>
          <p className="text-gray-600">
            Upload and manage your application documents
          </p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="size-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Select document type and upload the file
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="docType">Document Type</Label>
                <Select
                  value={uploadForm.type}
                  onValueChange={(v: any) =>
                    setUploadForm({ ...uploadForm, type: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCUMENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      file: e.target.files?.[0] || null,
                    })
                  }
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-gray-600">
                  Accepted formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>
              <Button
                onClick={handleFileUpload}
                className="w-full"
                disabled={!uploadForm.type || !uploadForm.file}
              >
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{documents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Verified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <p className="text-2xl">
                {documents.filter((d) => d.status === "verified").length}
              </p>
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
              <p className="text-2xl">
                {documents.filter((d) => d.status === "pending").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Missing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="size-5 text-red-600" />
              <p className="text-2xl">{missingDocs.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Missing Documents Alert */}
      {missingDocs.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900">
              Required Documents Missing
            </CardTitle>
            <CardDescription className="text-orange-700">
              Please upload the following documents to proceed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {missingDocs.map((doc) => (
                <Badge
                  key={doc}
                  variant="outline"
                  className="border-orange-300 text-orange-900"
                >
                  {doc}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>View and manage your uploaded files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <DocumentRow key={doc.id} document={doc} />
            ))}
            {documents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="size-12 mx-auto mb-4 text-gray-400" />
                <p>No documents uploaded yet</p>
                <p className="text-sm">
                  Click "Upload Document" to get started
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentRow({ document }: { document: Document }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <FileText className="size-10 text-blue-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="truncate">{document.name}</p>
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
          <span>{document.type}</span>
          <span>•</span>
          <span>{document.size}</span>
          <span>•</span>
          <span>v{document.version}</span>
          <span>•</span>
          <span>{document.uploadedDate}</span>
        </div>
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
        {document.status === "rejected" && <XCircle className="size-3 mr-1" />}
        {document.status}
      </Badge>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Eye className="size-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Download className="size-4" />
        </Button>
        <Button variant="outline" size="sm">
          <History className="size-4" />
        </Button>
      </div>
    </div>
  );
}
