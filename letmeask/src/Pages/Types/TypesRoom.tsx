import { types } from "util"

export type RoomParams = {
  id: string
}

export type FirebaseQuestions = Record<string,{
  author: {
      name:string,
      avatar:string
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean;
}>
/*
Para definir o tipo objeto no react use-se o Record<key,value>
*/
export type showQuestionsType ={
  id: string,
  author: {
      name:string,
      avatar:string
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean;
}
