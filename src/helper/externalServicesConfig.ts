const TENANT_ID = process.env.MS_TENANT_ID;
const CLIENT_ID = process.env.MS_CLIENT_ID;

export const EXTERNAL_SERVICES = {
  JWKS_PROVIDER_URL: `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`,
  ME_ENDPOINT:
    "https://graph.microsoft.com/v1.0/me?$select=id,department,employeeId,givenName,surName,userPrincipalName,jobTitle",
  ME_MANAGER_ENDPOINT:
    "https://graph.microsoft.com/v1.0/me/manager?$select=id,department,employeeId,givenName,surName,userPrincipalName,jobTitle",
  TOKEN_PROVIDER_URL: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
};