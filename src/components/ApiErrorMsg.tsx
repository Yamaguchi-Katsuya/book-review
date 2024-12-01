import { ApiError } from '@/types/error';

type ApiErrorMsgProps = {
  error: ApiError | null;
};

function ApiErrorMsg({ error }: ApiErrorMsgProps) {
  if (!error) return null;

  return (
    <>
      <p className="text-red-500 text-center mb-4">
        コード：{error.errorCode} メッセージ：{error.errorMessageJP}
      </p>
    </>
  );
}

export default ApiErrorMsg;
