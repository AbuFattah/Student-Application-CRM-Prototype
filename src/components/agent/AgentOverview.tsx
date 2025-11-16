import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Users,
  FileCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import type { User } from "../../App";
import { Link } from "react-router-dom";

interface AgentOverviewProps {
  user: User;
}

export default function AgentOverview({ user }: AgentOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">
            Manage your students and track their applications
          </p>
        </div>
        <Link to="/agent/students">
          <Button>
            <UserPlus className="size-4 mr-2" />
            Add New Student
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-blue-600" />
              <p className="text-2xl">24</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-orange-600" />
              <p className="text-2xl">18</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <p className="text-2xl">6</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Success Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-600" />
              <p className="text-2xl">92%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Students</CardTitle>
          <CardDescription>
            Latest student applications you're managing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <StudentRow
              name="Rahim Uddin"
              email="rahim.u@email.com"
              country="Bangladesh"
              status="Document Collection"
              progress={45}
              lastUpdate="2 hours ago"
            />
            <StudentRow
              name="Mitu Akter"
              email="mitu.a@email.com"
              country="Bangladesh"
              status="University Application"
              progress={65}
              lastUpdate="5 hours ago"
            />
            <StudentRow
              name="Abdullah Al Mamun"
              email="abdullah.m@email.com"
              country="Bangladesh"
              status="Visa Processing"
              progress={85}
              lastUpdate="1 day ago"
            />
            <StudentRow
              name="Fatima Khatun"
              email="fatima.k@email.com"
              country="Bangladesh"
              status="Initial Consultation"
              progress={15}
              lastUpdate="1 day ago"
            />
            <StudentRow
              name="Sohan Rahman"
              email="sohan.r@email.com"
              country="Bangladesh"
              status="Compliance Review"
              progress={72}
              lastUpdate="2 days ago"
            />
          </div>
        </CardContent>
      </Card>

      {/* Application Status Distribution */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Applications by Stage</CardTitle>
            <CardDescription>
              Current distribution of student applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <StageBar
                label="Initial Consultation"
                count={3}
                total={24}
                color="bg-blue-600"
              />
              <StageBar
                label="Document Collection"
                count={5}
                total={24}
                color="bg-purple-600"
              />
              <StageBar
                label="University Application"
                count={6}
                total={24}
                color="bg-orange-600"
              />
              <StageBar
                label="Compliance Review"
                count={4}
                total={24}
                color="bg-yellow-600"
              />
              <StageBar
                label="Visa Processing"
                count={4}
                total={24}
                color="bg-green-600"
              />
              <StageBar
                label="Completed"
                count={2}
                total={24}
                color="bg-gray-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ActionItem
                title="Review Documents"
                description="3 students have uploaded new documents"
                count={3}
                priority="high"
              />
              <ActionItem
                title="Submit Applications"
                description="2 applications ready for submission"
                count={2}
                priority="high"
              />
              <ActionItem
                title="Follow-up Required"
                description="5 students haven't responded in 3+ days"
                count={5}
                priority="medium"
              />
              <ActionItem
                title="Document Requests"
                description="4 students need to upload additional documents"
                count={4}
                priority="medium"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance This Month</CardTitle>
          <CardDescription>Your agent performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">New Students</p>
              <p className="text-2xl">8</p>
              <p className="text-xs text-green-600 mt-1">
                +20% from last month
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Applications Submitted
              </p>
              <p className="text-2xl">15</p>
              <p className="text-xs text-green-600 mt-1">
                +12% from last month
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Visas Approved</p>
              <p className="text-2xl">12</p>
              <p className="text-xs text-green-600 mt-1">+8% from last month</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Processing Time</p>
              <p className="text-2xl">42 days</p>
              <p className="text-xs text-red-600 mt-1">
                +3 days from last month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentRow({
  name,
  email,
  country,
  status,
  progress,
  lastUpdate,
}: {
  name: string;
  email: string;
  country: string;
  status: string;
  progress: number;
  lastUpdate: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate">{name}</p>
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
          <span>{email}</span>
          <span>•</span>
          <span>{country}</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Badge variant="secondary">{status}</Badge>
        <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
      </div>
      <p className="text-sm text-gray-500 flex-shrink-0 w-24 text-right">
        {lastUpdate}
      </p>
    </div>
  );
}

function StageBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = Math.round((count / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <span>{label}</span>
        <span className="text-gray-600">
          {count} ({percentage}%)
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ActionItem({
  title,
  description,
  count,
  priority,
}: {
  title: string;
  description: string;
  count: number;
  priority: "high" | "medium";
}) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
      <div
        className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          priority === "high"
            ? "bg-red-100 text-red-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {count}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span>{title}</span>
          <Badge variant={priority === "high" ? "destructive" : "secondary"}>
            {priority}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <Button variant="outline" size="sm">
        View
      </Button>
    </div>
  );
}
