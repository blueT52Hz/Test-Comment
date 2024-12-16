import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://egonznxcjialnzpkhpdg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnb256bnhjamlhbG56cGtocGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NjUxMjgsImV4cCI6MjA0NTI0MTEyOH0.mDmAAoOxCPF4UFef3u5s9kM4Uy3ja4NlYVslV5rTQXU'
export const supabase = createClient(supabaseUrl, supabaseKey)
// console.log(supabase);

// Tạo user mới
async function signUpUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error('Lỗi khi tạo user:', error.message);
    } else {
      console.log('User mới đã được tạo:', data);
    }
}

  // Hàm đăng nhập
async function signInUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error('Lỗi đăng nhập:', error.message);
      return null;
    } else {
      console.log('Đăng nhập thành công:', data);
      return data;
    }
}

async function getAllUsers() {
    const { data, error } = await supabase
      .from('auth.users')
      .select('*');
  
    if (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error.message);
      return;
    }
  
    console.log('Danh sách người dùng:', data);
}
  
// signInUser('lionel32204@gmail.com', 'tper2811');

// getAllUsers()
