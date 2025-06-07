
import { useState } from "react";
import { Button } from "@/components/ui/button";

export type VersionType = 'A' | 'B' | 'C';

interface VersionSwitcherProps {
  currentVersion: VersionType;
  onVersionChange: (version: VersionType) => void;
}

const VersionSwitcher = ({ currentVersion, onVersionChange }: VersionSwitcherProps) => {
  return (
    <div className="fixed top-20 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border">
      <div className="text-sm font-medium mb-2 text-gray-900">Color Scheme:</div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={currentVersion === 'A' ? 'default' : 'outline'}
          onClick={() => onVersionChange('A')}
          className="text-xs"
        >
          A - Enhanced Blue
        </Button>
        <Button
          size="sm"
          variant={currentVersion === 'B' ? 'default' : 'outline'}
          onClick={() => onVersionChange('B')}
          className="text-xs"
        >
          B - Warm Neutral
        </Button>
        <Button
          size="sm"
          variant={currentVersion === 'C' ? 'default' : 'outline'}
          onClick={() => onVersionChange('C')}
          className="text-xs"
        >
          C - Blue + Green
        </Button>
      </div>
    </div>
  );
};

export default VersionSwitcher;
