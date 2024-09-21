import { useState } from 'react'

// Mock data
const mockUsers = [
  { id: 1, name: 'Alice', timeSpent: '2h 30m', storage: '1.2 GB', apiRequests: '150ms', reported: false, banned: false },
  { id: 2, name: 'Bob', timeSpent: '1h 45m', storage: '0.8 GB', apiRequests: '120ms', reported: true, banned: false },
  { id: 3, name: 'Charlie', timeSpent: '3h 15m', storage: '2.1 GB', apiRequests: '180ms', reported: false, banned: false },
  { id: 4, name: 'David', timeSpent: '0h 45m', storage: '0.3 GB', apiRequests: '90ms', reported: true, banned: true },
  { id: 5, name: 'Eve', timeSpent: '4h 00m', storage: '1.7 GB', apiRequests: '160ms', reported: false, banned: false },
]

export default function Dashboard() {
  const [users, setUsers] = useState(mockUsers)

  const totalUsers = users.length
  const averageTime = users.reduce((acc, user) => acc + parseInt(user.timeSpent), 0) / totalUsers
  const totalStorage = users.reduce((acc, user) => acc + parseFloat(user.storage), 0).toFixed(2)
  const averageApiTime = users.reduce((acc, user) => acc + parseInt(user.apiRequests), 0) / totalUsers
  const reportedUsers = users.filter(user => user.reported).length
  const bannedUsers = users.filter(user => user.banned).length

  const toggleBan = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, banned: !user.banned } : user
    ))
  }

  return (
    <div style={{ padding: '32px' ,}}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>User Monitoring Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ padding: '16px', border: '1px solid #e2e2e2', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '8px' }}>Total Users</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalUsers}</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e2e2', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '8px' }}>Average Time Spent</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{averageTime.toFixed(2)} hours</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e2e2', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '8px' }}>Total Storage Used</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalStorage} GB</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e2e2', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '8px' }}>Average API Response Time</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{averageApiTime.toFixed(2)} ms</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e2e2', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '8px' }}>Reported Users</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{reportedUsers}</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e2e2', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '8px' }}>Banned Users</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{bannedUsers}</p>
        </div>
      </div>

      <div style={{ border: '1px solid #e2e2e2', borderRadius: '8px', padding: '16px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>User Details</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid #e2e2e2', padding: '8px' }}>Name</th>
              <th style={{ borderBottom: '2px solid #e2e2e2', padding: '8px' }}>Time Spent</th>
              <th style={{ borderBottom: '2px solid #e2e2e2', padding: '8px' }}>Storage</th>
              <th style={{ borderBottom: '2px solid #e2e2e2', padding: '8px' }}>API Requests</th>
              <th style={{ borderBottom: '2px solid #e2e2e2', padding: '8px' }}>Status</th>
              <th style={{ borderBottom: '2px solid #e2e2e2', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ borderBottom: '1px solid #e2e2e2', padding: '8px' }}>{user.name}</td>
                <td style={{ borderBottom: '1px solid #e2e2e2', padding: '8px' }}>{user.timeSpent}</td>
                <td style={{ borderBottom: '1px solid #e2e2e2', padding: '8px' }}>{user.storage}</td>
                <td style={{ borderBottom: '1px solid #e2e2e2', padding: '8px' }}>{user.apiRequests}</td>
                <td style={{ borderBottom: '1px solid #e2e2e2', padding: '8px' }}>
                  {user.reported && <span style={{ backgroundColor: '#fbbf24', padding: '4px 8px', borderRadius: '4px', marginRight: '8px' }}>Reported</span>}
                  {user.banned && <span style={{ backgroundColor: '#f87171', padding: '4px 8px', borderRadius: '4px' }}>Banned</span>}
                </td>
                <td style={{ borderBottom: '1px solid #e2e2e2', padding: '8px' }}>
                  <button
                    style={{
                      backgroundColor: user.banned ? '#ffffff' : '#ef4444',
                      color: user.banned ? '#ef4444' : '#ffffff',
                      border: `1px solid ${user.banned ? '#ef4444' : 'transparent'}`,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleBan(user.id)}
                  >
                    {user.banned ? 'Unban' : 'Ban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
