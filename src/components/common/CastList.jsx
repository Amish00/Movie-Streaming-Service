import { User } from 'lucide-react';
import { imageUrl } from '../../api/client';

export default function CastList({ cast = [] }) {
  const people = cast.filter((p) => p.known_for_department === 'Acting' || p.character).slice(0, 16);
  if (people.length === 0) return null;

  return (
    <div className="rail flex gap-4 overflow-x-auto pb-2">
      {people.map((person) => {
        const photo = imageUrl(person.profile_path, 'w185');
        return (
          <div key={person.credit_id || person.id} className="shrink-0 w-24 sm:w-28 text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-surface ring-1 ring-edge mx-auto">
              {photo ? (
                <img src={photo} alt={person.name} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-faint">
                  <User size={28} />
                </div>
              )}
            </div>
            <p className="mt-2 text-sm font-medium truncate">{person.name}</p>
            <p className="text-xs text-muted truncate font-mono">{person.character}</p>
          </div>
        );
      })}
    </div>
  );
}
