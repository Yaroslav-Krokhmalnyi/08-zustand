"use client";

// Types
type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <p>Could not fetch note details. {error.message}</p>
  );
}

export default Error;
