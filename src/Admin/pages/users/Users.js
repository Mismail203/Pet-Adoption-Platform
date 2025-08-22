import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search, Plus, Trash2, User, ChevronDown, ChevronRight
} from 'lucide-react';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import './Users.css';
import './UserModals.css';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://node-api-wlq1.onrender.com/api/users/get-all-users');
      setUsers(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      if (!searchQuery.trim()) {
        fetchAllUsers();
        return;
      }

      setLoading(true);
      setError('');
      try {
        let res;
        if (searchQuery.includes('@')) {
          res = await axios.get(`https://node-api-wlq1.onrender.com/api/users/one-user-data/${searchQuery}`);
        } else {
          res = await axios.get(`https://node-api-wlq1.onrender.com/api/users/by-id/${searchQuery}`);
        }
        setUsers([res.data]);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
        setError('No user found');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleUserDetails = (_id) => {
    setExpandedUser(expandedUser === _id ? null : _id);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, _id: users.length + 1 }]);
    setAddingUser(false);
  };

  const handleDeleteConfirm = () => {
    setUsers(users.filter(user => user._id !== deletingUser._id));
    setDeletingUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users Management</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              disabled={loading}
            />
          </div>
          <button className="add-user-btn" onClick={() => setAddingUser(true)} disabled={loading}>
            <Plus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="rows-selector">
        <label>Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          disabled={loading}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="3" className="loader-cell">
                  <img src="https://loading.io/assets/mod/spinner/spinner/lg.gif" alt="Loading..." className="loader-gif" />
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan="3" className="error-row">
                  <div className="error-text">{error}</div>
                </td>
              </tr>
            )}
            {!error && !loading && paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="3" className="no-users-row">
                  <div className="no-users-text">No user found</div>
                </td>
              </tr>
            )}
            {!loading && paginatedUsers.map(user => (
              <React.Fragment key={user._id}>
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
                    <div className="actions">
                      <button className="expand-btn" onClick={() => toggleUserDetails(user._id)}>
                        {expandedUser === user._id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedUser === user._id && (
                  <tr className="user-details-row">
                    <td colSpan="3">
                      <div className="user-details">
                        <div className="detail-actions">
                          <button className="delete-btn" onClick={() => setDeletingUser(user)}>
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

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1 || loading || filteredUsers.length === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages || loading || filteredUsers.length === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {addingUser && <AddUser onClose={() => setAddingUser(false)} onSave={handleAddUser} nextId={users.length + 1} />}
      {deletingUser && <DeleteUser user={deletingUser} onClose={() => setDeletingUser(null)} onConfirm={handleDeleteConfirm} />}
    </div>
  );
};

export default Users;
