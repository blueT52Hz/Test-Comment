import supabase from "@/config/supabaseClient";

export const getUserNameByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("users") //Lấy data từ bảng smoothies
    .select() //Lấy smt, ko để j là lấy hết (nó giống SELECT trong SQL)
    .eq("email", email);
  if (error) {
    console.log("Error:", error);
  }
  if (data) {
    console.log("User Name: ", data);
    return data;
  }
};

export const createUser = async (user: object) => {
  console.log(user);

  // const [data, error] = await supabase
  //     .from("users")
  //     .insert([{name, email, password, role_id}])
  //     .select()
  //     if(error){
  //         console.log("Error:", error);
  //     }
  //     if(data){
  //         console.log("Add new user: ", data);
  //         return data
  //     }
};
