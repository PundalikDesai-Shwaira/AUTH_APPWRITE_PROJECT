import { View, Text } from 'react-native'
import React, { PropsWithChildren } from 'react'
import App from '../App'

impoort Appwrite from './service'

type AppContextType = {
  appwrite: Appwrite;
  isloggedIn: boolean;
  setIsloggedIn: (isloggedIn: boolean) => void
}

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new Appwrite(),
    isloggedIn: false,
    setIsloggedIn: (isloggedIn:boolean) => void
})

export const AppwriteProvider:FC<PropsWithChildren> = ({children}) => {
 const [isloggedIn, setIsloggedIn] = useState<boolean>(false);
 const defaultvalue = {
    appwrite: new Appwrite(),
    isloggedIn,
    setIsloggedIn
 }
  return (
    <AppwriteContext.Provider value={defaultvalue}>
        {children}
    </AppwriteContext.Provider>
  )
}

export default AppwriteContext