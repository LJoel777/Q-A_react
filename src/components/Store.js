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
    //   console.log(JSON.stringify(valami)+"VALAMII");
          return valami;
        default:
            // console.log("IDEMEGY")
            return state;
    }
}
    


let socket;

function sendChatAction(value){
    socket.emit('chat message', value);
    // console.log(JSON.stringify(value));
}


function Store(props) {
    const [allChats, dispatch] = useReducer(reducer,initState);
    // console.log(JSON.stringify(allChats)+"INITSTATEEEEEEEE");
    React.useEffect(()=>{
       if(!socket){
        socket = io(':3001');
        socket.on('chat message', function(msg){
        dispatch({type:'RECEIVE_MESSAGE',payload: msg});
          },[allChats]);
    }
    })

    // console.log(JSON.stringify(allChats)+"INITSTATEEEEEEEE");


    // if(!socket){
    //     socket = io(':3001');
    //     socket.on('chat message', function(msg){
    //        dispatch({type:'RECEIVE_MESSAGE',payload: msg});
    //       });
    // }

    return (
        <CTX.Provider value={{allChats,sendChatAction}}>
            {props.children}
        </CTX.Provider>
        )            
      
    }
export default Store;
