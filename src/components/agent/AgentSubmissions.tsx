import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FileText, Upload, CheckCircle2, Clock, AlertCircle, Eye } from 'lucide-react';

interface Submission {
  id: string;
  studentName: string;
  type: 'application' | 'visa' | 'documents';
  university?: string;
  submittedDate: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  officer: string;
}

const SUBMISSIONS: Submission[] = [
{
  id: '1',
  studentName: 'Rahim Uddin',
  type: 'documents',
  submittedDate: '2025-11-15',
  status: 'pending',
  officer: 'Chris Compliance',
},
{
  id: '2',
  studentName: 'Mitu Akter',
  type: 'application',
  university: 'University of Toronto',
  submittedDate: '2025-11-14',
  status: 'submitted',
  officer: 'Anna Application',
},
{
  id: '3',
  studentName: 'Abdullah Al Mamun',
  type: 'visa',
  submittedDate: '2025-11-12',
  status: 'submitted',
  officer: 'Casey Officer',
},
{
  id: '4',
  studentName: 'Fatima Khatun',
  type: 'documents',
  submittedDate: '2025-11-10',
  status: 'approved',
  officer: 'Chris Compliance',
},
{
  id: '5',
  studentName: 'Sohan Rahman',
  type: 'application',
  university: 'University of British Columbia',
  submittedDate: '2025-11-08',
  status: 'approved',
  officer: 'Anna Application',
},

];

export default function AgentSubmissions() {
  const pendingSubmissions = SUBMISSIONS.filter((s) => s.status === 'pending');
  const submittedSubmissions = SUBMISSIONS.filter((s) => s.status === 'submitted');
  const completedSubmissions = SUBMISSIONS.filter((s) => s.status === 'approved' || s.status === 'rejected');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Submissions</h2>
        <p className="text-gray-600">Track all document and application submissions</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-blue-600" />
              <p className="text-2xl">{SUBMISSIONS.length}</p>
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
              <p className="text-2xl">{pendingSubmissions.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>In Process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Upload className="size-5 text-blue-600" />
              <p className="text-2xl">{submittedSubmissions.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <p className="text-2xl">{completedSubmissions.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription>View and track your submissions by status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All ({SUBMISSIONS.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="submitted">
                Submitted ({submittedSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedSubmissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {SUBMISSIONS.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-3 mt-4">
              {pendingSubmissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
              {pendingSubmissions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No pending submissions</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-3 mt-4">
              {submittedSubmissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
              {submittedSubmissions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No submitted applications</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3 mt-4">
              {completedSubmissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
              {completedSubmissions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No completed submissions</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function SubmissionCard({ submission }: { submission: Submission }) {
  const getTypeLabel = () => {
    switch (submission.type) {
      case 'application':
        return 'University Application';
      case 'visa':
        return 'Visa Application';
      case 'documents':
        return 'Document Submission';
    }
  };

  const getStatusIcon = () => {
    switch (submission.status) {
      case 'approved':
        return <CheckCircle2 className="size-4 text-green-600" />;
      case 'submitted':
        return <Upload className="size-4 text-blue-600" />;
      case 'pending':
        return <Clock className="size-4 text-orange-600" />;
      case 'rejected':
        return <AlertCircle className="size-4 text-red-600" />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex-shrink-0">
        {submission.type === 'application' && <FileText className="size-10 text-blue-600" />}
        {submission.type === 'visa' && <FileText className="size-10 text-purple-600" />}
        {submission.type === 'documents' && <FileText className="size-10 text-green-600" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span>{submission.studentName}</span>
          <Badge variant="outline">{getTypeLabel()}</Badge>
          {submission.university && <span className="text-sm text-gray-600">• {submission.university}</span>}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Submitted: {submission.submittedDate}</span>
          <span>•</span>
          <span>Officer: {submission.officer}</span>
        </div>
      </div>
      <Badge
        variant={
          submission.status === 'approved'
            ? 'default'
            : submission.status === 'submitted'
            ? 'secondary'
            : submission.status === 'pending'
            ? 'outline'
            : 'destructive'
        }
      >
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          {submission.status}
        </div>
      </Badge>
      <Button variant="outline" size="sm">
        <Eye className="size-4 mr-2" />
        View
      </Button>
    </div>
  );
}
