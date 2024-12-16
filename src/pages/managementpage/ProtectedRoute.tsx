import supabase from "@/config/supabaseClient";
import React, { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [dataa, setData] = useState(true);

  useEffect(() => {
    const fetchRoleName = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
                role:role_id ( 
                    name
                )
                `
        )
        .eq("user_id", sessionStorage.getItem("id"))
        .single();

      if (error) {
        console.error("Error fetching role:", error);
        return;
      }

      if (data?.role?.name) {
        setData(data);
        console.log("data find", data);
      }
    };
    fetchRoleName();
  }, []);

  // console.log("data set", data);
  {
    /* <Navigate to="/login" replace /> */
  }
  return <div>{dataa ? <>{children}</> : <>BẠN KHÔNG PHẢI ADMIN</>}</div>;
};
