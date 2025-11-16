import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { FileText, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import type { User } from '../../App';

interface StudentOverviewProps {
  user: User;
}

export default function StudentOverview({ user }: StudentOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Welcome back, {user.name}!</h2>
        <p className="text-gray-600">Track your application progress and manage documents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Application Status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-blue-600" />
              <span>In Progress</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Documents Uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-green-600" />
              <span>8 / 12</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-orange-600" />
              <span>3 Items</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Overall Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <span>45%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Application Progress</CardTitle>
          <CardDescription>Your journey from application to visa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span>Overall Completion</span>
              <span>45%</span>
            </div>
            <Progress value={45} />
          </div>

          <div className="space-y-4">
            <ProgressStep
              title="Initial Consultation"
              status="completed"
              description="Marketing officer contacted"
            />
            <ProgressStep
              title="File Opening"
              status="completed"
              description="Payment confirmed"
            />
            <ProgressStep
              title="Document Collection"
              status="in-progress"
              description="8 out of 12 documents uploaded"
            />
            <ProgressStep
              title="University Application"
              status="pending"
              description="Waiting for document verification"
            />
            <ProgressStep
              title="Compliance Check"
              status="pending"
              description="Not started"
            />
            <ProgressStep
              title="Visa Processing"
              status="pending"
              description="Not started"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Actions</CardTitle>
          <CardDescription>Items that require your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ActionItem
              title="Upload Bank Statement"
              description="Required for visa processing"
              priority="high"
            />
            <ActionItem
              title="Complete Personal Information Form"
              description="Form sent by compliance team"
              priority="high"
            />
            <ActionItem
              title="Upload English Language Test Results"
              description="IELTS or equivalent"
              priority="medium"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem
              title="Document Verified"
              description="Your passport copy has been verified by compliance team"
              time="2 hours ago"
              type="success"
            />
            <ActivityItem
              title="Message from Marketing Officer"
              description="Please check the checklist for visa submission"
              time="1 day ago"
              type="info"
            />
            <ActivityItem
              title="Document Uploaded"
              description="Academic transcripts successfully uploaded"
              time="2 days ago"
              type="success"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProgressStep({
  title,
  status,
  description,
}: {
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`size-8 rounded-full flex items-center justify-center ${
            status === 'completed'
              ? 'bg-green-100 text-green-600'
              : status === 'in-progress'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {status === 'completed' ? (
            <CheckCircle2 className="size-5" />
          ) : status === 'in-progress' ? (
            <Clock className="size-5" />
          ) : (
            <div className="size-3 rounded-full bg-gray-400" />
          )}
        </div>
        <div className="w-0.5 h-12 bg-gray-200 mt-2" />
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span>{title}</span>
          <Badge
            variant={
              status === 'completed' ? 'default' : status === 'in-progress' ? 'secondary' : 'outline'
            }
          >
            {status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ActionItem({
  title,
  description,
  priority,
}: {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
      <AlertCircle className={`size-5 mt-0.5 ${priority === 'high' ? 'text-red-600' : 'text-orange-600'}`} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span>{title}</span>
          <Badge variant={priority === 'high' ? 'destructive' : 'secondary'}>{priority}</Badge>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  time,
  type,
}: {
  title: string;
  description: string;
  time: string;
  type: 'success' | 'info';
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`size-2 mt-2 rounded-full ${type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}
      />
      <div className="flex-1">
        <p>{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
