// Tip tanımlamasını bu şekilde yaptık.
// Kendi apiımızı yazdığımızda ona göre düzenleyeceğiz

// Giriş yapan kullanıcıyı ve token'ı saklayacağız
export type AuthState = {
  id: string | null;
  username: string | null;
  token: string | null; // backend tarafından dönen JWT veya token
  loading: boolean;
  error: string | null;
};

// Login sırasında backend'e gönderilecek bilgiler
export type LoginPayload = {
  email: string;
  password: string;
};

// Backend'ten login sonrası dönecek kullanıcı ve token
export type LoginResponse = {
  id: string;
  username: string;
  token: string;
};

// Register sırasında backend'e gönderilecek bilgiler
export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

// Backend'ten register sonrası dönecek kullanıcı ve token
export type RegisterResponse = {
  id: string;
  username: string;
  email: string;
  token: string;
};

// Form için kullanıcıdan istenen bilgiler
export type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
