// import { ClientSecretCredential } from '@azure/identity';
// import { Client } from '@microsoft/microsoft-graph-client';

// const SSOService = async (MSaccessToken: string) => {
//     const tenantId = '5b751804-232f-410d-bb2f-714e3bb466eb';
//     const clientId = 'a5dead32-ad2f-4bae-bb40-d7b1b0ef66bc';
//     const clientSecret = '5Bn8Q~XXq.4UIUvRHfKXwByfpqBicOqtkU2NPcz5';

//     // Create an instance of ClientSecretCredential
//     const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

//     // Fetch access token using the credential with delegated permissions
//     const tokenResponse = await credential.getToken('https://graph.microsoft.com/.default');

//     if (tokenResponse?.token) {
//         // Create a Graph client instance with the access token
//         const client = Client.initWithMiddleware({
//             authProvider: {
//                 getAccessToken: async () => {
//                     return tokenResponse.token;
//                 }
//             }
//         });

//         try {
//             // Fetch user details using the Graph client
//             const userDetails = await client.api('/me').get();
//             console.log('User details:', userDetails);
//             return {
//                 success: true,
//                 userDetails: userDetails
//             };
//         } catch (error) {
//             console.error('Error fetching user details:', error);
//             throw error;
//         }
//     } else {
//         throw new Error('Failed to obtain access token.');
//     }
// };

// export default SSOService;
