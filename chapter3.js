//JSX: JavaScript にマークアップを入れ込む

//HTML を JSX に変換する 
//1. 単一のルート要素を返す;<> と </> を使う。中身のないタグをフラグメントという。
    //HTML自体は正しい形である。
//2.すべてのタグを閉じる
    //<img> のような自動で閉じるタグは <img /> のようになりますし、<li>oranges のような囲みタグは <li>oranges</li> と書かなければなりません。
//3. （ほぼ）すべてキャメルケースで.
    //例えば stroke-width の代わりに strokeWidth を使います。class は予約語なので、React では className を使います

<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    className="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>

//コンバーターを使用すするのもあり。
//既存の HTML や SVG を JSX に変換する場合はコンバータ
//https://transform.tools/html-to-jsx