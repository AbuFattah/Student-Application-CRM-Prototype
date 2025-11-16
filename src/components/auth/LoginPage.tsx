import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GraduationCap, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import type { User, UserRole } from "../../App";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

// Demo users for prototype
const DEMO_USERS: Record<string, User> = {
  "student@demo.com": {
    id: "1",
    name: "Rahim Uddin",
    email: "student@demo.com",
    role: "student",
  },
  "agent@demo.com": {
    id: "2",
    name: "Tahmid Ahmed",
    email: "agent@demo.com",
    role: "agent",
    approved: true,
  },
  "marketing@demo.com": {
    id: "3",
    name: "Nabila Chowdhury",
    email: "marketing@demo.com",
    role: "marketing",
  },
  "application@demo.com": {
    id: "4",
    name: "Rafiq Hossain",
    email: "application@demo.com",
    role: "application",
  },
  "compliance@demo.com": {
    id: "5",
    name: "Shahana Karim",
    email: "compliance@demo.com",
    role: "compliance",
  },
  "case@demo.com": {
    id: "6",
    name: "Farhan Rahman",
    email: "case@demo.com",
    role: "case",
  },
  "admin@demo.com": {
    id: "7",
    name: "Super Admin",
    email: "admin@demo.com",
    role: "superadmin",
  },
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"public" | "internal">("public");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Demo login logic
    const user = DEMO_USERS[email];
    if (!user || password !== "demo123") {
      setError("Invalid credentials. Use demo@*.com and password: demo123");
      return;
    }

    // Check user type matches
    const isInternalRole = [
      "marketing",
      "application",
      "compliance",
      "case",
      "superadmin",
    ].includes(user.role);
    if (
      (userType === "internal" && !isInternalRole) ||
      (userType === "public" && isInternalRole)
    ) {
      setError("Invalid user type for this portal");
      return;
    }

    onLogin(user);

    // Navigate based on role
    if (user.role === "student") {
      navigate("/student/dashboard");
    } else if (user.role === "agent") {
      navigate("/agent/dashboard");
    } else {
      navigate("/internal/dashboard");
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="size-10 text-blue-600" />
            <span className="text-2xl">Student Application CRM</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Portal Type</Label>
                <Select
                  value={userType}
                  onValueChange={(v: any) =>
                    setUserType(v as "public" | "internal")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      Public Portal (Student/Agent)
                    </SelectItem>
                    <SelectItem value="internal">
                      Internal Portal (Staff)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3">Demo Accounts:</p>
              <div className="space-y-2">
                {userType === "public" ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin("student@demo.com")}
                    >
                      Student Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin("agent@demo.com")}
                    >
                      Agent Demo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin("admin@demo.com")}
                    >
                      Super Admin
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin("marketing@demo.com")}
                    >
                      Marketing Officer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin("application@demo.com")}
                    >
                      Application Officer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin("compliance@demo.com")}
                    >
                      Compliance Officer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin("case@demo.com")}
                    >
                      Case Officer
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
