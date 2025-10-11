import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function FormikForm() {
  const initialValues = { username: '', email: '', password: '' };

  const handleSubmit = (values) => {
    console.log('Formik submission:', values);
    // Simulate API call here
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        {['username', 'email', 'password'].map((field) => (
          <div key={field}>
            <label>{field}</label>
            <Field
              type={field === 'password' ? 'password' : 'text'}
              name={field}
            />
            <ErrorMessage name={field} component="span" style={{ color: 'red' }} />
          </div>
        ))}
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}