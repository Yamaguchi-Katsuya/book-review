import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  // 5秒後にリダイレクト
  setTimeout(() => {
    navigate('/');
  }, 5000);

  return (
    <>
      <h1>NotFound</h1>
    </>
  );
}

export default NotFound;
