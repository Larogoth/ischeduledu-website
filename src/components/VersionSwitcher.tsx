
import { useVersion } from '@/context/VersionContext';
import { Button } from '@/components/ui/button';

const VersionSwitcher = () => {
  const { version, setVersion } = useVersion();

  return (
    <div className="fixed bottom-4 right-4 z-[100] bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">Version:</span>
        <Button
          size="sm"
          variant={version === 'a' ? 'default' : 'outline'}
          onClick={() => setVersion('a')}
        >
          A
        </Button>
        <Button
          size="sm"
          variant={version === 'b' ? 'default' : 'outline'}
          onClick={() => setVersion('b')}
        >
          B
        </Button>
      </div>
    </div>
  );
};

export default VersionSwitcher;
