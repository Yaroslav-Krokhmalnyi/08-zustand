// app/notes/filter/[...slug]/error.tsx

'use client';

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <div>
      <h2>Помилка при завантаженні</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;