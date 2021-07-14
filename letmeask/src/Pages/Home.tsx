//Imports
import { FormEvent, useState } from 'react'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'
import { database } from '../Services/Firebase'
//Images
import {
    illustrationImg,
    logoImg,
    googleIconImg
} from '../Assets/ExportImg'
//Css
import '../Styles/auth.scss'
//Components
import { Button } from '../Components/Button'


export function Home(){
    const history = useHistory()
    const {User,signInWithGoogle} = useAuth()
    const [roomCode,setRoomCode] = useState('')

    async function handleCreateRoom(){
        /*
         A function de login funciona como um 
         middleware antes do history.push()
        */ 
        if(!User){
           await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event:FormEvent){
        event.preventDefault()

        if(roomCode.trim()==='')
            return
        const roomRef = await database.ref(`rooms/${roomCode}`)
            .get()
        if(!roomRef.exists()){
            alert(`A sala que você deseja entrar não existe, verifique se o código está correto`)
            return;
        }
        history.push(`rooms/${roomCode}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt='ilustração'/>
                <strong>Crie salas de Q&amp;A ao-vivo.</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask"/>
                    <button 
                     onClick={handleCreateRoom}
                     className="create-room"
                    >
                        <img src={googleIconImg} alt="Icone google"/>
                        Crie sua sala com o google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type='text'
                            placeholder='Digite o código da sala.'
                            onChange={
                                event=> 
                                    setRoomCode(event.target.value)
                            }
                            value={roomCode}
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
} 


