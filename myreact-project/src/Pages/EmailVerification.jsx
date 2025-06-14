import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../api/userApi";

const EmailVerification = () => {
  const { token } = useParams();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //connect to backend
    verifyEmail(token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(data.message);
      }
    });
  }, []);
  return (
    <>
      {success && (
        <div className="p-40 text-2xl text-center font-bold">{success}</div>
      )}

      {error && (
        <div className="p-40 text-2xl text-center font-bold">{error}</div>
      )}
    </>
  );
};

export default EmailVerification;
