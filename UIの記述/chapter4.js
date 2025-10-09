//JSX に波括弧で JavaScript を含める
//例
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}

//上記を下記のようにする
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}

//波括弧を使える場所 
    //テキストとして、JSX タグの中で直接使う：<h1>{name}'s To Do List</h1> は動作しますが <{tag}>Gregorio Y. Zara's To Do List</{tag}> は動作しない。
    //属性として、= 記号の直後に使う：src={avatar} は avatar という変数を読み出すが、src="{avatar}" と書くと "{avatar}" という文字列そのものを渡す。

//ダブル波括弧:SX 内に CSS やその他のオブジェクトを含める 
//オブジェクトも波括弧を使って { name: "Hedy Lamarr", inventions: 5 } のように記述しますね。ですので JS オブジェクトを JSX に渡すときには、オブジェクトを別の波括弧のペアでラップして、person={{ name: "Hedy Lamarr", inventions: 5 }} のようにする必要があります。