import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const { userAuth, user, logout } = useContext(AuthContext);
  const push = useNavigate();

  return (
    <>
      <header className="bg-blue-500 text-white text-2xl font-bold grid grid-cols-1 md:grid-cols-2 justify-between items-center px-10 py-3">
        <h1 className="col-span-1 text-xl md:text-2xl lg:text-3xl text-center md:text-left">
          <Link to="/">Book Review</Link>
        </h1>
        <div className="grid grid-cols-10">
          <div className="col-span-0 lg:col-span-5"></div>
          <div className="col-span-10 lg:col-span-5 flex justify-end flex-col md:flex-row items-center gap-3">
            {userAuth ? (
              <p className="col-span-3 text-center md:text-left">
                こんにちわ、{user.name}さん
              </p>
            ) : (
              <button
                className="col-span-2 text-blue-500 bg-white border border-white rounded-md text-sm md:text-md lg:text-lg p-2 md:p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                onClick={() => push('/login')}
              >
                Login
              </button>
            )}
            {userAuth && (
              <button
                className="col-span-2 text-blue-500 bg-white border border-white rounded-md text-sm md:text-md lg:text-lg p-2 md:p-3 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                onClick={() => logout()}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
