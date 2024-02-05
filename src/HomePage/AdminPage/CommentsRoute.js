import CurrentComments from "../ProductComponents/CommentsComponents/CurrentComments";

export default function CommentsRoute() {

    return(
        <div>
            <CurrentComments isAuthorized = {true}/>
        </div>
    );
}