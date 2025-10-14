//一つ前の章で、以下のコードについて学びました。
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
//このコードでは、+3ボタンを押してもnumberの値が1ずつしか増えません。
//レンダー前に同じ state 変数を複数回更新する場合、setNumber(number + 1) のようにして次の state 値を渡すのではなく、代わりに setNumber(n => n + 1) のようなキュー内のひとつ前の state に基づいて次の state を計算する関数を渡すことができます。
//意味としては「その state の値に対してこのようにせよ」と伝えるための手段です。

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}

//ここで、n => n + 1 は更新用関数 (updater function) と呼ばれます。これを state のセッタに渡すと：
    //React はこの関数をキューに入れて、イベントハンドラ内の他のコードがすべて実行された後に処理されるようにします。
    //次のレンダー中に、React はキューを処理し、最後に更新された state を返します。

//例２
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}

//このイベントハンドラでは、React に次のように指示しています。
    //setNumber(number + 5): number は 0 なので、setNumber(0 + 5)。React はキューに “5 に置き換えよ” という命令を追加する。
    //setNumber(n => n + 1): n => n + 1 は更新用関数。React はその関数をキューに追加する。
