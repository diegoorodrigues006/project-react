import { Disc3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="brand" aria-label="MusicDrop — início" onClick={onClick}>
      <span className="brand-mark"><Disc3 size={19} /></span>
      <span>Music<span>Drop</span><i>♫</i></span>
    </Link>
  );
}
