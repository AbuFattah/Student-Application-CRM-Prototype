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
  Users,
  FileText,
  TrendingUp,
  Clock,
  UserPlus,
  BarChart,
  Award,
  AlertCircle,
} from "lucide-react";
import type { User } from "../../App";

interface SuperAdminDashboardProps {
  user: User;
  section: "overview" | "users" | "reports";
}

export default function SuperAdminDashboard({
  user,
  section,
}: SuperAdminDashboardProps) {
  if (section === "users") {
    return <UserManagement />;
  }

  if (section === "reports") {
    return <ReportsAnalytics />;
  }

  return <Overview />;
}

function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Super Admin Dashboard</h2>
        <p className="text-gray-600">Complete overview of system operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-blue-600" />
              <p className="text-2xl">342</p>
            </div>
            <p className="text-xs text-green-600 mt-2">+12% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-orange-600" />
              <p className="text-2xl">187</p>
            </div>
            <p className="text-xs text-green-600 mt-2">+8% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Success Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-600" />
              <p className="text-2xl">89%</p>
            </div>
            <p className="text-xs text-green-600 mt-2">+3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Processing Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-purple-600" />
              <p className="text-2xl">38 days</p>
            </div>
            <p className="text-xs text-red-600 mt-2">+2 days from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>
            Current workload and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <DepartmentRow
              department="Marketing"
              officer="Mike Marketing"
              active={42}
              completed={28}
              pending={8}
              performance={92}
            />
            <DepartmentRow
              department="Application"
              officer="Anna Application"
              active={56}
              completed={34}
              pending={12}
              performance={88}
            />
            <DepartmentRow
              department="Compliance"
              officer="Chris Compliance"
              active={38}
              completed={42}
              pending={15}
              performance={95}
            />
            <DepartmentRow
              department="Case Management"
              officer="Casey Officer"
              active={31}
              completed={26}
              pending={6}
              performance={90}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ActivityItem
                title="New Student Added"
                description="Marketing: Added student Rahim Uddin"
                time="15 minutes ago"
                type="info"
              />
              <ActivityItem
                title="Application Submitted"
                description="Application: University of Toronto submission"
                time="1 hour ago"
                type="success"
              />
              <ActivityItem
                title="Document Verified"
                description="Compliance: 5 documents verified"
                time="2 hours ago"
                type="success"
              />
              <ActivityItem
                title="Visa Approved"
                description="Case: Visa approved for Maria Garcia"
                time="3 hours ago"
                type="success"
              />
              <ActivityItem
                title="Pending Action"
                description="Compliance: 3 documents pending review"
                time="5 hours ago"
                type="warning"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>
              Important notifications requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AlertItem
                title="High Workload"
                description="Application department has 12 pending tasks"
                priority="high"
              />
              <AlertItem
                title="Document Expiring"
                description="8 passports expiring within 6 months"
                priority="medium"
              />
              <AlertItem
                title="Delayed Applications"
                description="5 applications exceeding standard processing time"
                priority="medium"
              />
              <AlertItem
                title="System Update"
                description="Database backup completed successfully"
                priority="low"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserManagement() {
  const [users] = useState([
    {
      id: "1",
      name: "Rakib Marketing",
      email: "rakib@StudentApplicationCRM.com",
      role: "marketing",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Mitu Application",
      email: "mitu@StudentApplicationCRM.com",
      role: "application",
      status: "active",
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      name: "Hasan Compliance",
      email: "hasan@StudentApplicationCRM.com",
      role: "compliance",
      status: "active",
      lastActive: "30 minutes ago",
    },
    {
      id: "4",
      name: "Sohan Officer",
      email: "sohan@StudentApplicationCRM.com",
      role: "case",
      status: "active",
      lastActive: "3 hours ago",
    },
  ]);

  const [addUserOpen, setAddUserOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">User Management</h2>
          <p className="text-gray-600">
            Manage internal staff and assign roles
          </p>
        </div>
        <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="size-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new internal user account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name</Label>
                <Input id="userName" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">Email</Label>
                <Input
                  id="userEmail"
                  type="email"
                  placeholder="user@Student Application CRM.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userRole">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing Officer</SelectItem>
                    <SelectItem value="application">
                      Application Officer
                    </SelectItem>
                    <SelectItem value="compliance">
                      Compliance Officer
                    </SelectItem>
                    <SelectItem value="case">Case Officer</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{users.length + 1}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Now</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Officers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Admins</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">1</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Internal Users</CardTitle>
          <CardDescription>All system users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p>{u.name}</p>
                  <p className="text-sm text-gray-600">{u.email}</p>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {u.role
                    .replace("marketing", "Marketing Officer")
                    .replace("application", "Application Officer")
                    .replace("compliance", "Compliance Officer")
                    .replace("case", "Case Officer")}
                </Badge>
                <Badge variant="outline">{u.status}</Badge>
                <p className="text-sm text-gray-500 w-32 text-right">
                  {u.lastActive}
                </p>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Reports & Analytics</h2>
        <p className="text-gray-600">
          Comprehensive system insights and metrics
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Applications This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BarChart className="size-5 text-blue-600" />
              <p className="text-2xl">68</p>
            </div>
            <p className="text-xs text-green-600 mt-2">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Visas Approved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="size-5 text-green-600" />
              <p className="text-2xl">52</p>
            </div>
            <p className="text-xs text-green-600 mt-2">89% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Revenue This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-600" />
              <p className="text-2xl">$42,500</p>
            </div>
            <p className="text-xs text-green-600 mt-2">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Intake by Country</CardTitle>
          <CardDescription>Geographic distribution of students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CountryBar country="India" count={142} total={342} />
            <CountryBar country="Pakistan" count={78} total={342} />
            <CountryBar country="Bangladesh" count={56} total={342} />
            <CountryBar country="Nepal" count={42} total={342} />
            <CountryBar country="Sri Lanka" count={18} total={342} />
            <CountryBar country="Other" count={6} total={342} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Universities</CardTitle>
          <CardDescription>Most popular destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <UniversityRow
              name="University of Toronto"
              applications={45}
              acceptances={38}
            />
            <UniversityRow
              name="University of British Columbia"
              applications={38}
              acceptances={32}
            />
            <UniversityRow
              name="McGill University"
              applications={32}
              acceptances={28}
            />
            <UniversityRow
              name="University of Alberta"
              applications={28}
              acceptances={24}
            />
            <UniversityRow
              name="McMaster University"
              applications={24}
              acceptances={20}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DepartmentRow({
  department,
  officer,
  active,
  completed,
  pending,
  performance,
}: {
  department: string;
  officer: string;
  active: number;
  completed: number;
  pending: number;
  performance: number;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div className="flex-1">
        <p>{department}</p>
        <p className="text-sm text-gray-600">{officer}</p>
      </div>
      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-xs text-gray-600">Active</p>
          <p className="text-lg">{active}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Completed</p>
          <p className="text-lg">{completed}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Pending</p>
          <p className="text-lg">{pending}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Award className="size-4 text-green-600" />
        <span>{performance}%</span>
      </div>
      <Button variant="outline" size="sm">
        View
      </Button>
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
  type: "info" | "success" | "warning";
}) {
  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <div
        className={`size-2 mt-2 rounded-full flex-shrink-0 ${
          type === "success"
            ? "bg-green-600"
            : type === "warning"
            ? "bg-orange-600"
            : "bg-blue-600"
        }`}
      />
      <div className="flex-1">
        <p>{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function AlertItem({
  title,
  description,
  priority,
}: {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}) {
  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <AlertCircle
        className={`size-5 mt-0.5 flex-shrink-0 ${
          priority === "high"
            ? "text-red-600"
            : priority === "medium"
            ? "text-orange-600"
            : "text-gray-600"
        }`}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span>{title}</span>
          <Badge variant={priority === "high" ? "destructive" : "secondary"}>
            {priority}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function CountryBar({
  country,
  count,
  total,
}: {
  country: string;
  count: number;
  total: number;
}) {
  const percentage = Math.round((count / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <span>{country}</span>
        <span className="text-gray-600">
          {count} ({percentage}%)
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function UniversityRow({
  name,
  applications,
  acceptances,
}: {
  name: string;
  applications: number;
  acceptances: number;
}) {
  const rate = Math.round((acceptances / applications) * 100);
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg">
      <div className="flex-1">
        <p>{name}</p>
        <p className="text-sm text-gray-600">{applications} applications</p>
      </div>
      <div className="text-right">
        <p>{acceptances} accepted</p>
        <p className="text-sm text-green-600">{rate}% success rate</p>
      </div>
    </div>
  );
}
