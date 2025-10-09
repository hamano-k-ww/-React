//Reactのイベントハンドラを、ざっくり理解しよう！
//Reactのイベントハンドラは、「もしユーザーが〇〇したら、△△してね」という指示書のようなものだと考えてください。
    ////イベント：ユーザーの行動（例：ボタンをクリック、文字を入力）
    ////ハンドラ：イベントが起きた時に実行される処理（例：「クリックされました」と表示する）
//ポイント１：指示書の作り方と渡し方
//まず、コンポー-ネント（お店の店員さんみたいなもの）に、「これをやってね」という指示書（関数）を作ります。

// 「handleClick」という名前の指示書
function handleClick() {
  alert('いらっしゃいませ！');
}
//次に、この指示書をボタン（お店の呼び鈴）に渡します。
// 「この呼び鈴が押されたら(onClick)、handleClickの指示書を実行してね」
<button onClick={handleClick}>
  呼び鈴
</button>

//最も重要な落とし穴：「指示書」はそのまま渡す！
//ここが一番つまずきやすいポイントです。指示書を渡すとき、() をつけてはいけません。
正しい例：onClick={handleClick}
    //これは「handleClick という名前の指示書そのものを渡す」という意味です。
    //Reactは指示書を受け取って、「よし、クリックされたらこれを実行しよう」と準備してくれます。
間違った例：onClick={handleClick()}
    //() をつけると、「handleClick を今すぐここで実行しろ！」という命令になります。
    //ページが表示された瞬間に alert が実行されてしまい、クリックを待ってくれません。

//ポイント２：親から子へ「具体的なお仕事」を頼む
//汎用的な「なんでもボタン」コンポーネントを作っておくと便利です。このボタン自身は何をするか決まっていません。親コンポーネントが「君は動画を再生するボタンね」「君は画像をアップロードするボタンね」と、後から具体的な仕事（指示書）を渡します
// どんな指示書（onClick）でも受け取れる「なんでもボタン」
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

// 親コンポーネント（店長）
function Toolbar() {
  return (
    <div>
      {/* このボタンには「動画を再生しろ」という指示書を渡す */}
      <Button onClick={() => alert('動画を再生します！')}>
        動画を再生
      </Button>

      {/* このボタンには「画像をアップロードしろ」という指示書を渡す */}
      <Button onClick={() => alert('画像をアップロードします！')}>
        画像をアップロード
      </Button>
    </div>
  );
}

//ポイント３：イベントの「伝言ゲーム」（イベント伝播）
//HTMLでは、要素が入れ子になっていると、内側で起きたイベントが外側にも伝わっていきます。これをイベント伝播（またはバブリング）と言います
<div onClick={() => alert('ツールバーがクリックされました！')}>
  <button onClick={() => alert('再生ボタンがクリックされました！')}>
    再生ボタン
  </button>
</div>

//この「再生ボタン」をクリックすると…
    //1.まず、ボタン自身の onClick が実行され、「再生ボタンがクリックされました！」と表示されます。
    //2.次に、イベントが親の div に伝わり、「ツールバーがクリックされました！」も表示されます。

//ポイント４：伝言ゲームを止める「ストップ！」
//「ボタンはクリックしたけど、親には伝わってほしくないな」という時もあります。その場合は、イベントに「ここで話を止めて！」とお願いすることができます。
//指示書（関数）には、e という特別な引数（イベント情報）を受け取ることができます。これを使って e.stopPropagation() と書けばOKです。
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
//ボタンをクリックすると以下のことが起こります。
//1.React が <button> に渡された onClick ハンドラを呼び出す。
//2.そのハンドラは Button で定義されており、次のことを行う。
    //・e.stopPropagation() を呼び出し、イベントがさらにバブリングされるのを防ぐ。
    //・Toolbar コンポーネントから渡された props である onClick 関数を呼び出す。
//3.その関数は Toolbar コンポーネントで定義されており、そのボタン固有のアラートを表示する。
//4.伝播が停止されたため、親の <div> の onClick ハンドラは実行されない。
//e.stopPropagation() の結果、ボタンをクリックすると、アラートが 2 つ（<button> と親のツールバーの <div> から）ではなく、1 つだけ（<button> のみから）表示されるようになります。

//デフォルト動作を防ぐ
//ラウザのイベントには、デフォルトの動作が関連付けられているものがあります。例えば、<form> の submit イベントは、その中のボタンがクリックされると、デフォルトではページ全体がリロードされます。
export default function signuo(){
    return (
        <form onSubmit={() => arert('送信されました！')}>
            <input />
            <button>send</button>
        </form>
    );
}
//イベントオブジェクトの e.preventDefault() を呼び出して、これを防ぐことができます。
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
//e.stopPropagation() と e.preventDefault() を混同しないでください。どちらも有用ですが、両者は無関係です。
    //・e.stopPropagation() は、ツリーの上側にあるタグにアタッチされたイベントハンドラが発火しないようにします。
    //・e.preventDefault() は、数は少ないですがイベントがブラウザデフォルトの動作を持っていた場合に、それを抑制します。
