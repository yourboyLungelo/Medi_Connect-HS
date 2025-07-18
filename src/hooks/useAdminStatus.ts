import { useState, useEffect } from "react";

const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminName = localStorage.getItem("adminName");
    setIsAdmin(!!adminName);
  }, []);

  return isAdmin;
};

export default useAdminStatus;
