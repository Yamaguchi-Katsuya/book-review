import { getUser } from "@/api/user";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await getUser(token); // 非同期処理を解決
          if ("errorCode" in response) {
            // ApiError の場合
            setError(response.errorMessageJP || "ユーザー情報の取得に失敗しました");
            navigate("/login");
          } else {
            // User の場合
            setUser(response as User);
          }
        } catch (err) {
          console.error("ユーザー取得中にエラーが発生しました:", err);
          setError("予期しないエラーが発生しました");
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <>
      <h1>Home</h1>
      {user && <p>{user.name}</p>}
      {user && <img src={user.iconUrl} alt="icon" />}
      {error && <p>{error}</p>}
    </>
  )
}

export default Home
