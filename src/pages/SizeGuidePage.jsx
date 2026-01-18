import React from 'react';
import { useTheme } from '../hooks/useTheme';
import NeuCard from '../components/ui/NeuCard';
import { Ruler, Shirt, Watch, Headphones, Smartphone, Info } from 'lucide-react';

const SizeGuidePage = () => {
  const { t } = useTheme();

  const sizeCategories = [
    {
      icon: Shirt,
      title: 'Clothing & Apparel',
      description: 'Find your perfect fit for clothing items',
      sizes: [
        { size: 'XS', chest: '30-32"', waist: '26-28"', hip: '32-34"' },
        { size: 'S', chest: '34-36"', waist: '29-31"', hip: '35-37"' },
        { size: 'M', chest: '38-40"', waist: '32-34"', hip: '38-40"' },
        { size: 'L', chest: '42-44"', waist: '35-37"', hip: '41-43"' },
        { size: 'XL', chest: '46-48"', waist: '38-40"', hip: '44-46"' },
        { size: '2XL', chest: '50-52"', waist: '41-43"', hip: '47-49"' },
      ]
    },
    {
      icon: Watch,
      title: 'Watches & Bands',
      description: 'Measure your wrist for the perfect fit',
      sizes: [
        { size: 'Small', wrist: '5.5-6.5"', band: '130-150mm' },
        { size: 'Medium', wrist: '6.5-7.5"', band: '140-170mm' },
        { size: 'Large', wrist: '7.5-8.5"', band: '160-190mm' },
      ]
    },
    {
      icon: Headphones,
      title: 'Audio Accessories',
      description: 'Comfort and fit specifications',
      sizes: [
        { size: 'On-Ear', head: '21-23"', weight: '200-300g' },
        { size: 'Over-Ear', head: '22-24"', weight: '300-450g' },
        { size: 'In-Ear', canal: 'Universal', weight: '5-15g' },
      ]
    },
    {
      icon: Smartphone,
      title: 'Phone Cases',
      description: 'Device compatibility and protection',
      sizes: [
        { size: 'Compact', screen: '4.7-5.4"', thickness: '7-9mm' },
        { size: 'Standard', screen: '6.1-6.7"', thickness: '8-10mm' },
        { size: 'Pro Max', screen: '6.7-7.0"', thickness: '9-11mm' },
      ]
    }
  ];

  const measurementTips = [
    {
      icon: Ruler,
      title: 'How to Measure',
      tips: [
        'Use a soft measuring tape for best results',
        'Take measurements over light clothing',
        'Keep tape snug but not tight',
        'Measure at the fullest part of each area'
      ]
    },
    {
      icon: Info,
      title: 'Sizing Notes',
      tips: [
        'Sizes may vary slightly between brands',
        'When in doubt, size up for comfort',
        'Check specific product descriptions for variations',
        'Contact us for personalized sizing help'
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.bg }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: t.text }}>
            Size Guide
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: t.textMuted }}>
            Find your perfect fit with our comprehensive sizing guide. Accurate measurements ensure the best experience with your LUXE products.
          </p>
        </div>

        {/* Size Categories */}
        <div className="grid gap-8 mb-12">
          {sizeCategories.map((category, index) => (
            <NeuCard key={index} className="p-6 sm:p-8" t={t}>
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: t.accent, color: 'white' }}
                >
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: t.text }}>
                    {category.title}
                  </h2>
                  <p className="text-sm" style={{ color: t.textMuted }}>
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Size Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: t.border }}>
                      <th className="text-left py-3 px-2 font-semibold" style={{ color: t.text }}>
                        Size
                      </th>
                      {Object.keys(category.sizes[0]).filter(key => key !== 'size').map((key) => (
                        <th key={key} className="text-left py-3 px-2 font-semibold capitalize" style={{ color: t.text }}>
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {category.sizes.map((sizeInfo, idx) => (
                      <tr key={idx} className="border-b" style={{ borderColor: t.border }}>
                        <td className="py-3 px-2 font-medium" style={{ color: t.accent }}>
                          {sizeInfo.size}
                        </td>
                        {Object.entries(sizeInfo).filter(([key]) => key !== 'size').map(([key, value]) => (
                          <td key={key} className="py-3 px-2" style={{ color: t.textMuted }}>
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </NeuCard>
          ))}
        </div>

        {/* Measurement Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          {measurementTips.map((tip, index) => (
            <NeuCard key={index} className="p-6" t={t}>
              <div className="flex items-center gap-3 mb-4">
                <tip.icon className="w-5 h-5" style={{ color: t.accent }} />
                <h3 className="font-bold" style={{ color: t.text }}>
                  {tip.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {tip.tips.map((tipText, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: t.accent }}
                    />
                    <span className="text-sm" style={{ color: t.textMuted }}>
                      {tipText}
                    </span>
                  </li>
                ))}
              </ul>
            </NeuCard>
          ))}
        </div>

        {/* Contact Section */}
        <NeuCard className="p-6 sm:p-8 mt-8 text-center" t={t}>
          <h3 className="text-xl font-bold mb-3" style={{ color: t.text }}>
            Still Need Help?
          </h3>
          <p className="mb-4" style={{ color: t.textMuted }}>
            Our sizing experts are here to help you find the perfect fit.
          </p>
          <button 
            className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{ 
              backgroundColor: t.accent, 
              color: 'white',
              boxShadow: t.shadowOutSmall 
            }}
          >
            Contact Sizing Support
          </button>
        </NeuCard>
      </div>
    </div>
  );
};

export default SizeGuidePage;