import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Bell, FileText, AlertCircle, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'document' | 'message' | 'status' | 'action';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  from?: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'action',
    title: 'Action Required: Upload Bank Statement',
    message: 'Please upload your recent bank statement (last 6 months) to proceed with your application.',
    timestamp: '2 hours ago',
    read: false,
    priority: 'high',
    from: 'Chris Compliance',
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message from Marketing Officer',
    message: 'Please review the visa submission checklist I sent. Let me know if you have any questions.',
    timestamp: '5 hours ago',
    read: false,
    priority: 'high',
    from: 'Mike Marketing',
  },
  {
    id: '3',
    type: 'status',
    title: 'Document Verified',
    message: 'Your passport copy has been successfully verified by the compliance team.',
    timestamp: '1 day ago',
    read: true,
    priority: 'medium',
    from: 'Chris Compliance',
  },
  {
    id: '4',
    type: 'document',
    title: 'Document Request',
    message: 'Please upload your English language test results (IELTS/TOEFL/PTE).',
    timestamp: '1 day ago',
    read: true,
    priority: 'high',
    from: 'Anna Application',
  },
  {
    id: '5',
    type: 'status',
    title: 'Application Stage Updated',
    message: 'Your application has moved to the Document Collection stage.',
    timestamp: '3 days ago',
    read: true,
    priority: 'medium',
    from: 'System',
  },
  {
    id: '6',
    type: 'status',
    title: 'Document Uploaded Successfully',
    message: 'Your academic transcripts have been uploaded successfully.',
    timestamp: '3 days ago',
    read: true,
    priority: 'low',
    from: 'System',
  },
  {
    id: '7',
    type: 'message',
    title: 'Welcome to Student Application CRM',
    message: 'Your account has been created successfully. You can now upload your documents and track your progress.',
    timestamp: '1 week ago',
    read: true,
    priority: 'low',
    from: 'System',
  },
];

export default function StudentNotifications() {
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Notifications</h2>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline">Mark All as Read</Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unread</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-blue-600" />
              <p className="text-2xl">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Action Required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-red-600" />
              <p className="text-2xl">
                {NOTIFICATIONS.filter((n) => n.type === 'action' && !n.read).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{NOTIFICATIONS.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>View all your notifications and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {NOTIFICATIONS.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'document':
        return <FileText className="size-5 text-blue-600" />;
      case 'message':
        return <MessageSquare className="size-5 text-purple-600" />;
      case 'status':
        return <CheckCircle2 className="size-5 text-green-600" />;
      case 'action':
        return <AlertCircle className="size-5 text-red-600" />;
      default:
        return <Bell className="size-5 text-gray-600" />;
    }
  };

  return (
    <div
      className={`flex gap-4 p-4 border rounded-lg ${
        !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
      }`}
    >
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={!notification.read ? '' : 'text-gray-700'}>
              {notification.title}
            </h4>
            {!notification.read && (
              <Badge variant="default" className="bg-blue-600">
                New
              </Badge>
            )}
            {notification.priority === 'high' && (
              <Badge variant="destructive">High Priority</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
            <Clock className="size-4" />
            {notification.timestamp}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
        {notification.from && (
          <p className="text-xs text-gray-500">From: {notification.from}</p>
        )}
        {!notification.read && (
          <Button variant="ghost" size="sm" className="mt-2">
            Mark as Read
          </Button>
        )}
      </div>
    </div>
  );
}
