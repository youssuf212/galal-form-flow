import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
interface FormData {
  fullName: string;
  youtubeName: string;
  gmail: string;
  suggestions: string;
}
interface FormErrors {
  fullName?: string;
  youtubeName?: string;
  gmail?: string;
  suggestions?: string;
}
const GeometricBackground = () => {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circles */}
      <div className="geometric-shape w-32 h-32 bg-foreground rounded-full top-10 left-10" />
      <div className="geometric-shape delayed-1 w-24 h-24 bg-foreground rounded-full top-1/3 right-20" />
      <div className="geometric-shape delayed-2 w-40 h-40 bg-foreground rounded-full bottom-20 left-1/4" />
      
      {/* Rectangles */}
      <div className="geometric-shape w-16 h-32 bg-foreground top-1/2 right-10 rotate-45" />
      <div className="geometric-shape delayed-1 w-20 h-20 bg-foreground bottom-1/3 right-1/3 rotate-12" />
      
      {/* Triangles using CSS borders */}
      <div className="geometric-shape delayed-2 top-20 right-1/4" style={{
      width: 0,
      height: 0,
      borderLeft: "30px solid transparent",
      borderRight: "30px solid transparent",
      borderBottom: "60px solid hsl(var(--foreground))"
    }} />
      <div className="geometric-shape delayed-3 bottom-10 left-1/3" style={{
      width: 0,
      height: 0,
      borderLeft: "40px solid transparent",
      borderRight: "40px solid transparent",
      borderBottom: "80px solid hsl(var(--foreground))"
    }} />
    </div>;
};
const MembershipForm = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    youtubeName: "",
    gmail: "",
    suggestions: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.youtubeName.trim()) {
      newErrors.youtubeName = "YouTube name is required";
    }
    if (!formData.gmail.trim()) {
      newErrors.gmail = "Gmail address is required";
    } else if (!formData.gmail.endsWith("@gmail.com")) {
      newErrors.gmail = "Please enter a valid @gmail.com address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual webhook URL for n8n
      console.log("Form data to be sent to webhook:", formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Application Submitted Successfully!",
        description: "Welcome to Galal Academy! We'll be in touch soon."
      });

      // Reset form
      setFormData({
        fullName: "",
        youtubeName: "",
        gmail: "",
        suggestions: ""
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen geometric-bg bg-background flex items-center justify-center p-4">
      <GeometricBackground />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Galal Academy</h1>
          <p className="text-muted-foreground text-lg">🎉 Thank you for becoming a Member !</p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="space-y-6">
            {/* Full Name */}
            <div className="form-field">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name *
              </label>
              <input id="fullName" type="text" value={formData.fullName} onChange={e => handleInputChange("fullName", e.target.value)} className="form-input" placeholder="Enter your full name" disabled={isSubmitting} />
              {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
            </div>

            {/* YouTube Name */}
            <div className="form-field">
              <label htmlFor="youtubeName" className="block text-sm font-medium">
                YouTube Channel Name *
              </label>
              <input id="youtubeName" type="text" value={formData.youtubeName} onChange={e => handleInputChange("youtubeName", e.target.value)} className="form-input" placeholder="Your YouTube channel name" disabled={isSubmitting} />
              {errors.youtubeName && <p className="text-destructive text-sm">{errors.youtubeName}</p>}
            </div>

            {/* Gmail */}
            <div className="form-field">
              <label htmlFor="gmail" className="block text-sm font-medium">
                Gmail Address *
              </label>
              <input id="gmail" type="email" value={formData.gmail} onChange={e => handleInputChange("gmail", e.target.value)} className="form-input" placeholder="yourname@gmail.com" disabled={isSubmitting} />
              {errors.gmail && <p className="text-destructive text-sm">{errors.gmail}</p>}
            </div>

            {/* Suggestions */}
            <div className="form-field">
              <label htmlFor="suggestions" className="block text-sm font-medium">
                Suggestions & Comments
              </label>
              <textarea id="suggestions" value={formData.suggestions} onChange={e => handleInputChange("suggestions", e.target.value)} className="form-input min-h-[100px] resize-y" placeholder="Share any suggestions or comments (optional)" disabled={isSubmitting} />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} className="form-button">
              {isSubmitting ? "Submitting..." : "Join Galal Academy"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By submitting this form, you agree to join our learning community
            </p>
          </div>
        </form>
      </div>
    </div>;
};
export default MembershipForm;