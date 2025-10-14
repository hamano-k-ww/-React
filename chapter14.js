//state には、どのような JavaScript の値でも格納することができます。
const [x, setX] = useState(0);
//これまでに扱ってきたのは、数値、文字列、および真偽値です。これらの種類の JavaScript 値は “イミュータブル”（不変, immutable）
//つまり値が変わることがなく「読み取り専用」なものです。再レンダーをトリガするには値を置き換えます。
setX(5);
//x という state の値は 0 から 5 に置き換わりましたが、0 という数字そのものが変化したわけではありません。
//JavaScript の数値、文字列、真偽値のような組み込みプリミティブの値そのものを変化させることは不可能です。

//ここで、state にオブジェクトが入っている場合を考えてみましょう。
const [position, setPosition] = useState({ x: 0, y: 0 });
//技術的には、オブジェクト自体の内容を書き換えることが可能です。これをミューテーション (mutation) と呼びます。
position.x = 5; // ミューテーション
//しかし、React の state 内にあるオブジェクトは技術的にはミュータブル（mutable, 書き換え可能）であるとしても、
//数値、真偽値、文字列と同様に、イミュータブルなものであるかのように扱うべきです。
//言い換えると、state として格納するすべての JavaScript オブジェクトは読み取り専用として扱う必要があります。

//以下の例では、現在のポインタ位置を表すオブジェクトを state に保持しています。プレビュー領域でタッチしたりマウスカーソルを動かしたりすると、
//赤い点が動いて欲しいと思っています。しかし、点が初期位置から動きません

import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
//問題は、このコードにあります。
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}

//このコードは、直近のレンダーで position に割り当てられたオブジェクトを書き換え、つまりミューテートしています
//しかし、state セット関数が使用されないと、React はそのオブジェクトが変更されたことを認識できません。そのため、React は何の反応もしません。
//これは料理をすでに食べた後で注文を変更しようとするようなものです。state のミューテートは一部のケースでは機能することがありますが、おすすめしません。
//レンダー内でアクセスできる state 値は、読み取り専用として扱うべきです。

//この場合、実際に再レンダーをトリガするためには、新しいオブジェクトを作成し、それを state セット関数に渡す必要があります。
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}

//setPosition を使うことで、React に次のことを伝えます。
    //position をこの新しいオブジェクトに置き換えよ
    //そしてもう一度このコンポーネントをレンダーせよ
//プレビューエリアでタッチするかマウスホバーすることで、赤い点がポインタに追随するようになりましたね。

//新しく作成するオブジェクトに既存のデータも含めたいことがあります。例えば、フォームの 1 つのフィールドだけを更新し、他のすべてのフィールドについては以前の値を保持したい、ということがあります。
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}

//onChange ハンドラが state を書き換えているため、動作しません。
person.firstName = e.target.value;

//新しいオブジェクトを作成して setPerson に渡すことです。しかし、ここではフィールドのうちの 1 つだけが変更されているため、既存のデータもコピーしたいでしょう。
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});

setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});

//各入力フィールドに対して state 変数を別々に宣言していないことに注目してください。大きなフォームでは、すべてのデータをオブジェクトにまとめて保持することが非常に便利です。正しく更新さえしていれば！
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}


//ネストされたオブジェクトの更新
//React では state をイミュータブルなものとして扱います！ city を更新するためには、まず（既存のデータも含まれた）新しい artwork オブジェクトを生成する必要があります。そして、新しい artwork を含む新しい person オブジェクトを生成します。
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}

//Immer で簡潔な更新ロジックを書く 
//packiage.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
//App.js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
//Immer を試すには：

//npm install use-immer を実行し、Immer を依存ライブラリとして追加する
//次に import { useState } from 'react' を import { useImmer } from 'use-immer' に置き換える

