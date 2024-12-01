import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

function Home() {
  const push = useNavigate();
  const { userAuth } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 md:gap-4 lg:gap-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          書籍レビュー
        </h2>
        <p className="text-lg mt-4 text-center">
          書籍レビューは、書籍の感想を共有するサービスです。
          <br />
          あなたの書籍レビューを共有して、他の人と交流しましょう。
        </p>
        {userAuth ? (
          <button
            onClick={() => push('/reviews')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-md lg:text-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 transition-colors duration-300"
          >
            みんなのレビューを見に行く
          </button>
        ) : (
          <section className="mt-8 flex gap-4">
            <button
              onClick={() => push('/login')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-md lg:text-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 transition-colors duration-300"
            >
              ログインする
            </button>
            <button
              onClick={() => push('/signup')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-md lg:text-lg hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 transition-colors duration-300"
            >
              サインアップする
            </button>
          </section>
        )}
      </div>
    </>
  );
}

export default Home;
