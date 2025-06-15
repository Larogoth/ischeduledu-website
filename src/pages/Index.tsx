
import { useVersion } from '@/context/VersionContext';
import IndexA from './IndexA';
import IndexB from './IndexB';
import IndexC from './IndexC';

const Index = () => {
  const { version } = useVersion();

  if (version === 'b') {
    return <IndexB />;
  }
  if (version === 'c') {
    return <IndexC />;
  }
  return <IndexA />;
};

export default Index;
