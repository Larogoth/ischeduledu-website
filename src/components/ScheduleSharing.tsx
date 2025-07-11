
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Check, Smartphone, QrCode } from 'lucide-react';
import { generateShareableUrl, ShareableScheduleData } from '@/utils/scheduleSharing';
import { useToast } from '@/hooks/use-toast';

interface ScheduleSharingProps {
  scheduleData: ShareableScheduleData;
  trigger?: React.ReactNode;
}

const ScheduleSharing: React.FC<ScheduleSharingProps> = ({ 
  scheduleData, 
  trigger 
}) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const { toast } = useToast();

  const handleGenerateLink = () => {
    try {
      const url = generateShareableUrl(scheduleData);
      setShareUrl(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate share link",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${scheduleData.name} - iSchedulEDU`,
          text: `Check out this schedule: ${scheduleData.name}`,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Native sharing cancelled or failed');
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Schedule
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Schedule
          </DialogTitle>
          <DialogDescription>
            Generate a link to share "{scheduleData.name}" with others
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Schedule Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">{scheduleData.name}</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary">{scheduleData.type}</Badge>
              <Badge variant="outline">{scheduleData.periods} periods</Badge>
            </div>
            <p className="text-sm text-gray-600">
              {scheduleData.startTime} - {scheduleData.endTime}
            </p>
          </div>

          {/* Generate Link */}
          {!shareUrl ? (
            <Button onClick={handleGenerateLink} className="w-full">
              Generate Share Link
            </Button>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="share-url">Share Link</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="share-url"
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Share Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={handleNativeShare}
                  className="flex-1 flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>How it works:</strong> Recipients can open this link on their mobile device to import the schedule directly into their iSchedulEDU app, or download the app if they don't have it yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleSharing;
