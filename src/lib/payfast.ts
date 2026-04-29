import crypto from "crypto";

export const PAYFAST_CONFIG = {
  merchantId: process.env.PAYFAST_MERCHANT_ID || "10000100",
  merchantKey: process.env.PAYFAST_MERCHANT_KEY || "46f0cd694581a",
  passphrase: process.env.PAYFAST_PASSPHRASE || "",
  baseUrl:
    // process.env.NODE_ENV === "production"
    //   ? "https://www.payfast.co.za/eng/process"
    //   : "https://sandbox.payfast.co.za/eng/process",
    //   baseUrl:
  process.env.PAYFAST_SANDBOX === "true"
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process",
};

export type PayFastPaymentData = {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first?: string;
  name_last?: string;
  email_address?: string;
  m_payment_id: string;
  amount: string;
  item_name: string;
  item_description?: string;
  subscription_type?: "1" | "2";
  billing_date?: string;
  recurring_amount?: string;
  frequency?: "3" | "4" | "5" | "6";
  cycles?: string;
  signature?: string;
};

// PayFast requires fields in this exact order for signature generation
const FIELD_ORDER: Array<keyof Omit<PayFastPaymentData, "signature">> = [
  "merchant_id",
  "merchant_key",
  "return_url",
  "cancel_url",
  "notify_url",
  "name_first",
  "name_last",
  "email_address",
  "m_payment_id",
  "amount",
  "item_name",
  "item_description",
  "subscription_type",
  "billing_date",
  "recurring_amount",
  "frequency",
  "cycles",
];

function pfEncode(val: string): string {
  return encodeURIComponent(val).replace(/%20/g, "+");
}


export function generateSignature(params: Record<string, string>, passphrase: string): string {
  const { signature, ...rest } = params;
  
  const queryString = Object.entries(rest)
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");

  const stringToHash = passphrase
    ? `${queryString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : queryString;

  return crypto.createHash("md5").update(stringToHash).digest("hex");
}


export function sanitizePayFastString(value: string): string {
  return value
    .replace(/—/g, "-")   // em dash
    .replace(/–/g, "-")   // en dash  
    .replace(/[^\x20-\x7E]/g, "") // strip any non-ASCII
    .trim();
}

export function buildPayFastPayload(
  params: Omit<PayFastPaymentData, "merchant_id" | "merchant_key" | "signature">
): PayFastPaymentData {

  const fullData = {
    merchant_id: PAYFAST_CONFIG.merchantId,
    merchant_key: PAYFAST_CONFIG.merchantKey,
    ...params,
    item_name: sanitizePayFastString(params.item_name),
    ...(params.item_description && {
      item_description: sanitizePayFastString(params.item_description),
    }),
  };

  const signature = generateSignature(fullData, PAYFAST_CONFIG.passphrase);

  return { ...fullData, signature };
}