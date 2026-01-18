import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import NeuCard from '../components/ui/NeuCard';
import NeuButton from '../components/ui/NeuButton';
import { Target, Users, Globe, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTheme();
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'Alex Chen', role: 'CEO & Founder', emoji: '🧑‍💻' },
    { name: 'Sarah Johnson', role: 'Head of Design', emoji: '👩‍🎨' },
    { name: 'Mike Wilson', role: 'Tech Director', emoji: '👨‍🚀' },
    { name: 'Emily Davis', role: 'Customer Success', emoji: '👩‍💼' },
  ];

  const values = [
    { icon: Target, title: 'Quality Obsessed', description: 'We never compromise on quality. Every product is tested to perfection.' },
    { icon: Users, title: 'Customer First', description: 'Your satisfaction is our priority. We\'re here to support you 24/7.' },
    { icon: Globe, title: 'Sustainable Future', description: 'We\'re committed to reducing our environmental impact at every step.' },
  ];

  return (
    <div className="py-16 sm:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-luxury bg-clip-text text-transparent animate-glow-pulse">About LUXE</h1>
          <p className="text-xl max-w-3xl mx-auto glass-premium p-6 rounded-3xl animate-fade-in" style={{ color: t.textMuted, animationDelay: '0.2s' }}>
            We're on a mission to redefine the premium tech experience with products that blend innovation, elegance, and exceptional quality.
          </p>
        </section>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4 text-lg" style={{ color: t.textMuted }}>
                Founded in 2024, LUXE began with a simple vision: to curate the world's finest technology accessories for discerning customers who demand excellence.
              </p>
              <p className="text-lg" style={{ color: t.textMuted }}>
                What started as a small team of tech enthusiasts has grown into a global brand, committed to our core values of quality, innovation, and exceptional customer service.
              </p>
            </div>
            <NeuCard className="p-12 text-center transform hover:scale-105 transition-all duration-500 hover-3d shadow-luxury animate-fade-in-up" t={t} style={{ animationDelay: '0.3s' }}>
              <div className="text-8xl mb-6 animate-float-up-down">🚀</div>
              <h3 className="text-2xl font-bold gradient-premium bg-clip-text text-transparent">Innovation First</h3>
            </NeuCard>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <NeuCard key={i} className="p-8 text-center" t={t}>
                <value.icon className="w-12 h-12 mx-auto mb-4" style={{ color: t.accent }} />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p style={{ color: t.textMuted }}>{value.description}</p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <NeuCard key={i} className="p-6 text-center transform hover:scale-105 transition-all" t={t}>
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="font-semibold">{member.name}</h3>
                <p style={{ color: t.textMuted }}>{member.role}</p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <NeuCard className="p-12" t={t}>
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="mb-8 text-lg" style={{ color: t.textMuted }}>
              Experience the LUXE difference today.
            </p>
            <NeuButton variant="primary" size="lg" onClick={() => navigate('/shop')} t={t}>
              Shop Now <ArrowRight className="w-5 h-5 inline ml-2" />
            </NeuButton>
          </NeuCard>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;