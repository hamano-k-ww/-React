//コンポーネントに props を渡す:親コンポーネントは子コンポーネントに props を渡すことで情報を伝えることができるのです。

import Avatar from "./chapter4";

    //Step 1: 子コンポーネントに props を渡す
    export default function Profile(){
        return (
            <Avatar
            person = {{name: 'Lin Lanying', imageId: '1bX5QH6'}}
            size = {100}
            />
        )
    }