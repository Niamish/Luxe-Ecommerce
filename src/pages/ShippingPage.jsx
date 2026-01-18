import React from 'react';
import { useTheme } from '../hooks/useTheme';
import NeuCard from '../components/ui/NeuCard';
import { Truck, Zap, Globe, Clock, Package, CheckCircle } from 'lucide-react';

const ShippingPage = () => {
  const { t } = useTheme();

  const domesticOptions = [
    {
      icon: Truck,
      title: 'Standard Shipping',
      time: '5-7 business days',
      cost: 'FREE on orders over $100',
      detail: '$9.99 for orders under $100.',
    },
    {
      icon: Zap,
      title: 'Express Shipping',
      time: '2-3 business days',
      cost: '$19.99 flat rate',
      detail: 'Order by 2 PM PST for same-day processing.',
    },
  ];

  const processSteps = [
    { icon: Package, title: 'Order Confirmed', description: 'You\'ll receive an order confirmation email immediately.' },
    { icon: Clock, title: 'Processing', description: 'Your order will be processed within 1-2 business days.' },
    { icon: CheckCircle, title: 'Shipped', description: 'We\'ll email you tracking information once dispatched.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24 animate-fade-in">
      <div className="text-center mb-16">
        <Truck className="w-16 h-16 mx-auto mb-4" style={{ color: t.accent }} />
        <h1 className="text-5xl font-bold mb-4">Shipping Information</h1>
        <p className="text-xl" style={{ color: t.textMuted }}>
          Everything you need to know about our shipping policies.
        </p>
      </div>

      {/* Domestic Shipping Options */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Domestic Shipping</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {domesticOptions.map((option) => (
            <NeuCard key={option.title} className="p-8" t={t}>
              <div className="flex items-start gap-4 mb-4">
                <option.icon className="w-8 h-8 flex-shrink-0" style={{ color: t.accent }} />
                <div>
                  <h3 className="text-xl font-bold">{option.title}</h3>
                  <p className="font-semibold" style={{ color: t.textMuted }}>{option.time}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">{option.cost}</p>
              <p style={{ color: t.textMuted }}>{option.detail}</p>
            </NeuCard>
          ))}
        </div>
      </section>

      {/* Order Processing */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Order Processing</h2>
         <div className="grid md:grid-cols-3 gap-6">
            {processSteps.map((step) => (
                <NeuCard key={step.title} className="p-6 text-center" t={t}>
                    <step.icon className="w-12 h-12 mx-auto mb-4" style={{ color: t.accent }} />
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm" style={{ color: t.textMuted }}>{step.description}</p>
                </NeuCard>
            ))}
        </div>
      </section>

      {/* International Shipping */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">International Shipping</h2>
        <NeuCard className="p-8" t={t}>
          <div className="flex items-start gap-4">
            <Globe className="w-12 h-12 flex-shrink-0" style={{ color: t.info }} />
            <div>
              <h3 className="text-xl font-bold">We Ship Worldwide</h3>
              <p className="mt-2" style={{ color: t.textMuted }}>
                We are proud to offer shipping to over 50 countries. International shipping rates and times are calculated at checkout based on your location. Please note that customers are responsible for any customs fees, import duties, or taxes that may be imposed by their country's authorities.
              </p>
            </div>
          </div>
        </NeuCard>
      </section>
    </div>
  );
};

export default ShippingPage;