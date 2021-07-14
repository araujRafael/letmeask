//Imports
import { useAuth } from '../Hooks/useAuth'
import {Link, useHistory} from 'react-router-dom'
import {FormEvent, useState} from 'react'
import { database } from '../Services/Firebase'
//Images
import {
    illustrationImg,
    logoImg,
} from '../Assets/ExportImg'
//Css
import '../Styles/auth.scss'
//Components
import { Button } from '../Components/Button'

export function NewRoom(){
    const {User} = useAuth()
    const [inputNewRoom,setInputNewRoom] = useState('')
    const history = useHistory()

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault()
        if(inputNewRoom.trim() === ''){
            return
        }
        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            tittle: inputNewRoom,
            authorId: User?.id,
        })

        history.push(`rooms/${firebaseRoom.key}`)
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
                    <h1>Olá, {User?.name}.</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type='text'
                            placeholder='Nome da sala'
                            onChange={
                                event => 
                                    setInputNewRoom(event.target.value)
                            }
                            value={inputNewRoom}
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?{" "}
                        <Link to='/'>Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
} 
