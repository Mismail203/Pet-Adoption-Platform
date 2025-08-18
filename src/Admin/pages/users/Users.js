import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  User,
  ChevronDown,
  ChevronRight,
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

  // pagination states
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Administrator', status: 'active', lastActive: '2 hours ago', details: { department: 'Engineering', location: 'San Francisco', phone: '+1 (555) 123-4567' }},
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastActive: '1 hour ago', details: { department: 'Design', location: 'New York', phone: '+1 (555) 222-3333' }},
    { id: 3, name: 'Mike Brown', email: 'mike@example.com', role: 'Viewer', status: 'inactive', lastActive: '5 days ago', details: { department: 'Marketing', location: 'Chicago', phone: '+1 (555) 444-5555' }},
    { id: 4, name: 'Alice Green', email: 'alice@example.com', role: 'Administrator', status: 'active', lastActive: '3 hours ago', details: { department: 'HR', location: 'San Francisco', phone: '+1 (555) 111-2222' }},
    { id: 5, name: 'Sam Wilson', email: 'sam@example.com', role: 'Editor', status: 'active', lastActive: '30 mins ago', details: { department: 'Product', location: 'Los Angeles', phone: '+1 (555) 666-7777' }},
    { id: 6, name: 'Chris Lee', email: 'chris@example.com', role: 'Viewer', status: 'inactive', lastActive: '10 days ago', details: { department: 'Support', location: 'Seattle', phone: '+1 (555) 888-9999' }},
    { id: 7, name: 'Emma Davis', email: 'emma@example.com', role: 'Editor', status: 'active', lastActive: '4 hours ago', details: { department: 'Content', location: 'Austin', phone: '+1 (555) 333-4444' }},
  ]);

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

  // pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);

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

      {/* Rows per page selector */}
      <div className="rows-selector">
        <label>Rows per page:</label>
        <select 
          value={rowsPerPage} 
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1); // reset to first page
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
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
          <tbody>
            {paginatedUsers.map(user => (
              <React.Fragment key={user.id}>
                <tr className="user-row">
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
        <button 
          className="pagination-btn" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="pagination-btn" 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
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
