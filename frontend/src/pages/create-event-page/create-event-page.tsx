import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CreateEventSchema } from '../../common/schemas';
import { toast } from 'react-toastify';
import { appPath } from '../../common/enums';
import { useApiMutation } from '../../hooks/useApiMutation';
import { EventService } from '../../services/event.service';

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const { execute: createEvent, isSubmitting } = useApiMutation(EventService.create);

  const initialValues = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 0,
    visibility: 'public',
  };

  const handleSubmit = async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const { data } = await createEvent(values);
      if(data) {
        toast.success("Event successfully created");
        resetForm();
        navigate(appPath.EVENT_DETAILS.replace(":eventId", data.id));
      }
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        type='button' 
        className="cursor-pointer flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back</span>
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create New Event</h1>
          <p className="text-slate-500">Fill in the details to create an amazing event</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={CreateEventSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-6">
              
              {/* Event Title */}
              <div>
                <label htmlFor='title-input' className="block text-sm font-semibold mb-2">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <Field 
                  name="title"
                  placeholder="e.g., Tech Conference 2025" 
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                    ${errors.title && touched.title ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              {/* Description */}
              <div>
                <label htmlFor='description-input' className="block text-sm font-semibold mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <Field 
                  id='description-input'
                  as="textarea"
                  name="description"
                  rows={4}
                  placeholder="Describe what makes your event special..." 
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none
                    ${errors.description && touched.description ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                   htmlFor='date-input'
                   className="block text-sm font-semibold mb-2"
                   >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Field 
                      id='date-input'
                      type="date" 
                      name="date"
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                        ${errors.date && touched.date ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                    />
                  </div>
                  <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>

                <div>
                  <label
                   htmlFor='time-input'
                   className="block text-sm font-semibold mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Field 
                      id='time-input'
                      type="time" 
                      name="time"
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                        ${errors.time && touched.time ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                    />
                  </div>
                  <ErrorMessage name="time" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label  htmlFor='location-input' className="block text-sm font-semibold mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <Field 
                  name="location"
                  id="location-input"
                  placeholder="e.g., Convention Center, San Francisco" 
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                    ${errors.location && touched.location ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                />
                <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              {/* Capacity */}
              <div>
                <label htmlFor="capacity-input" className="block text-sm font-semibold mb-2">
                  Capacity (optional)
                </label>
                <Field 
                  id="capacity-input"
                  name="capacity"
                  type="number"
                  placeholder="Leave empty for unlimited" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <p className="text-xs text-slate-500 mt-2">Maximum participants. Leave empty for unlimited capacity.</p>
                <ErrorMessage name="capacity" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              {/* Visibility */}
              <div className="space-y-3">
                <label htmlFor="visibility-input" className="block text-sm font-semibold">Visibility</label>
                <div className="space-y-2">
                  {['public', 'private'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          id='visibility-input'
                          type="radio" 
                          name="visibility" 
                          checked={values.visibility === type}
                          onChange={() => setFieldValue('visibility', type)}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-indigo-600 transition-all"
                        />
                        <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 capitalize">
                        {type} - {type === 'public' ? 'Anyone can see and join' : 'Only invited people can see'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full py-3.5 px-6 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? "Creating..." : "Create Event" }
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export { CreateEventPage };