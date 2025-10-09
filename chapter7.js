//リストのレンダー
//コンテンツのリストが-のデータのみが異なる時がある。これらをmap() や filter() などのメソッドを使ってコンポーネントのリストをレンダーすることができます。
//いかが例です
//1．データを配列に移動します。
const people = [
    'Creola Katherine Johnson: mathematician',
    'Mario José Molina-Pasquel Henríquez: chemist',
    'Mohammad Abdus Salam: physicist',
    'Percy Lavon Julian: chemist',
    'Subrahmanyan Chandrasekhar: astrophysicist'
  ];
  
  export default function List() {
    //2．people 内のメンバを listItems という新しい JSX の配列にマップします。
    const listItems = people.map(person =>
      <li>{person}</li>
    );
    //3．コンポーネントから listItems を <ul> で囲んで返します。
    return <ul>{listItems}</ul>;
  }

//アイテムの配列をフィルタする 
//さらに配列の内容を増やし、職業 (profession) が 'chemist' の人だけを表示したいとしましょう。JavaScript の filter() メソッドを使用すれば、そのような職業の人だけを返すことができます。このメソッドは、要素の配列を受け取り、個々の要素を「テスト」（true または false を返す関数）にかけ、そして、テストを通過した要素（テスト関数が true を返したもの）のみを含む配列を返します。
//App.jsでは
import {people} from './datas.js';
import {getImageUrl} from './utils.js';

export default function List(){
    //1.people に対して filter() を呼び出し、person.profession === 'chemist' を使ってフィルタした、職業が “chemist” である人物のみの新しい配列を作成します。
    const chemists = people.filter(people =>
        person.profession === 'chemist'
    );
    //2.次に chemists に対して map を適用します。
    const listItems = chemists.map(person =>
        <li>
            <img
                src={getImageUrl(person)}
                alt={person.name}
            />
            <p>
                <b>{person.name}</b>
                {' ' + person.profession + ' '}
                known for {person.accomplishment}
            </p>
        </li>
    );
    //3.最後に、コンポーネントから listItems を返します。
    return <ul>{listItems}</ul>;

}
//data.jsでは
export const people = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    accomplishment: 'spaceflight calculations',
    imageId: 'MK3eW3A'
  }, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    accomplishment: 'discovery of Arctic ozone hole',
    imageId: 'mynHUSa'
  }, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    accomplishment: 'electromagnetism theory',
    imageId: 'bE7W1ji'
  }, {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
    accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
    imageId: 'IOjWm71'
  }, {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
    accomplishment: 'white dwarf star mass calculations',
    imageId: 'lrWQx8l'
}];
//utils.jsでは
export function getImageUrl(person) {
    return (
      'https://i.imgur.com/' +
      person.imageId +
      's.jpg'
    );
}
//アロー関数は => の直後の式を自動的に返しますので、return 文を直接書く必要はありません。
//ただし、もし => の次に { が続く場合は、必ず return 文を明示的に書く必要があります。
const listItems = chemists.map(person => { // Curly brace
    return <li>...</li>;
  });
//=> { を含むアロー関数は “ブロック形式の関数本体” を持つものとして扱われます。これにより複数行のコードが書けるようになりますが、return 文を自分で書かなければなりません。書き忘れた場合は何も返されません！

//key によるリストアイテムの順序の保持 
//配列の各アイテムには、key を渡す必要があります。配列内の他のアイテムと区別できるようにするための一意な文字列ないし数値のことです。
<li key={person.id}>...</li>
//map() 内で直接 JSX 要素を使用する場合、必ず key が必要です！
//key は、配列のどの要素がどのコンポーネントに対応するのかを React が判断し、後で正しく更新するために必要です。これが重要となるのは、配列の要素が移動（ソートなどによって）した場合、挿入された場合、あるいは削除された場合です。適切に key を選ぶことで、React は何が起こったか推測し、DOM ツリーに正しい更新を反映させることができます。
//key は動的に生成するのではなく、元データに含めるべきです。
//以上を踏まえて再度作り直してみる
//App.jsでは
import {people} from './data.js';
import {getImageUrl} from './utils.js';

export default function List(){
    const listItems = people.map(person =>
        <li key={person.id}>
            <img
                src={getImageUrl(people)}
                alt={person.name}
            />
            <p>
                <b>{person.name}</b>
                {'' + person.profession + ''}
                known for {person.accomplishment}
            </p>
        </li>
    );
    return <ul>{listItems}</ul>;
}
//data.jsでは
export const people = [{
    id: 0, // Used in JSX as a key
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    accomplishment: 'spaceflight calculations',
    imageId: 'MK3eW3A'
  }, {
    id: 1, // Used in JSX as a key
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    accomplishment: 'discovery of Arctic ozone hole',
    imageId: 'mynHUSa'
  }, {
    id: 2, // Used in JSX as a key
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    accomplishment: 'electromagnetism theory',
    imageId: 'bE7W1ji'
  }, {
    id: 3, // Used in JSX as a key
    name: 'Percy Lavon Julian',
    profession: 'chemist',
    accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
    imageId: 'IOjWm71'
  }, {
    id: 4, // Used in JSX as a key
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
    accomplishment: 'white dwarf star mass calculations',
    imageId: 'lrWQx8l'
  }];
//utils.jsでは
export function getImageUrl(person) {
    return (
      'https://i.imgur.com/' +
      person.imageId +
      's.jpg'
    );
  }
//Keyのルール
// キーは兄弟間で一意でなければなりません。ただし、異なる配列に対応する JSX ノードには同じキーを使用することができます。
// キーは変更してはいけません。さもないと key の目的が台無しになります。レンダーの最中に key を生成してはいけません。
