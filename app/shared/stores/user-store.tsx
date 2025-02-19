// import { create } from 'zustand';
// import { z } from 'zod';

//TODO: Implement if needed - delete if not needed;

// const loginWithEmailSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
// });

// const getUser = async (token: string) => {
//   try {
//     //get appkey and id for headers
//     const appKey = env.VITE_BACKEND_API_KEY;
//     const appId = env.VITE_APP_ID;

//     //if any of the required info is missing, return null
//     if (!token || !appKey || !appId) return null;

//     const response = await fetch(`${appConfig.backendUrl}/auth/login`, {
//       headers: {
//         'X-App-Key': appKey,
//         'X-App-Id': appId,
//         Authorization: `Bearer ${token}`,
//       },
//       method: 'POST',
//     });

//     //if the response is not ok, return null
//     if (!response.ok) {
//       //if the user does not have access to the application, throw an error to gracefully handle logout
//       if (response.status === 403) {
//         throw new Error('User does not have access to this application');
//       }
//       return null;
//     }

//     const user = (await response.json()) as UserEntity;

//     //if the user does not have access to the application, throw an error to gracefully handle logout
//     if (!user.applications.find((app) => app.id === parseInt(appId))) {
//       throw new Error('User does not have access to this application');
//     }

//     //return the user
//     return user as UserEntity;
//   } catch (error) {
//     if (
//       //if the error is an instance of error and the message is that the user does not have access to the application, throw the error
//       error instanceof Error &&
//       error.message === 'User does not have access to this application'
//     ) {
//       throw error;
//     }

//     //if the error is not an instance of error, return null
//     return null;
//   }
// };

// const loginWithMicrosoft = async () => {
//   try {
//     const provider = new OAuthProvider('microsoft.com');
//     provider.setCustomParameters({
//       tenant: env.VITE_AZURE_TENANT_ID,
//     });

//     //add scopes to the provider
//     provider.addScope('openid');
//     provider.addScope('profile');
//     provider.addScope('email');

//     //sign in with the provider
//     const userCredential = await signInWithPopup(auth, provider);

//     //return the user
//     return userCredential.user;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const loginWithEmail = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// type UserStoreState = {
//   user: UserEntity | null;
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   error: string | null;
// };

// type UserStoreActions = {
//   signIn: (type: 'email' | 'microsoft', email?: string, password?: string) => Promise<void>;
//   signOut: () => Promise<void>;
//   getUser: (token: string) => Promise<void>;
// };

// const initalUserState: UserStoreState = {
//   user: null,
//   isLoggedIn: false,
//   isLoading: true,
//   error: null,
// };

// export const useUserStore = create<UserStoreState & UserStoreActions>()((set) => ({
//   ...initalUserState,

//   signIn: async (type: 'email' | 'microsoft', email?: string, password?: string) => {
//     try {
//       //switch on the type
//       switch (type) {
//         case 'email': {
//           //parse the email and password
//           const parsedData = loginWithEmailSchema.safeParse({ email, password });

//           //if the email and password are not valid, throw an error
//           if (!parsedData.success) {
//             throw new Error('Invalid email or password');
//           }

//           //login with the email and password
//           const firebaseUser = await loginWithEmail(
//             parsedData.data.email,
//             parsedData.data.password
//           );

//           //get the token
//           const token = await firebaseUser.getIdToken();

//           //get the user
//           const user = await getUser(token);

//           //update the store
//           set({ user, isLoggedIn: true, isLoading: false, error: null });
//           break;
//         }
//         case 'microsoft': {
//           //login with the microsoft provider
//           const firebaseUser = await loginWithMicrosoft();

//           //get the token
//           const token = await firebaseUser.getIdToken();

//           //get the user
//           const user = await getUser(token);

//           //update the store
//           set({ user, isLoggedIn: true, isLoading: false, error: null });
//           break;
//         }
//         default:
//           set({ user: null, isLoading: false, error: 'Invalid sign in type' });
//           throw new Error('Invalid sign in type');
//       }
//     } catch (error) {
//       if (
//         //if the error is an instance of error and the message is that the user does not have access to the application, sign out and throw the error
//         error instanceof Error &&
//         error.message === 'User does not have access to this application'
//       ) {
//         //sign out the user
//         await signOut(auth);
//         //update the store
//         set({
//           user: null,
//           isLoggedIn: false,
//           isLoading: false,
//           error: 'User does not have access to this application',
//         });
//         //throw the error
//         throw error;
//       } else {
//         //update the store
//         set({
//           user: null,
//           isLoggedIn: false,
//           isLoading: false,
//           error: 'Something went wrong',
//         });
//         //throw the error
//         throw error;
//       }
//     }
//   },
//   signOut: async () => {
//     //sign out the user
//     await signOut(auth);
//     //update the store
//     set({ user: null, isLoggedIn: false, isLoading: false, error: null });
//   },
//   getUser: async (token: string) => {
//     //get the user
//     const user = await getUser(token);
//     //update the store
//     set({ user, isLoggedIn: true, isLoading: false, error: null });
//   },
// }));

// //listen for changes to the user's id token
// auth.onIdTokenChanged(async (user) => {
//   //User is logged in
//   if (user) {
//     //get the token
//     const token = await user.getIdToken();
//     //get the user
//     await useUserStore.getState().getUser(token);
//   } else {
//     //User is not logged out
//     //update the store
//     useUserStore.setState({ user: null, isLoading: false });
//   }
// });
