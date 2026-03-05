
import { Calendar, Clock, MapPin, Users, Edit, Trash2, ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useFetchData } from '../../hooks';
import type { Event } from '../../common/types';
import { useUserStore } from '../../storage/useAuthStore';
import { appPath } from '../../common/enums';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { EventService } from '../../services/event.service';
import { useApiMutation } from '../../hooks/useApiMutation';
import { EventCardSkeleton } from '../home-page/components/event-card-skeleton/event-card-skeleton';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams();
  const { data: event, setData, isLoading } = useFetchData<Event>(`/events/${eventId}`);
  const { execute: joinEvent } = useApiMutation(EventService.join);
  const { execute: leaveEvent } = useApiMutation(EventService.leave);
  const { execute: deleteEvent } = useApiMutation(EventService.delete);
  const { execute: updateEvent } = useApiMutation(EventService.update);

  const { user, isAuthenticated } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: 0,
  });

  useEffect(() => {
    if(event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        capacity: event.capacity,
      });
    }
  }, [event]);

  if(isLoading) return <EventCardSkeleton/>
  if (!event || !eventId) return <div>Event not found</div>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value
    }))
  }

  const handleUpdate = async () => {
    try {
      const { data } = await updateEvent(eventId, formData);
      if(data) {
        toast.success("Event successfully updated");
        setData(data);
        setIsEditing(false);
      }
    } catch (error) {
      if(error instanceof Error) {
        toast(error.message);
      }
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    const time = formatTime(formData.date);

    setFormData(prev => ({
      ...prev,
      date: `${newDate}T${time}`
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    const date = formatDate(formData.date);

    setFormData(prev => ({
      ...prev,
      date: `${date}T${newTime}`
    }));
  };

  const handleCancel = () => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        capacity: event.capacity,
      });
    }
    setIsEditing(false);
  };

  const handleRemoveEvent = () => {
    const isRemove = confirm("Are you sure you want to remove event?");
    if(isRemove) {
      deleteEvent(eventId);
    }
  }

  const isJoined = event.isJoined;
  
  const isOrganizer = user?.id === event?.organizer?.id;
  const inputClass =
  "w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 outline-none transition";

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString()
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Top Navigation */}
        <button type="button"
          className="items-center text-slate-500 hover:text-indigo-600 transition mb-2"
        >
          <Link to={appPath.ROOT} className='flex items-center cursor-pointer'>
              <ChevronLeft size={20} />
              <span className="font-medium">Back to Events</span>
          </Link>
        </button>

      {isLoading && <EventCardSkeleton/>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="wrap-anywhere flex justify-between items-start mb-6">
              {isEditing ? (
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`text-3xl font-bold ${inputClass}`}
                />
              ) : (
                <h1 className="text-3xl font-bold">
                  {event.title}
                </h1>
              )}
              {isOrganizer && (
                <div className="flex gap-2">
                  {!isEditing && (
                      <>
                        <button
                          type='button'
                          onClick={() => setIsEditing(true)}
                          className="cursor-pointer p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={handleRemoveEvent} 
                          type='button'
                          className="cursor-pointer p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                </div>
              )}
            </div>

            {isEditing ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 ${inputClass}`}
                />
              ) : (
                <p className='wrap-anywhere'>{event.description}</p>
            )}
            
            <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-50">
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl mr-4">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Date</p>
                  {isEditing ? (
                    <input
                      type="date"
                      name="date"
                      value={formatDate(formData.date)}
                      onChange={handleDateChange}
                      className={`border rounded-lg p-2 ${inputClass}`}
                    />
                  ) : (
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl mr-4">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</p>
                  {isEditing ? (
                    <input
                      type="time" 
                      name="date"
                      value={formatTime(formData.date)}
                      onChange={handleTimeChange}
                      className={`border rounded-lg p-2 ${inputClass}`}
                    />
                  ) : (
                    <p>{new Date(event.date).toLocaleTimeString()}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Location</p>
                  {isEditing ? (
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`border rounded-lg p-2 ${inputClass}`}
                    />
                  ) : (
                    <p>{event.location}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center text-slate-600">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl mr-4">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Capacity</p>
                  {isEditing ? (
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className={`border rounded-lg p-2 ${inputClass}`}
                    />
                  ) : (
                    <p className="font-semibold">{event?.participantsCount || 0} / {event?.capacity}</p>
                  )}
                </div>
              </div>

              {(isOrganizer && isEditing) && (
                      <div className='flex justify-content-between gap-1'>
                        <button
                          onClick={handleUpdate}
                          type='button'
                          className="cursor-pointer bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center gap-2"
                        >
                          Save
                        </button>
                        <button
                          type='button'
                          onClick={handleCancel}
                          className="cursor-pointer bg-white border-2 border-slate-200 text-slate-500 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
              )}
            </div>
          </div>

          {/* Participants Section */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            {event?.participants?.length === 0 ? <h2 className="text-xl font-bold text-slate-800 mb-6">No attending participants</h2> : <h2 className="text-xl font-bold text-slate-800 mb-6">Attending Participants</h2>}
            <div className="flex flex-wrap gap-3">
              {event?.participants?.map((person) => (
                <div key={person.id} className="flex items-center bg-slate-50 border border-slate-100 px-4 py-2 rounded-full">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                    {person.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{person.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-6">
            {isAuthenticated && isOrganizer ? (
              <div className="w-full py-3 text-center bg-slate-100 rounded-xl text-slate-500 font-medium text-sm">
                  You are the organizer
              </div>
            ) : !isAuthenticated ? (
              <span>Login to join this event</span>
            ) : (
               <>
                <h3 className="font-bold text-slate-800 mb-4 text-center">Ready to join?</h3>
                <button
                    type='button'
                    onClick={isJoined ? () => leaveEvent(eventId) : () => joinEvent(eventId)}
                  className={`cursor-pointer w-full py-4 rounded-2xl font-bold transition shadow-lg ${
                    isJoined 
                    ? "bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50 shadow-rose-50" 
                    : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100"
                  }`}
                >
                  {isJoined ? "Leave Event" : "Join Event"}
                </button>
              </>
            )}
            <p className="text-center text-xs text-slate-400 mt-4 px-4">
              {isJoined 
                ? "You are registered for this event. You can leave at any time."
                : `Only ${event?.capacity - (event?.participantsCount || 0)} spots left!`}
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