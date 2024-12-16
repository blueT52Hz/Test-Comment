import supabase from "@/config/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export async function getCategoryById(categoryId: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId);
  if (error) {
    console.error("Error fetching tags:", error);
    return null;
  }
  return { ...data[0] };
}

export async function getCountOfPostByCategoryId(categoryId: string) {
  const { error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" }) // Chọn bất kỳ trường nào (chẳng hạn "id" ở đây)
    .eq("id", categoryId); // Lọc theo categoryId

  if (error) {
    console.error("Error fetching count:", error);
    return null;
  }
  const data = count;
  return data; // Trả về số lượng bản ghi
}

export async function getAllCategoriesFromTo(from, to) {
  const { data, count, error } = await supabase
    .from("categories")
    .select('id, name, description, slug ', { count: "exact" })
    .range(from, to)
    
  if (error) {
    console.error("Error fetching all categories:", error);
    return null;
  }
  if (data) {
    console.log("categories: ", data, "count: ", count)
    return  { data, total: count };
  }
}

export async function getAllCategoriesByContainsFromTo(subString, from, to) {
  // Gọi API lấy dữ liệu từ from đến to và đếm tổng số bản ghi
  const { data, count, error } = await supabase
    .from("categories")
    .select('id, name, description, slug', { count: "exact" }) // Lấy cả dữ liệu và tổng số bản ghi
    .ilike('name', `%${subString}%`) // Điều kiện lọc không phân biệt hoa thường
    .range(from, to); // Lấy các bản ghi từ from đến to

  if (error) {
    console.error("Error fetching categories:", error);
    return { data: null, total: 0 }; // Trả về dữ liệu rỗng và tổng số 0 nếu có lỗi
  }

  // Trả về cả dữ liệu và tổng số bản ghi
  console.log("categories: ", data, "count: ", count)
  return { data, total: count };
}



export async function updateCategory(id, updatedFields) {
  const { data, error } = await supabase
    .from("categories")
    .update(updatedFields)
    .eq("id", id)
    .select()
  if (error) {
    console.error("Error updating category:", error);
    return null;
  }
  if(data){
    console.log("Category updated successfully:", data[0]);
    return data[0];
  }
 
}
export async function addCategory(category) {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select();
  if (error) {
    console.error("Error adding category:", error);
    return null;
  }
  if (data) {
    console.log("Category added successfully:", data[0]);
    return data[0];
  }
}