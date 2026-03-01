import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CheckCircle } from "lucide-react";
import useStaffStore from "../store/useStaffStore";
import { ranksList, nigerianStatesList } from "../data/mockStaff";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  dateOfEnlistment: Yup.string().required("Date of enlistment is required"),
  rank: Yup.string().required("Rank is required"),
  stateCommand: Yup.string().required("State command is required"),
  status: Yup.string().required("Status is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  dateOfEnlistment: "",
  rank: "",
  stateCommand: "",
  status: "Active",
};

function FormField({ label, name, type = "text", as, children, required }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-slate-600 mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {as === "select" ? (
        <Field
          as="select"
          id={name}
          name={name}
          className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 outline-none focus:border-nis-green focus:ring-1 focus:ring-nis-green transition-colors"
        >
          {children}
        </Field>
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 outline-none focus:border-nis-green focus:ring-1 focus:ring-nis-green transition-colors"
        />
      )}
      <ErrorMessage
        name={name}
        component="p"
        className="text-xs text-red-500 mt-1"
      />
    </div>
  );
}

export default function AddStaff() {
  const navigate = useNavigate();
  const addStaff = useStaffStore((state) => state.addStaff);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    addStaff(values);
    setShowSuccess(true);
    resetForm();
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/staff");
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Add New Staff</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Fill in the details below to register a new officer.
        </p>
      </div>

      {/* Success banner */}
      {showSuccess && (
        <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-sm font-medium text-emerald-800">
              Staff added successfully!
            </p>
            <p className="text-xs text-emerald-600">
              Redirecting to staff directory...
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              {/* Personal Information Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="First Name" name="firstName" required />
                  <FormField label="Last Name" name="lastName" required />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                  />
                  <FormField label="Phone Number" name="phone" required />
                  <FormField label="Gender" name="gender" as="select" required>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </FormField>
                  <FormField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    required
                  />
                </div>
              </div>

              {/* Service Information Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                  Service Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Rank" name="rank" as="select" required>
                    <option value="">Select rank</option>
                    {ranksList.map((rank) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </FormField>
                  <FormField
                    label="State Command"
                    name="stateCommand"
                    as="select"
                    required
                  >
                    <option value="">Select state command</option>
                    {nigerianStatesList.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </FormField>
                  <FormField
                    label="Date of Enlistment"
                    name="dateOfEnlistment"
                    type="date"
                    required
                  />
                  <FormField label="Status" name="status" as="select" required>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </FormField>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate("/staff")}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-nis-green rounded-lg hover:bg-nis-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding..." : "Add Staff Member"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
