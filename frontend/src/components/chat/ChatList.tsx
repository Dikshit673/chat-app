import { useAppSelector } from '@/app/hooks';
import { Link } from 'react-router';

export default function ChatList() {
  const rooms = useAppSelector((s) => s.chat.rooms);
  return (
    <div>
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            padding: 8,
            borderBottom: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          <Link to={`/chat/${room.id}`}>
            <div style={{ fontWeight: 600 }}>{room.name}</div>
            <div style={{ color: 'var(--muted)' }}>{room.lastMessage}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
