import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2,
  User,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';
import AddUser from './AddUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import './Users.css';
import './UserModals.css';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Administrator',
      status: 'active',
      lastActive: '2 hours ago',
      details: {
        department: 'Engineering',
        location: 'San Francisco',
        phone: '+1 (555) 123-4567'
      }
    },
    // ... other users
  ]);

  // Helper functions
  const toggleUserDetails = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setAddingUser(false);
  };

  const handleSave = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  const handleDeleteConfirm = () => {
    setUsers(users.filter(user => user.id !== deletingUser.id));
    setDeletingUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users-page">
      {/* Header Section */}
      <div className="users-header">
        <h1>Users Management</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="add-user-btn"
            onClick={() => setAddingUser(true)}
          >
            <Plus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          {/* Table body */}
          <tbody>
            {filteredUsers.map(user => (
              <React.Fragment key={user.id}>
                <tr className="user-row">
                  {/* User info cells */}
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        <User size={18} />
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.lastActive}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="expand-btn"
                        onClick={() => toggleUserDetails(user.id)}
                      >
                        {expandedUser === user.id ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded details row */}
                {expandedUser === user.id && (
                  <tr className="user-details-row">
                    <td colSpan="6">
                      <div className="user-details">
                        <div className="detail-item">
                          <span className="detail-label">Department:</span>
                          <span>{user.details.department}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Location:</span>
                          <span>{user.details.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone:</span>
                          <span>{user.details.phone}</span>
                        </div>
                        <div className="detail-actions">
                          <button 
                            className="edit-btn"
                            onClick={() => setEditingUser(user)}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => setDeletingUser(user)}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="pagination-btn disabled">Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button className="pagination-btn">Next</button>
      </div>

      {/* Modals */}
      {addingUser && (
        <AddUser 
          onClose={() => setAddingUser(false)}
          onSave={handleAddUser}
          nextId={users.length + 1}
        />
      )}
      
      {editingUser && (
        <EditUser 
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
      
      {deletingUser && (
        <DeleteUser 
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Users;