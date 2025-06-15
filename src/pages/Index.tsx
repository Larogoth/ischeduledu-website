
import { useVersion } from '@/context/VersionContext';
import IndexA from './IndexA';
import IndexB from './IndexB';

const Index = () => {
  const { version } = useVersion();

  if (version === 'b') {
    return <IndexB />;
  }
  
  return <IndexA />;
};

export default Index;
