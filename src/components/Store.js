import React, {useReducer} from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

const initState = {
    general : [
        {from: 'gary', msg: 'hello'},
        {from: 'mark', msg: 'hello'},
        {from: 'joel', msg: 'hello'},
    ],
    topic2 : [
        {from: 'gary', msg: 'hello'},
        {from: 'mark', msg: 'hello'},
        {from: 'joel', msg: 'hello'},
    ]
}


function reducer(state,action){
    const {from,msg,topic} = action.payload;
    // console.log(state);
    switch(action.type){
      case 'RECEIVE_MESSAGE': 
      let valami = { ...state, [topic]:[...state[topic],{from,msg}]}
          return valami;
        default:
            return state;
    }
}
    


let socket;

function sendChatAction(value){
    socket.emit('chat message', value);
}


function Store(props) {
    const [allChats, dispatch] = useReducer(reducer,initState);
    React.useEffect(()=>{
       if(!socket){
        socket = io(':3001');
        socket.on('chat message', function(msg){
        dispatch({type:'RECEIVE_MESSAGE',payload: msg});
          },[allChats]);
    }
    })

    return (
        <CTX.Provider value={{allChats,sendChatAction}}>
            {props.children}
        </CTX.Provider>
        )            
      
    }
export default Store;
