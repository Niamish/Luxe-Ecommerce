import React from 'react';
import { useTheme } from '../hooks/useTheme';
import NeuCard from '../components/ui/NeuCard';
import NeuButton from '../components/ui/NeuButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

// Define the validation schema for the form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactPage = () => {
  const { t } = useTheme();
  // In a real app, a notification hook would be used here
  // const { addNotification } = useNotifications(); 

  const contactInfo = [
    { icon: Phone, title: 'Phone', info: '+1 (800) 123-4567', detail: 'Mon-Fri 9am-6pm PST' },
    { icon: Mail, title: 'Email', info: 'support@luxe.com', detail: 'We reply within 24 hours' },
    { icon: MapPin, title: 'Office', info: '123 Tech Street, San Francisco, CA', detail: 'By appointment only' },
  ];

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form data submitted:', data);
    // addNotification('Message sent successfully!', 'success');
    reset(); // Clear the form after successful submission
  };

  const Input = ({ name, placeholder, ...props }) => (
     <div className="w-full">
        <input
            {...register(name)}
            placeholder={placeholder}
            className="p-3 rounded-lg w-full outline-none transition-all duration-300 focus:ring-2 focus:ring-offset-2 hover:scale-[1.02]"
            style={{ backgroundColor: t.bg, boxShadow: t.shadowIn, color: t.text, focusRingColor: t.accent }}
            {...props}
        />
        {errors[name] && <p className="text-sm mt-1 animate-fade-in" style={{color: t.danger}}>{errors[name].message}</p>}
     </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 sm:py-24">
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-5xl lg:text-6xl font-bold mb-4 gradient-premium bg-clip-text text-transparent animate-text-shimmer">Get in Touch</h1>
        <p className="text-xl glass-premium p-4 rounded-2xl inline-block animate-fade-in" style={{ color: t.textMuted, animationDelay: '0.2s' }}>
          We're here to help and answer any question you might have.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Info Section */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((item) => (
            <NeuCard key={item.title} className="p-6 flex items-start gap-4 hover-3d transform-3d transition-all duration-500 animate-fade-in-up shadow-premium" t={t} style={{ animationDelay: `${contactInfo.indexOf(item) * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: t.bg, boxShadow: t.shadowIn }}>
                <item.icon className="w-6 h-6" style={{ color: t.accent }} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="mb-1" style={{ color: t.accent }}>{item.info}</p>
                <p className="text-sm" style={{ color: t.textMuted }}>{item.detail}</p>
              </div>
            </NeuCard>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="lg:col-span-2">
          <NeuCard className="p-8" t={t}>
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <Input name="name" placeholder="Your Name" />
                 <Input name="email" placeholder="Email Address" type="email" />
              </div>
              <Input name="subject" placeholder="Subject" />
              <div>
                <textarea
                    {...register('message')}
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="p-3 rounded-lg w-full outline-none resize-none"
                    style={{ backgroundColor: t.bg, boxShadow: t.shadowIn, color: t.text }}
                />
                {errors.message && <p className="text-sm mt-1" style={{color: t.danger}}>{errors.message.message}</p>}
              </div>
              <NeuButton type="submit" variant="primary" size="lg" className="w-full" loading={isSubmitting} disabled={isSubmitting} t={t}>
                <Send className="w-5 h-5 mr-2" /> Send Message
              </NeuButton>
            </form>
          </NeuCard>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;