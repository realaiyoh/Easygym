import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const Profile = observer(() => {
  const { auth } = useStore();

  const [name, setName] = useState(auth.user?.name || '');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [viewMode, setViewMode]=useState(true);
 

  return (
    <div
      className="
        max-w-4xl mx-auto mt-10 p-10 rounded-2xl shadow-lg
        bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100

        dark:bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600
        flex flex-col md:flex-row gap-10
        min-h-[520px] 
      "
    >
      {/* Lijeva strana - avatar i role */}
      <div className="flex flex-col items-center w-full md:w-1/3">
        <div className="w-45 h-45 rounded-full bg-gray-300 dark:bg-gray-200 overflow-hidden shadow-lg">
          <img
            
            className="object-cover w-full h-full"
          />
        </div>
          <button
      type="button"
        className="
            mt-6
            px-4 py-2
            bg-blue-700 text-white
            dark:bg-blue-700 dark:text-white
            rounded-md
            hover:bg-gray-600 dark:hover:bg-gray-400
            transition-colors duration-300
            font-semibold
            shadow-md"
          >       
          Edit Picture
         </button>
        {auth.user?.role && (
          <span
            className="
              mt-7 px-4 py-1 rounded-full text-sm font-semibold
              bg-blue-200 text-blue-800
              dark:bg-blue-600 dark:text-blue-100
            "
          >
            {auth.user.role}
          </span>
        )}
      </div>

      {/* Desna strana - forma */}
     
<div className="w-full md:w-2/3">
  <h2 className="text-3xl font-bold mb-6 text-white">
    {viewMode ? 'View Profile' : 'Edit Profile'}
  </h2>

  {viewMode ? (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">Name</label>
        <p className="bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg border border-gray-600 dark:border-gray-300">
          {name}
        </p>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">Email</label>
        <p className="bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg border border-gray-600 dark:border-gray-300">
          {email}
        </p>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">Bio</label>
        <p className="bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg border border-gray-600 dark:border-gray-300 whitespace-pre-wrap break-words">
          {bio}
        </p>
      </div>

      <Button
        onClick={() => setViewMode(false)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
      >
        Edit Profile
      </Button>
    </div>
  ) : (
    <form
      className="space-y-6"
       onSubmit={(e) => {
       e.preventDefault();

        if (password !== confirmPassword) {
             alert('Passwords do not match!');
            return;
          }
        setViewMode(true);
  }}
    >
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">
          Name
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white-700">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Your bio"
          className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2 whitespace-pre-wrap break-words overflow-auto"
        />
      </div>

      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
      >
        Save Changes
      </Button>
    </form>
  )}
</div>

    </div>
  );
});

export default Profile;
