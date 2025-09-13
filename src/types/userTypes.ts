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
  username: string;
  password: string;
};

// Backend'ten login sonrası dönecek kullanıcı ve token
export type LoginResponse = {
  id: string;
  username: string;
  token: string;
};
