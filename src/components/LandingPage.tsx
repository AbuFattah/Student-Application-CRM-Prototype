import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, Users, Building2, FileCheck, CheckCircle2, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-8 text-blue-600" />
            <span className="text-xl">Student Application CRM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl mb-6">
          Streamline Your Student Application Process
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          End-to-end workflow automation for students, agents, and education consultancies. 
          Real-time tracking, seamless collaboration, and transparent progress monitoring.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button size="lg">
              <GraduationCap className="size-5 mr-2" />
              Student Registration
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">
              <Users className="size-5 mr-2" />
              Agent Portal
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl text-center mb-12">
          Comprehensive Application Management
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Globe className="size-10 text-blue-600 mb-4" />
              <CardTitle>Public Portal</CardTitle>
              <CardDescription>
                For Students & Agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Easy registration and login</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Document upload with version history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time progress tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Instant notifications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Building2 className="size-10 text-blue-600 mb-4" />
              <CardTitle>Internal Portal</CardTitle>
              <CardDescription>
                For Staff & Officers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Role-based access control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Multi-department collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Workflow automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive reporting</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileCheck className="size-10 text-blue-600 mb-4" />
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                Secure & Organized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>File tagging and categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Version control and history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Compliance verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Secure file storage</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 -mx-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-center mb-12">
            Streamlined Application Workflow
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Student File Processing Workflow</CardTitle>
              <CardDescription>
                From initial contact to visa submission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <WorkflowStep number={1} title="Marketing Officer communicates with Student" />
                <WorkflowStep number={2} title="Marketing Officer provides Offer Letter Checklist" />
                <WorkflowStep number={3} title="Student pays File Opening Charge" />
                <WorkflowStep number={4} title="Marketing Officer provides Final Visa Submission Checklist" />
                <WorkflowStep number={5} title="Marketing Officer updates Work Sheet Chart" />
                <WorkflowStep number={6} title="File transferred to Application Team" />
                <WorkflowStep number={7} title="Student completes Form and submits to Compliance Team" />
                <WorkflowStep number={8} title="Student receives Offer Letter" />
                <WorkflowStep number={9} title="Compliance Team completes verification" />
                <WorkflowStep number={10} title="File transferred to Case Officer for Final Submission" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Student Application CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function WorkflowStep({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 size-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
        {number}
      </div>
      <div className="flex-1 p-3 bg-white rounded-lg border">
        {title}
      </div>
    </div>
  );
}
