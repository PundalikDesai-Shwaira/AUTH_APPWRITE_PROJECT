// import { Client, Account, ID } from 'appwrite'
// import { Config } from 'react-native-config';
// import Snackbar from 'react-native-snackbar';   

// const appwriteClient = new Client()
    
// const APPWRITE_ENDPOINT:  string = Config.APPWRITE_ENDPOINT!;
// const APPWRITE_PROJECT :string = Config.APPWRITE_PROJECT!;

// type CreateUserAccount ={
//     name: string;
//     email: string;
//     password: string;
// }

// type LoginUserAccount ={
//     email: string;
//     password: string;
// }

// class AppwriteService {
//     account;

//     constructor() {
//         appwriteClient
//             .setEndpoint(APPWRITE_ENDPOINT)
//             .setProject(APPWRITE_PROJECT);
//         this.account = new Account(appwriteClient);
//     }

//    //CREATE A NEW RECORD OF USER INSIDE APPWRITE
//     async createUserAccount({ name, email, password }: 
//         CreateUserAccount) {
//         try {
//             const userAccount = await this.account.create( ID.unique(), email, password, name);

//             if (userAccount) {
//                 //todo:create login  feature after account creation
//                 return this.login({ email, password });
//             }
//             else{
//                 return userAccount;
//             }
//         } catch (error) {
//             Snackbar.show({
//                 text: String(error),
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//             });
//             throw error;
//             console.log( " APPWRITE SERVICE :: createUserAccount() :: " +  error);
//         }
//         }
//     //LOGIN USER
//     async login({ email, password }: LoginUserAccount) {
//         try {
//             return await this.account.createEmailSession(email, password);
//         }
//         catch (error) {
//             Snackbar.show({
//                 text: String(error),
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//             });
//             throw error;
//             console.log( " APPWRITE SERVICE :: loginAccount() :: " +  error);
//         }
//     }
   

//     //GET CURRENT LOGGED IN USER
//     async getCurrentUser() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             Snackbar.show({
//                 text: String(error),
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//             });
//             throw error;
//             console.log( " APPWRITE SERVICE :: getCurrentAccount() :: " +  error);
//         }
//     }
//     //LOGOUT USER
//     async logoutUser() {
//         try { 
//             return await this.account.deleteSession('current');
//         } catch (error) {
//             Snackbar.show({
//                 text: String(error),        
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: 'red',
//             }); 
//             throw error;
//             console.log( " APPWRITE SERVICE :: logoutUser() :: " +  error);
//         }           
//     }
// }
// export default  AppwriteService



// services.ts
import { Client, Account, ID } from 'appwrite';
import { Config } from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT: string = Config.APPWRITE_PROJECT!;

type CreateUserAccount = {
  name: string;
  email: string;
  password: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  private account: Account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT);
    this.account = new Account(appwriteClient);
  }

  // CREATE A NEW RECORD OF USER INSIDE APPWRITE
  async createUserAccount({ name, email, password }: CreateUserAccount): Promise<any> {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      if (userAccount) {
        // after creating account, create a session (login)
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.log("APPWRITE SERVICE :: createUserAccount() ::", msg);
      Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
      });
      throw error;
    }
  }

  // LOGIN USER
  async login({ email, password }: LoginUserAccount): Promise<any> {
    try {
      return await this.account.createSession(email, password);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.log("APPWRITE SERVICE :: login() ::", msg);
      Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
      });
      throw error;
    }
  }

  // GET CURRENT LOGGED IN USER
  async getCurrentUser(): Promise<any> {
    try {
      return await this.account.get();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.log("APPWRITE SERVICE :: getCurrentUser() ::", msg);
      Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
      });
      throw error;
    }
  }

  // LOGOUT USER
  async logoutUser(): Promise<any> {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.log("APPWRITE SERVICE :: logoutUser() ::", msg);
      Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
      });
      throw error;
    }
  }
}

// export a singleton instance (or export the class if you prefer)
export default new AppwriteService();
