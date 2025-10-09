//コンポーネント；アプリのための再利用可能なUI要素。
// Chakra UI や Material UI のような、React オープンソースコミュニティーがあるので、これを用いることもあり

//コンポーネント例
//名前は大文字から始める必要があります。さもないと動作しません！
//export default は、他のファイルでこのコンポーネントをインポートできるようにします。
export default function Profile(){
    return (
        <img 
            src = "https://i.imgur.com/MK3eW3Am.jpg"
            alt="Katherine Johnson"
         />
    )
}

//コンポーネントの利用：他のコンポーネント内にネストさせる
//ネスト構造とは：あるものの中に、それと同じ種類のものが含まれている状態。マトリョーシカ人形
//大文字・小文字の違いに気をつけてください。
//<section> は小文字なので、React はこれが HTML タグを指しているのだと理解します。
//<Profile /> は大文字の P で始まっているので、React は Profile という名前の独自コンポーネントを使いたいのだと理解します。

funciton Profile(){
    return (
        <img 
            src = "https://i.imgur.com/MK3eW3Am.jpg"
            alt="Katherine Johnson"
         />
    );
}

export default function Gallary(){
    return (
        <section>
            <Profile />
            <Profile />
            <Profile />
        </section>
    );
}
