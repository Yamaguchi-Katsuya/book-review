import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { userName, userIconUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();

  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  };

  return (
    <>
      <h1>Home</h1>
      <p>{userName}</p>
      <img src={userIconUrl} alt="icon" />
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white p-2 rounded-md w-full text-2xl font-bold"
      >
        ログアウト
      </button>
    </>
  );
}

export default Home;
