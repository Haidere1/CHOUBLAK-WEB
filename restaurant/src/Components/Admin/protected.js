import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Backend/Firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Protected(props) {
  const { Component } = props;
  const [admin, setAdmin] = useState(null); // Correctly initialize state
  const navigate = useNavigate();

  useEffect(() => {
    const validateAdmin = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const adminEmail = "syedfizanhaider.fh@gmail.com";
          if (user.email === adminEmail) {
            setAdmin(true);
            console.log("Admin logged in:", user);
          } else {
            setAdmin(false);
            navigate('/admin/login'); // Redirect if not admin
          }
        } else {
          setAdmin(false);
          navigate('/admin/login'); // Redirect if no user is logged in
        }
      });
    };

    validateAdmin(); // Call the function inside useEffect
  }, [navigate]); // Adding `navigate` as a dependency to prevent unnecessary re-renders

  // Render null until the admin state is determined
  if (admin === null) {
    return null; // You can show a loading spinner here if you want
  }

  return (
    <Component />
  );
}
