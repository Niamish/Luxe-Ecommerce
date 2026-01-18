import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import NeuCard from '../components/ui/NeuCard';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
    { id: 'q1', q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all products. If you\'re not satisfied, you can return it for a full refund, no questions asked.' },
    { id: 'q2', q: 'Do you ship internationally?', a: 'Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination and will be calculated at checkout.' },
    { id: 'q3', q: 'How long does shipping take?', a: 'Standard domestic shipping takes 5-7 business days. We also offer an express option (2-3 business days). International shipping times vary.' },
    { id: 'q4', q: 'Do you offer a warranty?', a: 'Absolutely. All of our products come with a 1-year limited warranty that covers manufacturing defects.' },
    { id: 'q5', q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.'}
];

const FAQPage = () => {
  const { t } = useTheme();
  const [openId, setOpenId] = useState(null); // Local state to track the open accordion item

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="text-center mb-16">
        <HelpCircle className="w-16 h-16 mx-auto mb-4" style={{ color: t.accent }} />
        <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl" style={{ color: t.textMuted }}>
          Find answers to common questions about our products and services.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item) => (
          <NeuCard key={item.id} className="overflow-hidden" t={t} hover={false}>
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-6 text-left flex items-center justify-between"
              aria-expanded={openId === item.id}
            >
              <h3 className="font-semibold text-lg pr-4">{item.q}</h3>
              <ChevronDown
                className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                style={{ transform: openId === item.id ? 'rotate(180deg)' : 'rotate(0deg)', color: t.accent }}
              />
            </button>
            {openId === item.id && (
              <div className="px-6 pb-6 animate-fade-in" style={{ color: t.textMuted }}>
                {item.a}
              </div>
            )}
          </NeuCard>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;