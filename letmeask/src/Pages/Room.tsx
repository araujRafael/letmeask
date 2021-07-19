//Import
import {useParams} from 'react-router-dom'
import { database } from '../Services/Firebase';
import { useAuth } from '../Hooks/useAuth';
import { 
    FormEvent, 
    useState, 
    useEffect 
} from 'react';
//Images
import '../Styles/room.scss';
import { logoImg } from '../Assets/ExportImg'
//Components
import { Button } from '../Components/Button'
import { RoomCode } from '../Components/RoomCode';
//types
import { 
    FirebaseQuestions,
    RoomParams,
    showQuestionsType
} from './Types/TypesRoom'

//Render
export function Room() {
    const {User} = useAuth()
    const {id} = useParams<RoomParams>()
    const roomId = id
    const [newQuestion,setNewQuestion] = useState('')
    const [showQuestions,setShowQuestions] = useState<showQuestionsType[]>([])
    const [title,setTitle] = useState('') 

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions:FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map( ([key,value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })
                
            setTitle(databaseRoom.title)
            setShowQuestions(parsedQuestions)
        })//roomRef
    },[roomId])
    // Object.entries: transforma objeto em array de matriz

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if(newQuestion.trim()===''){
            return
        }
        if(!User){
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: User?.name,
                avatar: User?.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }
        await database.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {showQuestions.length > 0 && 
                        <span>
                            {showQuestions.length} {
                                showQuestions.length > 1 ? 
                                    "Perguntas" : "Pergunta"
                            }
                        </span>
                    }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar."
                        onChange={
                            event => setNewQuestion(event.target.value) 
                        }
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { User ? (
                            <div className='user-info'>
                                <img src={User.avatar} alt={User.name}/>
                                <span>{User.name}</span>
                            </div> ) : (
                        <span >
                            Para enviar uma pergunta{" "} 
                            <button>faça seu login</button> 
                        </span>
                        )}
                        <Button 
                        type='submit' 
                        disabled={!User}
                        >Enviar pergunta</Button>

                    </div>
                </form>

                {JSON.stringify(showQuestions)}

            </main>
        </div>
    )
}