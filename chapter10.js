//コンポーネントのメモリ
//フォーム上でタイプすると入力欄が更新される、画像カルーセルで「次」をクリックすると表示される画像が変わる、「購入」をクリックすると買い物かごに商品が入る、といったものです。コンポーネントは、現在の入力値、現在の画像、ショッピングカートの状態といったものを「覚えておく」必要があります。
// React では、このようなコンポーネント固有のメモリのことを state と呼びます。

//state 変数の追加
import { useState } from 'react';
//次にこのような行があったとする
let index = 0;
//この場合、以下のように直す
const [index,setIndex] = useState(0);
//index は state 変数であり、setIndex はセッタ関数です。
//以上を踏まえて、コードを作成
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);//index=index+1ではないことに注意
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
//はじめてのフック
//React では、useState やその他の use で始まる関数はフック (Hook) と呼ばれます
//React がレンダーされている間のみ利用可能な特別な関数です（この点については、次ページで詳しく説明します）。フックを使うことで、さまざまな React の機能に「接続 (hook into)」して使用することができます。
//条件分岐、ループ、ネストされた関数の中でフックを呼び出すことはできません。

//useState の構造
//useState を呼び出すということは、このコンポーネントに何かを覚えさせるよう React に指示を出すということです：

const [index,setIndex] =useState(0);//indexを覚えてもらう
    //1.コンポーネントが初めてレンダーされる。useState に index の初期値として 0 を渡したので、[0, setIndex] を返す。React は 0 が最新の state 値であることを覚える。
    //2.state を更新する。ユーザがボタンをクリックすると、setIndex(index + 1) が呼び出される。現在 index は 0 なので、setIndex(1) になる。これにより、React は index が 1 になったことを覚え、再レンダーがトリガされる。
    //3.コンポーネントの 2 回目のレンダー。React は再び useState(0) というコードに出会うが、React は index を 1 にセットしたことを覚えているので、代わりに [1, setIndex] を返す。
    //4.以降も続く。

//コンポーネントで複数の state 変数を使う 
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
//index と showMore のように state が互いに関連していない場合、複数の state 変数を持つのが良いでしょう。
//ただし、2 つの state 変数を一緒に更新することが多い場合は、それらを 1 つにまとめる方が簡単かもしれません。
//同じコンポーネントを 2 回レンダーした場合、それぞれのコピーは完全に独立した state を有することになります！ 
// そのうちの 1 つを変更しても、もう 1 つには影響しません。