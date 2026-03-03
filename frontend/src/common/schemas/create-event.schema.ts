import * as Yup from "yup";

const CreateEventSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title too short').required('Event title is required'),
  description: Yup.string().min(20, 'Please provide more detail').required('Description is required'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  location: Yup.string().required('Location is required'),
  capacity: Yup.number().typeError('Must be a number').positive().integer().max(10000),
  visibility: Yup.string().oneOf(['public', 'private']).required(),
});


export { CreateEventSchema };