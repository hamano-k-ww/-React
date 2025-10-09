//state はスナップショットである
//ReactのStateは、普通のJavaScriptの変数とは少し違います。普通の変数はいつでも中身を書き換えられますが、ReactのStateは「写真（スナップショット）」のように、その瞬間の値が固定されています。
//setState関数を呼ぶことは、「変数を今すぐ書き換える」命令ではありません。
//「この値で、新しい写真を撮り直してください！」とReactに再撮影（再レンダー）を予約するようなものです。

// ポイント１：setStateは、再撮影（再レンダー）のきっかけ
// まず、UI（画面）がユーザーの操作に反応するためには、Stateを更新する必要がある、という基本を見てみましょう。
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');

  // isSentがtrueなら、このメッセージを表示
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }

  // isSentがfalseなら、このフォームを表示
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // 1. isSentをtrueにして！とReactに再撮影を予約
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
コードの解説

//1．Sendボタンを押すと、onSubmitイベントハンドラが動きます。
//2．setIsSent(true) が呼ばれます。これは「isSentをtrueにした新しい写真で、画面全体を撮り直してください」という予約です。
//3．予約を受け取ったReactは、後でコンポーネントを再実行（再レンダー）します。
//4．次の撮影（レンダー）では、isSentがtrueになっているので、if (isSent)の条件が満たされ、「Your message is on its way!」という見出しが表示される、という流れです。


// ポイント２：各撮影（レンダー）の中では、Stateの値は固定
// ここが一番大事なポイントです。ある一回の撮影（レンダー）の中では、Stateの値は絶対に変わりません。

// 「+3」ボタンを押すと、setNumber(number + 1)が3回呼ばれるので、一気に3増えそうに見えます。でも、実際には1しか増えません。
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

// なぜ1しか増えないのか？
// 1．最初の撮影では、numberの値は0です。この0という値は、この撮影の中では固定されています。
// 2．「+3」ボタンのonClickイベントハンドラも、この「numberが0である」という写真の一部として作られました。
// 3．ボタンをクリックすると、このイベントハンドラが実行されますが、その中ではnumberはずっと0のままです。
//     setNumber(number + 1) → numberは0なので「numberを0 + 1、つまり1にしてください」と予約。
//     setNumber(number + 1) → numberはまだ0なので「numberを0 + 1、つまり1にしてください」と予約。
//     setNumber(number + 1) → numberはしつこいですがまだ0なので「numberを0 + 1、つまり1にしてください」と予約。

// 4．Reactは「OK、numberを1にする予約が3件来たな。じゃあ次の撮影ではnumberを1にしよう」と判断します。
// 5．そして行われる**次の撮影（再レンダー）**で、初めてnumberが1になり、画面に1が表示されます。
//     例えるなら
//     あなたが「カウンターの数字は0」と書かれた紙を見ながら、上司に3回「この数字に1を足してください」とお願いしているようなものです。あなたは毎回「0」の紙を見ているので、3回とも「1にしてください」という同じお願いになってしまいます。


// ポイント３：イベントハンドラは、撮影された瞬間のStateを覚えている
// 非同期処理（setTimeoutなど）が入ってきても、この「スナップショット」のルールは変わりません。

// 「+5」ボタンを押すと、setNumber(number + 5)を実行した3秒後にalertが表示されます。何が表示されるでしょうか？
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5); // 「numberを5にして」と再撮影を予約
        setTimeout(() => {
          // 3秒後に実行されるこのコードは...
          alert(number); // どのnumberを見る？
        }, 3000);
      }}>+5</button>
    </>
  )
}

// 答えは 0 です。
// なぜなら、onClickイベントハンドラが作られたのは、**「numberが0だった最初の撮影」**の時だからです。

// 1．ボタンがクリックされた瞬間、numberは0です。
// 2．setNumber(0 + 5)で「次の撮影ではnumberを5にしてください」と予約されます。
// 3．同時にsetTimeoutがセットされます。このタイマーに渡された関数は、「numberが0だった」という古い写真の情報を記憶したままセットされます。
// 4．すぐにReactは再撮影を行い、画面の表示は5に変わります。
// 5．しかし、3秒後に時限爆弾のように実行されるalertは、過去（クリックされた瞬間）のnumberの値、つまり0を覚えているので、0を表示します。

// イベントハンドラは、それが作られた瞬間の「写真（State）」をずっと持ち続けている、と考えてください。

// まとめ
// 1．setStateは再撮影の予約：Stateを直接変更するのではなく、新しい値で再レンダーするようReactにお願いする。
// 2．レンダーはスナップショット：各レンダーの中で、Stateの値は固定されている。そのレンダー内で作られた変数やイベントハンドラは、その固定された値しか見えない。
// 3．イベントハンドラは過去を記憶している：イベントハンドラは、自分が作られたレンダー（撮影された瞬間）のStateの値をずっと覚えている。たとえ非同期処理で後から実行されても、その値を使う。
// この「スナップショット」という考え方を理解すると、なぜsetしても値がすぐに変わらないのか、なぜ非同期処理で古い値が見えるのか、といったReactの挙動がスッキリと理解できるようになります。
