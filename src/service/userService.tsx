import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getUserList(page: number, searchTerm: string) {
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .range(start, end);

  if (searchTerm) {
    query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Error fetching users");
  }

  return {
    data,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

export async function updateUserStatus(
  userId: string,
  status: "active" | "inactive"
) {
  const { error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", userId);

  if (error) {
    throw new Error("Error updating user status");
  }
}

export async function deleteUser(userId: string) {
  const { error } = await supabase.from("users").delete().eq("id", userId);

  if (error) {
    throw new Error("Error deleting user");
  }
}
