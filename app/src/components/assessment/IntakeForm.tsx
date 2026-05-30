import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "./ProgressBar";
import {
  stateNames,
  getLGAs,
  genders,
  languages,
  employmentStatuses,
  educationLevels,
  maritalStatuses,
} from "@/data/nigeriaStates";

const intakeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "LGA is required"),
  community: z.string().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
  employmentStatus: z.string().optional(),
  educationLevel: z.string().optional(),
  maritalStatus: z.string().optional(),
  householdSize: z.string().optional(),
});

export type IntakeFormData = z.infer<typeof intakeSchema>;

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<IntakeFormData>;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05 + 0.3,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

function FormField({
  label,
  required,
  error,
  children,
  index,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col gap-1.5", className)}
    >
      <label className="text-sm font-medium text-[#292524]">
        {label}
        {required && <span className="text-[#DC2626] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-[#DC2626] mt-0.5"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function IntakeForm({
  onSubmit,
  onBack,
  defaultValues,
}: IntakeFormProps) {
  const [showSocial, setShowSocial] = useState(false);
  const [selectedState, setSelectedState] = useState(defaultValues?.state || "");
  const [lgaOptions, setLgaOptions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      state: "",
      lga: "",
      community: "",
      phone: "",
      email: "",
      preferredLanguage: "",
      employmentStatus: "",
      educationLevel: "",
      maritalStatus: "",
      householdSize: "",
      ...defaultValues,
    },
  });

  const watchedState = watch("state");
  const dobValue = watch("dateOfBirth");

  // Auto-calculate age from DOB
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  useEffect(() => {
    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setCalculatedAge(age >= 0 ? age : null);
    } else {
      setCalculatedAge(null);
    }
  }, [dobValue]);

  // Update LGA options when state changes
  useEffect(() => {
    if (watchedState) {
      const lgas = getLGAs(watchedState);
      setLgaOptions(lgas);
      if (watchedState !== selectedState) {
        setValue("lga", "");
        setSelectedState(watchedState);
      }
    } else {
      setLgaOptions([]);
    }
  }, [watchedState, selectedState, setValue]);

  const onFormSubmit = (data: IntakeFormData) => {
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      }}
      className="w-full max-w-[720px] mx-auto"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <ProgressBar current={2} total={4} label="Step 2 of 4" />
      </div>

      {/* Form container */}
      <div className="bg-white border border-[#E7E5E4] rounded-[20px] p-6 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#57534E] hover:text-[#1C1917] transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold text-[#1C1917] mb-2">
            Tell us about yourself
          </h2>
          <p className="text-[15px] text-[#57534E] mb-8">
            This information helps us provide relevant resources and referrals.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="First Name" required error={errors.firstName?.message} index={0}>
              <input
                {...register("firstName")}
                type="text"
                placeholder="Enter your first name"
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] placeholder:text-[#A8A29E] outline-none transition-all duration-200",
                  errors.firstName
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
              />
            </FormField>

            <FormField label="Last Name" required error={errors.lastName?.message} index={1}>
              <input
                {...register("lastName")}
                type="text"
                placeholder="Enter your last name"
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] placeholder:text-[#A8A29E] outline-none transition-all duration-200",
                  errors.lastName
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
              />
            </FormField>

            <FormField label="Date of Birth" required error={errors.dateOfBirth?.message} index={2}>
              <input
                {...register("dateOfBirth")}
                type="date"
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200",
                  errors.dateOfBirth
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
              />
            </FormField>

            <FormField label="Age" index={3}>
              <input
                type="text"
                readOnly
                value={calculatedAge !== null ? `${calculatedAge} years` : ""}
                placeholder="Auto-calculated"
                className="w-full rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3.5 text-base text-[#A8A29E] outline-none cursor-not-allowed"
              />
            </FormField>

            <FormField label="Gender" required error={errors.gender?.message} index={4}>
              <select
                {...register("gender")}
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200 appearance-none cursor-pointer",
                  errors.gender
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23A8A29E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">Select gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="State" required error={errors.state?.message} index={5}>
              <select
                {...register("state")}
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200 appearance-none cursor-pointer",
                  errors.state
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23A8A29E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">Select state</option>
                {stateNames.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="LGA" required error={errors.lga?.message} index={6}>
              <select
                {...register("lga")}
                disabled={!watchedState}
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200 appearance-none cursor-pointer",
                  errors.lga
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]",
                  !watchedState && "opacity-60 cursor-not-allowed"
                )}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23A8A29E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">
                  {watchedState ? "Select LGA" : "Select state first"}
                </option>
                {lgaOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Community" index={7}>
              <input
                {...register("community")}
                type="text"
                placeholder="Your community (optional)"
                className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3.5 text-base text-[#292524] placeholder:text-[#A8A29E] outline-none transition-all duration-200 focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
              />
            </FormField>

            <FormField label="Phone Number" required error={errors.phone?.message} index={8}>
              <input
                {...register("phone")}
                type="tel"
                placeholder="e.g. 08012345678"
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] placeholder:text-[#A8A29E] outline-none transition-all duration-200",
                  errors.phone
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
              />
            </FormField>

            <FormField label="Email" index={9}>
              <input
                {...register("email")}
                type="email"
                placeholder="Your email (optional)"
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] placeholder:text-[#A8A29E] outline-none transition-all duration-200",
                  errors.email
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
              />
            </FormField>

            <FormField
              label="Preferred Language"
              required
              error={errors.preferredLanguage?.message}
              index={10}
              className="sm:col-span-2"
            >
              <select
                {...register("preferredLanguage")}
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200 appearance-none cursor-pointer",
                  errors.preferredLanguage
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                    : "border-[#E7E5E4] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                )}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23A8A29E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">Select preferred language</option>
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Social Information (collapsible) */}
          <motion.div
            custom={11}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-6"
          >
            <button
              type="button"
              onClick={() => setShowSocial(!showSocial)}
              className="flex items-center gap-2 text-[#57534E] hover:text-[#1C1917] transition-colors text-sm font-medium py-2"
            >
              Additional Information (Optional)
              {showSocial ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence>
              {showSocial && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                    <FormField label="Employment Status" index={0}>
                      <select
                        {...register("employmentStatus")}
                        className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200 appearance-none cursor-pointer focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23A8A29E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                        }}
                      >
                        <option value="">Select status</option>
                        {employmentStatuses.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Education Level" index={1}>
                      <select
                        {...register("educationLevel")}
                        className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200 appearance-none cursor-pointer focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23A8A29E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                        }}
                      >
                        <option value="">Select level</option>
                        {educationLevels.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Marital Status" index={2}>
                      <select
                        {...register("maritalStatus")}
                        className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3.5 text-base text-[#292524] outline-none transition-all duration-200 appearance-none cursor-pointer focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23A8A29E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                        }}
                      >
                        <option value="">Select status</option>
                        {maritalStatuses.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Household Size" index={3}>
                      <input
                        {...register("householdSize")}
                        type="number"
                        min="1"
                        placeholder="Number of people in household"
                        className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3.5 text-base text-[#292524] placeholder:text-[#A8A29E] outline-none transition-all duration-200 focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
                      />
                    </FormField>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <motion.div
            custom={12}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between mt-8 pt-6 border-t border-[#E7E5E4]"
          >
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-all duration-200 font-medium text-base px-4 py-2.5 rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#DC2626] text-white font-semibold text-base px-6 py-3 rounded-lg hover:bg-[#B91C1C] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98] transition-all duration-250"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
