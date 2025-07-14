'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/authContext';
import apiClient from '@/app/lib/api';

interface InvitedMember {
  invited_id: number;
  invited_by_id: number;
  status: string;
  user_email: string;
}

interface User {
  user_id: number;
  user_name: string;
  password: string;
  phone?: string;
  email: string;
  createdAt?: string;
}

const STATUS_CYCLE = ['Pending', 'Accepted', 'Rejected'];

export default function InvitationsPage() {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState<InvitedMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [invitee, setInvitee]=useState<string|null>(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const data = await apiClient.get(`/invited-member/${user?.user_id}`);
        setInvitations([data]);
        const invitedby:User = await apiClient.get(`/users/${data.invited_by_id}`);
        setInvitee(invitedby.email)
      } catch (err) {
        console.error(err);
        setError('Failed to load invitations');
      }
    };

    if (user?.user_id) fetchInvitations();
  }, [user?.user_id]);

  const cycleStatus = async (invite: InvitedMember) => {
    const currentIndex = STATUS_CYCLE.indexOf(invite.status || 'Pending');
    const nextStatus = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length];

    try {
      await apiClient.patch(`/invited-member/${invite.invited_id}`, {
        status: nextStatus,
      });

      setInvitations((prev) =>
        prev.map((t) =>
          t.invited_id === invite.invited_id ? { ...t, status: nextStatus } : t
        )
      );
    } catch (err) {
      console.error('Failed to update status');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Invitations</h2>

      {error && <p className="text-red-500">{error}</p>}

      {invitations.length === 0 && !error ? (
        <p className="text-gray-600">You have no pending invitations.</p>
      ) : (
        <ul className="space-y-4">
          {invitations.map((invite) => (
            <li
              key={invite.invited_id}
              className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              
              <h3 className="text-lg font-medium text-blue-700">Invited by</h3> 
              {/* <p className="text-sm text-gray-600">User ID {invite.invited_by_id}</p> */}
              <p className="text-sm text-gray-600">User email: {invitee}</p>
              
                    <button
                onClick={() => cycleStatus(invite)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Status: {invite.status || 'Pending'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}