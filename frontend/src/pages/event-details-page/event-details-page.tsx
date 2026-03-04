
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Edit, Trash2, ChevronLeft } from 'lucide-react';
import { Link, NavLink, useParams } from 'react-router';
import { useFetchData } from '../../hooks';
import type { Event } from '../../common/types';
import { useUserStore } from '../../storage/useAuthStore';
import { appPath } from '../../common/enums';
import { api } from '../../api/axios';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams();
  const { data } = useFetchData<Event[]>(`/events/${eventId}`);
  const { user, isAuthenticated } = useUserStore();
  const [isJoined, setIsJoined] = useState<boolean>(		data[0]?.isJoined || false);

  if (!data) return <div>Event not found</div>;

  const event = data[0];
  
  const isOrganizer = user?.id === event?.organizer?.id;

  const handleJoinEvent = async (eventId: string) => {
		await api.post(`/events/${eventId}/join`);
	}
  
  const handleLeaveEvent = async (eventId: string) => {
		await api.post(`/events/${eventId}/leave`);
	}

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Top Navigation */}
        <button type="button"
          className="items-center text-slate-500 hover:text-indigo-600 transition mb-2"
        >
          <Link to={appPath.ROOT} className='flex items-center cursor-pointer inline-block'>
              <ChevronLeft size={20} />
              <span className="font-medium">Back to Events</span>
          </Link>
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                {event?.title}
              </h1>
              {isOrganizer && (
                <div className="flex gap-2">
                  <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                    <Edit size={20} />
                  </button>
                  <button type="button" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed mb-8">
              {event?.description}
            </p>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-50">
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl mr-4">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Date</p>
                  <p className="font-semibold">{event?.date}</p>
                </div>
              </div>
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl mr-4">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</p>
                  <p className="font-semibold">{new Date(event?.date).getHours()} {new Date(event?.date).getMinutes()}</p>
                </div>
              </div>
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Location</p>
                  <p className="font-semibold">{event?.location}</p>
                </div>
              </div>
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl mr-4">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Capacity</p>
                  <p className="font-semibold">{event?.participants?.length || 0} / {event?.capacity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Participants Section */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Attending Participants</h2>
            <div className="flex flex-wrap gap-3">
              {event?.participants?.map((person) => (
                <div key={person.id} className="flex items-center bg-slate-50 border border-slate-100 px-4 py-2 rounded-full">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                    {person.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{person.name}</span>
                </div>
              ))}
              {event?.participantsCount === 0 && (
                <p className="text-slate-400 text-sm italic">No one has joined yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-6">
            <h3 className="font-bold text-slate-800 mb-4 text-center">Ready to join?</h3>
            {isAuthenticated && (
              <button
                  type='button'
                  onClick={isJoined ? handleLeaveEvent : handleJoinEvent}
                className={`w-full py-4 rounded-2xl font-bold transition shadow-lg ${
                  isJoined 
                  ? "bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50 shadow-rose-50" 
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100"
                }`}
              >
                {isJoined ? "Leave Event" : "Join Event"}
              </button>
            )}
            <p className="text-center text-xs text-slate-400 mt-4 px-4">
              {isJoined 
                ? "You are registered for this event. You can leave at any time."
                : `Only ${event?.capacity - (event?.participants?.length || 0)} spots left!`}
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Organizer</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold mr-3 text-lg">
                {event?.organizer?.name?.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-lg">{event?.organizer?.name}</p>
                <p className="text-slate-400 text-sm italic">Verified Organizer</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export { EventDetailsPage };