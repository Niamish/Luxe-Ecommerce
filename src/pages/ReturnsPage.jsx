import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import NeuCard from '../components/ui/NeuCard';
import NeuButton from '../components/ui/NeuButton';
import { RefreshCw, CheckCircle, XCircle, Mail } from 'lucide-react';

const ReturnsPage = () => {
  const { t } = useTheme();
  const navigate = useNavigate();

  const returnSteps = [
    { title: 'Initiate Return', description: 'Log into your account and select the item(s) you wish to return from your order history.' },
    { title: 'Print Label', description: 'Download and print the prepaid return shipping label we\'ll provide.' },
    { title: 'Pack Securely', description: 'Pack items in original packaging with all accessories and documentation.' },
    { title: 'Ship It Back', description: 'Drop the package off at any authorized shipping location.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="text-center mb-16">
        <RefreshCw className="w-16 h-16 mx-auto mb-4" style={{ color: t.accent }} />
        <h1 className="text-5xl font-bold mb-4">Returns & Exchanges</h1>
        <p className="text-xl" style={{ color: t.textMuted }}>
          Our hassle-free policy ensures your complete satisfaction.
        </p>
      </div>

      {/* 30-Day Guarantee */}
      <section className="mb-16">
        <NeuCard className="p-8 text-center" t={t}>
            <h2 className="text-3xl font-bold mb-4">30-Day Money-Back Guarantee</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: t.textMuted }}>
                Not completely satisfied? Return any unused item in its original condition within 30 days of delivery for a full refund or exchange. No questions asked.
            </p>
        </NeuCard>
      </section>
      
      {/* How to Return */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">How to Make a Return</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
                <NeuCard key={step.title} className="p-6" t={t}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold text-lg" style={{backgroundColor: t.accent, color: 'white'}}>
                        {index + 1}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm" style={{color: t.textMuted}}>{step.description}</p>
                </NeuCard>
            ))}
        </div>
      </section>

      {/* Return Conditions */}
       <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Return Conditions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <NeuCard className="p-8" t={t}>
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: t.success }}>
              <CheckCircle /> Eligible for Return
            </h3>
            <ul className="list-disc list-inside space-y-2" style={{color: t.textMuted}}>
              <li>Items that are unused and in original condition.</li>
              <li>Original packaging, tags, and accessories included.</li>
              <li>Returns initiated within 30 days of delivery.</li>
            </ul>
          </NeuCard>
          <NeuCard className="p-8" t={t}>
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: t.danger }}>
              <XCircle /> Not Eligible for Return
            </h3>
             <ul className="list-disc list-inside space-y-2" style={{color: t.textMuted}}>
              <li>Items marked as "Final Sale".</li>
              <li>Products that have been used, altered, or damaged.</li>
              <li>Returns without original packaging.</li>
            </ul>
          </NeuCard>
        </div>
      </section>

      {/* Contact for help */}
      <section>
        <NeuCard className="p-12 text-center" t={t}>
            <h2 className="text-3xl font-bold mb-4">Need Help with a Return?</h2>
            <p className="mb-8 text-lg" style={{ color: t.textMuted }}>Our friendly customer service team is here to assist you.</p>
            <NeuButton size="lg" onClick={() => navigate('/contact')} t={t}>
                <Mail className="w-5 h-5 mr-2" /> Contact Support
            </NeuButton>
        </NeuCard>
      </section>
    </div>
  );
};

export default ReturnsPage;