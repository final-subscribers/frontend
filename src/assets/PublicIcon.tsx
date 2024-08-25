import { IconFountain, IconFountainFilled } from '@tabler/icons-react';

const PublicIcon = ({ weight = 'default', className = '' }) => {
  switch (weight) {
    case 'bold':
      return <IconFountain stroke={2} className={className} />;
    case 'fill':
      return <IconFountainFilled stroke={2} className={className} />;
    default:
      return <IconFountain stroke={1} className={className} />;
  }
};

export default PublicIcon;
