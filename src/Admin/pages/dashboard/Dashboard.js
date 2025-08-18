import React from 'react';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Activity,
  Check,
  X,
  Clock,
  UserPlus,
  FileText,
  CreditCard
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$54,239',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Total Orders',
      value: '1,429',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'green'
    },
    {
      id: 3,
      title: 'Active Users',
      value: '2,349',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Conversion Rate',
      value: '3.21%',
      change: '+0.3%',
      trend: 'up',
      icon: Activity,
      color: 'orange'
    }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', product: 'MacBook Pro', amount: '$2,499', status: 'Completed' },
    { id: '#12346', customer: 'Jane Smith', product: 'iPhone 15', amount: '$999', status: 'Processing' },
    { id: '#12347', customer: 'Bob Johnson', product: 'iPad Air', amount: '$599', status: 'Shipped' },
    { id: '#12348', customer: 'Alice Brown', product: 'AirPods Pro', amount: '$249', status: 'Pending' }
  ];

  const activities = [
    {
      id: 1,
      icon: <Check size={16} />,
      iconBg: 'bg-green-100 text-green-600',
      title: 'Order #12345 was completed',
      time: '2 minutes ago'
    },
    {
      id: 2,
      icon: <UserPlus size={16} />,
      iconBg: 'bg-blue-100 text-blue-600',
      title: 'John Doe registered as a new user',
      time: '5 minutes ago'
    },
    {
      id: 3,
      icon: <FileText size={16} />,
      iconBg: 'bg-yellow-100 text-yellow-600',
      title: 'System backup completed successfully',
      time: '1 hour ago'
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Add New User',
      icon: UserPlus,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Create Order',
      icon: ShoppingCart,
      color: 'green'
    },
    {
      id: 3,
      title: 'View Reports',
      icon: FileText,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Manage Payments',
      icon: CreditCard,
      color: 'orange'
    }
  ];

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-info">
            <p className="stat-title">{stat.title}</p>
            <p className="stat-value">{stat.value}</p>
            <div className="stat-change">
              {stat.trend === 'up' ? (
                <TrendingUp className="trend-icon trend-up" size={16} />
              ) : (
                <TrendingDown className="trend-icon trend-down" size={16} />
              )}
              <span className={`change-text ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
          </div>
          <div className={`stat-icon ${stat.color}`}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    );
  };

  const QuickActionCard = ({ action }) => {
    const Icon = action.icon;
    return (
      <div className={`action-card bg-${action.color}-50 hover:bg-${action.color}-100`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-${action.color}-100 text-${action.color}-600`}>
            <Icon size={20} />
          </div>
          <span className={`font-medium text-${action.color}-800`}>{action.title}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Recent Orders */}
        <div className="content-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="table-container">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status === 'Completed' && <Check size={14} />}
                          {order.status === 'Processing' && <Clock size={14} />}
                          {order.status === 'Shipped' && <Activity size={14} />}
                          {order.status === 'Pending' && <Clock size={14} />}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="content-card">
        <div className="card-header">
          <h3>Recent Activity</h3>
        </div>
        <div className="activity-feed">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.iconBg}`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;