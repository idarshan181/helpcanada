import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import MapleLeafIcon from './MapleLeafIcon';

interface CanadianToggleProps {
  canadianOnly: boolean;
  onToggleCanadian: () => void;
}

const CanadianToggle: React.FC<CanadianToggleProps> = ({
  canadianOnly,
  onToggleCanadian,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="canadian-only"
        checked={canadianOnly}
        onCheckedChange={onToggleCanadian}
        className={canadianOnly ? 'bg-canada-red' : ''}
      />
      <Label
        htmlFor="canadian-only"
        className="text-sm text-primary font-medium cursor-pointer flex items-center"
      >
        <MapleLeafIcon className="h-4 w-4 mr-1 text-primary" />
        Canadian Products Only
      </Label>
    </div>
  );
};

export default CanadianToggle;
