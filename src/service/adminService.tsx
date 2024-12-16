import supabase from "@/config/supabaseClient";

// Lấy ra dữ liệu tất cả người dùng:
// Phần tóm tắt bên ngoài: Lấy ra tất cả ng dùng trong Profiles: Role, Name, Role Name (Lấy từ bảng Role ID)
// Sau khi ấn vào 1 người dùng => Từ Profile lấy ra người dùng
export const getAllProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles") //Lấy data từ bảng smoothies
      .select(); //Lấy smt, ko để j là lấy hết (nó giống SELECT trong SQL)
    if (error) {
      console.log("Error:", error);
    }
    if (data) {
      console.log("User Name: ", data);
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const getRolebyID = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
        role:role_id ( 
            name
        )
        `
    )
    .eq("user_id", id)
    .single();

  if (error) {
    console.error("Error fetching role:", error);
    return "error";
  }

  if (data?.role?.name) {
    console.log("data:", id, data);
    return data.role.name;
  }
};
