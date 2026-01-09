export function validateKYC(data: any) {
  if (data.nin && data.nin.length !== 11) return false;
  if (data.bvn && data.bvn.length !== 11) return false;
  return true;
}
