//コンポーネントに props を渡す:親コンポーネントは子コンポーネントに props を渡すことで情報を伝えることができるのです。

import {Avatar} from "./chapter4";

    //Step 1: 子コンポーネントに props を渡す
    export default function Profile(){
        return (
            <Avatar
            person = {{name: 'Lin Lanying', imageId: '1bX5QH6'}}
            size = {100}
            />
        )
    }

    //step 2:子コンポーネントからpropsを読み出す
    function Avatar({person,size}){
        //perso and size are available here
        return (
            <img
                className ="avatar"
                src={Avatar()}
            />
        )
    }

    //for example
    //App.jsというファイルでは
    import {getImageUrl} from './utils.js';

    function Avatar({person,size}){
        return(
            <img
                className = "avatar"
                src={getImageUrl(person)}
                alt={person.name}
                width={size}
                height={size}
            />
        );
    }
    export default function Profile(){
        return (
            <div>
                <Avatar
                    size={100}
                    person={{
                        name: 'Katsuko Saruhashi', 
                        imageId: 'YfeOqp2'
                    }}
                />
                <Avatar
                    size={80}
                    person={{
                        name: 'Aklilu Lemma', 
                        imageId: 'OKS67lh'
                    }}
                />
            </div>
        );
    }

    //utils.jsというファイルでは
    export function getImageUrl(person,size="s"){
        return (
            "https://i.imgur.com/" +
            person.imageId +
            size +
            ".jpg"
        );
    }