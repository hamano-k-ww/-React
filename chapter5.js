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


    //for example
    //App.jsというファイルでは
    import { getImageUrl } from './utils.js';

    function Profile({
      imageId,
      name,
      profession,
      awards,
      discovery,
      imageSize = 70
    }) {
      return (
        <section className="profile">
          <h2>{name}</h2>
          <img
            className="avatar"
            src={getImageUrl(imageId)}
            alt={name}
            width={imageSize}
            height={imageSize}
          />
          <ul>
            <li><b>Profession:</b> {profession}</li>
            <li>
              <b>Awards: {awards.length} </b>
              ({awards.join(', ')})
            </li>
            <li>
              <b>Discovered: </b>
              {discovery}
            </li>
          </ul>
        </section>
      );
    }
    
    export default function Gallery() {
      return (
        <div>
          <h1>Notable Scientists</h1>
          <Profile
            imageId="szV5sdG"
            name="Maria Skłodowska-Curie"
            profession="physicist and chemist"
            discovery="polonium (chemical element)"
            awards={[
              'Nobel Prize in Physics',
              'Nobel Prize in Chemistry',
              'Davy Medal',
              'Matteucci Medal'
            ]}
          />
          <Profile
            imageId='YfeOqp2'
            name='Katsuko Saruhashi'
            profession='geochemist'
            discovery="a method for measuring carbon dioxide in seawater"
            awards={[
              'Miyake Prize for geochemistry',
              'Tanaka Prize'
            ]}
          />
        </div>
      );
    }

    //utils.jsというファイルでは
    export function getImageUrl(imageId, size = 's') {
        return (
          'https://i.imgur.com/' +
          imageId +
          size +
          '.jpg'
        );
      }
      