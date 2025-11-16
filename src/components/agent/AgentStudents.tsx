import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { UserPlus, Search, Eye, FileText, MessageSquare } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  stage: string;
  progress: number;
  dateAdded: string;
  lastActivity: string;
}

export default function AgentStudents() {
  const [students, setStudents] = useState<Student[]>([
{
      id: '1',
      name: 'Rahim Uddin',
      email: 'rahim.u@email.com',
      phone: '+880 1712 345678',
      country: 'Bangladesh',
      stage: 'Document Collection',
      progress: 45,
      dateAdded: '2025-11-01',
      lastActivity: '2 hours ago',
    },
    {
      id: '2',
      name: 'Mitu Akter',
      email: 'mitu.a@email.com',
      phone: '+880 1811 234567',
      country: 'Bangladesh',
      stage: 'University Application',
      progress: 65,
      dateAdded: '2025-10-28',
      lastActivity: '5 hours ago',
    },
    {
      id: '3',
      name: 'Abdullah Al Mamun',
      email: 'abdullah.m@email.com',
      phone: '+880 1913 876543',
      country: 'Bangladesh',
      stage: 'Visa Processing',
      progress: 85,
      dateAdded: '2025-10-15',
      lastActivity: '1 day ago',
    },

  ]);

  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) return;

    const student: Student = {
      id: Date.now().toString(),
      ...newStudent,
      stage: 'Initial Consultation',
      progress: 5,
      dateAdded: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
    };

    setStudents([student, ...students]);
    setAddStudentOpen(false);
    setNewStudent({ name: '', email: '', phone: '', country: '' });
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === 'all' || student.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">My Students</h2>
          <p className="text-gray-600">Manage and track all your student applications</p>
        </div>
        <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="size-4 mr-2" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter student information to start their application</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter student's full name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@email.com"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+00 00000 00000"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={newStudent.country} onValueChange={(v: any) => setNewStudent({ ...newStudent, country: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="Nepal">Nepal</SelectItem>
                    <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddStudent} className="w-full" disabled={!newStudent.name || !newStudent.email}>
                Add Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Initial Consultation">Initial Consultation</SelectItem>
                <SelectItem value="Document Collection">Document Collection</SelectItem>
                <SelectItem value="University Application">University Application</SelectItem>
                <SelectItem value="Compliance Review">Compliance Review</SelectItem>
                <SelectItem value="Visa Processing">Visa Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Students</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{students.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{students.filter((s) => s.stage !== 'Completed').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>In Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{students.filter((s) => s.progress > 10 && s.progress < 90).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Near Completion</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{students.filter((s) => s.progress >= 80).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <CardDescription>
            {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
            {searchQuery || filterStage !== 'all' ? ' (filtered)' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No students found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentCard({ student }: { student: Student }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
          <span className="text-lg">{student.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4>{student.name}</h4>
            <Badge variant="secondary">{student.stage}</Badge>
            <span className="text-sm text-gray-500">{student.progress}% complete</span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600 mb-3">
            <div>Email: {student.email}</div>
            <div>Phone: {student.phone}</div>
            <div>Country: {student.country}</div>
            <div>Last activity: {student.lastActivity}</div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${student.progress}%` }} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="size-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="size-4 mr-2" />
            Files
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
