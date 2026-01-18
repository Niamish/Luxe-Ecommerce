import React from 'react';
import { useTheme } from '../../hooks/useTheme';
// import { useNotifications } from '../../hooks/useNotifications';
import NeuCard from '../ui/neucard';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

/**
 * Renders a list of toast notifications in a fixed position on the screen.
 * It gets its state from a dedicated notifications context/hook.
 */
const Notifications = () => {
  const { t } = useTheme();

  // This would come from your actual useNotifications hook
  const { notifications } = {
    notifications: [
        // { id: 1, message: 'Item added to cart!', type: 'success' },
        // { id: 2, message: 'Could not connect.', type: 'error' }
    ] 
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" style={{ color: t.success }} />;
      case 'error':
        return <AlertCircle className="w-5 h-5" style={{ color: t.danger }} />;
      case 'info':
      default:
        return <Info className="w-5 h-5" style={{ color: t.info }} />;
    }
  };
  
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-24 right-6 z-50 space-y-3">
      {notifications.map((notification) => (
        <div key={notification.id} className="animate-slide-in-right">
          <NeuCard className="p-4 flex items-center gap-3 min-w-[300px]" t={t}>
            {getIcon(notification.type)}
            <span style={{ color: t.text }}>{notification.message}</span>
          </NeuCard>
        </div>
      ))}
    </div>
  );
};

export default Notifications;