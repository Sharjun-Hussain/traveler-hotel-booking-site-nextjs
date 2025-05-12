// Mock API functions
export async function verifyEmail(email){
  console.log(`Verification email sent to ${email}`);
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
}

export async function verifyCode(email, code){
  console.log(`Verifying code ${code} for ${email}`);
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
}