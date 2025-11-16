import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

interface Stage {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  officer: string;
  startDate?: string;
  completedDate?: string;
  notes?: string;
}

const STAGES: Stage[] = [
  {
    id: '1',
    title: 'Initial Consultation',
    description: 'Marketing officer initial contact and requirement gathering',
    status: 'completed',
    officer: 'Mike Marketing',
    startDate: '2025-11-01',
    completedDate: '2025-11-02',
    notes: 'Initial consultation completed. Student profile created.',
  },
  {
    id: '2',
    title: 'File Opening & Payment',
    description: 'File opening charge payment and document checklist provided',
    status: 'completed',
    officer: 'Mike Marketing',
    startDate: '2025-11-02',
    completedDate: '2025-11-03',
    notes: 'Payment confirmed. File opened successfully.',
  },
  {
    id: '3',
    title: 'Document Collection',
    description: 'Student uploads required documents for verification',
    status: 'in-progress',
    officer: 'Chris Compliance',
    startDate: '2025-11-03',
    notes: '8 out of 12 documents received. Awaiting bank statement, English test results, and medical certificate.',
  },
  {
    id: '4',
    title: 'Document Verification',
    description: 'Compliance team verifies all submitted documents',
    status: 'pending',
    officer: 'Chris Compliance',
    notes: 'Waiting for all documents to be uploaded.',
  },
  {
    id: '5',
    title: 'University Application',
    description: 'Application officer submits applications to universities',
    status: 'pending',
    officer: 'Anna Application',
    notes: 'Pending document verification completion.',
  },
  {
    id: '6',
    title: 'Offer Letter Receipt',
    description: 'Receive and process university offer letters',
    status: 'pending',
    officer: 'Anna Application',
  },
  {
    id: '7',
    title: 'Final Compliance Check',
    description: 'Final verification before visa submission',
    status: 'pending',
    officer: 'Chris Compliance',
  },
  {
    id: '8',
    title: 'Visa Application',
    description: 'Case officer submits visa application',
    status: 'pending',
    officer: 'Casey Officer',
  },
  {
    id: '9',
    title: 'Visa Decision',
    description: 'Awaiting visa decision and processing outcome',
    status: 'pending',
    officer: 'Casey Officer',
  },
  {
    id: '10',
    title: 'Final Documents & Departure',
    description: 'Receive visa and prepare for departure',
    status: 'pending',
    officer: 'Casey Officer',
  },
];

export default function StudentProgress() {
  const completedStages = STAGES.filter((s) => s.status === 'completed').length;
  const totalStages = STAGES.length;
  const progressPercentage = Math.round((completedStages / totalStages) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Application Progress</h2>
        <p className="text-gray-600">Track your application through each stage</p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            {completedStages} of {totalStages} stages completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Completion</span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <div className="grid grid-cols-4 gap-4 pt-4">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl">{STAGES.filter((s) => s.status === 'completed').length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl">{STAGES.filter((s) => s.status === 'in-progress').length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl">{STAGES.filter((s) => s.status === 'pending').length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Est. Time Left</p>
                <p className="text-2xl">8-12 weeks</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Stage Highlight */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-blue-600" />
            <CardTitle className="text-blue-900">Current Stage</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {STAGES.filter((s) => s.status === 'in-progress').map((stage) => (
            <div key={stage.id}>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg text-blue-900">{stage.title}</h3>
                <Badge className="bg-blue-600">In Progress</Badge>
              </div>
              <p className="text-blue-800 mb-2">{stage.description}</p>
              <p className="text-sm text-blue-700">
                <span>Handled by: {stage.officer}</span>
              </p>
              {stage.notes && (
                <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                  <p className="text-sm text-blue-900">{stage.notes}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Application Timeline</CardTitle>
          <CardDescription>Detailed view of all stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {STAGES.map((stage, index) => (
              <StageItem key={stage.id} stage={stage} isLast={index === STAGES.length - 1} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StageItem({ stage, isLast }: { stage: Stage; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`size-10 rounded-full flex items-center justify-center border-2 ${
            stage.status === 'completed'
              ? 'bg-green-100 border-green-600 text-green-600'
              : stage.status === 'in-progress'
              ? 'bg-blue-100 border-blue-600 text-blue-600'
              : stage.status === 'blocked'
              ? 'bg-red-100 border-red-600 text-red-600'
              : 'bg-gray-100 border-gray-300 text-gray-400'
          }`}
        >
          {stage.status === 'completed' ? (
            <CheckCircle2 className="size-5" />
          ) : stage.status === 'in-progress' ? (
            <Clock className="size-5" />
          ) : stage.status === 'blocked' ? (
            <AlertCircle className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 h-20 ${
              stage.status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
            }`}
          />
        )}
      </div>
      <div className={`flex-1 ${!isLast ? 'pb-6' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <h4>{stage.title}</h4>
          <Badge
            variant={
              stage.status === 'completed'
                ? 'default'
                : stage.status === 'in-progress'
                ? 'secondary'
                : stage.status === 'blocked'
                ? 'destructive'
                : 'outline'
            }
          >
            {stage.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Officer: {stage.officer}</span>
          {stage.startDate && <span>Started: {stage.startDate}</span>}
          {stage.completedDate && <span>Completed: {stage.completedDate}</span>}
        </div>
        {stage.notes && (
          <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
            {stage.notes}
          </div>
        )}
      </div>
    </div>
  );
}
