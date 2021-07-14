//Imports
import { 
    createContext,
    ReactNode, 
    useEffect, 
    useState,
} from "react"
import { 
  auth,
  firebase 
} from "../Services/Firebase"

//Types
type UserType = {
    id: string,
    name: string,
    avatar: string
}
type AuthContextType = {
    User: UserType | undefined;
    signInWithGoogle: () => Promise<void>
}
type AuthContextProviderProps = {
    children: ReactNode;
}
  

//createContext tag
export const AuthContext = createContext({} as AuthContextType)
// "as any" ignora o pedido type do typescript

export function AuthContextProvider(props:AuthContextProviderProps){

    const [User,setUser] = useState<UserType>()

    useEffect(() => {
      const unSubscribe = auth.onAuthStateChanged(user => {
        if(user){
          const {displayName, photoURL, uid} = user
          if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account!')
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL          
          })//setUser
        }
      })//OnAuthStateChange
  
      return ()=>{
        unSubscribe()
        /*
          Para que essa função não fique rodando
          depois que o usuário saia, é de boas
          práticas se descadastrar de todos os 
          event listeners.
        */
      }
    },[])//useEffect
    //Function de login.
    async function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider()
  
      const result = await auth.signInWithPopup(provider)  
      if(result.user){
        const {displayName, photoURL, uid} = result.user
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account!')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL          
        })//setUser
      }//if
    
    }//func
  

    return(
      <AuthContext.Provider value={{User,signInWithGoogle}}>
          {props.children}
      </AuthContext.Provider>
    )
}