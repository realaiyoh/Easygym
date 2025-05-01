import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';

const Profile = observer(() => {
  const { auth } = useStore();

  return (
    <div className="flex flex-col items-center justify-center h-screen-content text-2xl">
      {auth.user?.name && <p>Name: {auth.user?.name}</p>}
      {auth.user?.email && <p>Email: {auth.user?.email}</p>}
      {auth.user?.role && <p>Role: {auth.user?.role}</p>}
    </div>
  );
});

export default Profile;
