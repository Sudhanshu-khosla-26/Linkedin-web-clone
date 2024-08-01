import {GET_RECIVER_INFO,GET_USER_CONNECTION_INVITE_SENDED_LIST, SET_LOADING_STATUS,
     GET_USER_CONNECTION_INVITESLIST , GET_ARTICLES , GET_NETWORK, 
     GET_USER_CHAT_MESSAGE,GET_USER_CONNECTIONLIST,GET_USER_FEED , GET_USER_CONNECTIONS_POSTS} from "./actionTypes";

export const initState = {
    articles: [],
    loading: false,
    networks: [],
    UserConnectionsInviteList: [],
    UserConnectionsInviteSendedList: [],
    Userconnectionslist: [],
    UserconnectionsPosts: [], 
    UserFinalFeed: [],
    UserChatMessages: [],
    ReciverInfo: [],
};

const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_RECIVER_INFO : 
        return{
                ...state,
                ReciverInfo: action.payload,
            }
        case GET_USER_CHAT_MESSAGE:
            return{
                ...state,
                UserChatMessages: action.payload,
            }
        case GET_USER_FEED: 
        return{
            ...state,
            UserFinalFeed: action.payload,
        }
        case GET_USER_CONNECTIONLIST:
            return{
                ...state,
                Userconnectionslist: action.payload,
            }
        case GET_USER_CONNECTION_INVITESLIST: 
        return {
            ...state,
            UserConnectionsInviteList: action.payload,
        }
        case GET_USER_CONNECTION_INVITE_SENDED_LIST: 
        return {
            ...state,
            UserConnectionsInviteSendedList: action.payload,
        }
        case GET_USER_CONNECTIONS_POSTS:
        return{
            ...state,
            UserconnectionsPosts : action.payload,
        }

        case GET_NETWORK:
            return { 
               ...state,
                networks: action.payload,
            }
        case GET_ARTICLES:
            return { 
                ...state,
                articles: action.payload,
            }
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            };
        default:
            return state;
    } 
}

export default articleReducer;