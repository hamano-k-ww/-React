//条件付きレンダー
//このように書ける
function Item({name,isPacked}){
    if(ispacked){
        retrun <li className="item">{name}✅</li>
    }else{
        return <li className="item">{name}</li>
    }
}
export default function PackingList(){
    return (
        <section>
            <h1>Sally Ride's Packing List</h1>
            <ul>
                <Item isPacked={true} name="Space suit"/>
                <Item isPacked={true} name="Helmet with a golden sticker"/>
                <Item isPacked={false} name="Photo of Tam"/>
            </ul>
        </section>
    )
}
//null を使って何も返さないようにする
//梱包済みの荷物は一切表示したくない、という場合です。コンポーネントは常に何かを返す必要があります。このような場合、null を返すことができます。
if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
//ところで、以下のコードではclassNameの変更の際に大変になってしまう
if(ispacked){
    retrun <li className="item">{name}✅</li>
}else{
    return <li className="item">{name}</li>
}
//したがって以下のように書くと良い
return (
    <li className="item">
        {ispacked ?name + '✅':name}
    </li>
)
//これは「isPacked が true なら name + ' ✅' をレンダーし、それ以外 (:) の場合は name をレンダーする」というように読んでください。

//取り消し線を表示する <del> のような別のタグで囲みたいとしましょう.この時は以下の通り
function Item({ name, isPacked }) {
    return (
      <li className="item">
        {isPacked ? (
          <del>
            {name + ' ✅'}
          </del>
        ) : (
          name
        )}
      </li>
    );
  }
  
  export default function PackingList() {
    return (
      <section>
        <h1>Sally Ride's Packing List</h1>
        <ul>
          <Item 
            isPacked={true} 
            name="Space suit" 
          />
          <Item 
            isPacked={true} 
            name="Helmet with a golden leaf" 
          />
          <Item 
            isPacked={false} 
            name="Photo of Tam" 
          />
        </ul>
      </section>
    );
  }

//論理 AND 演算子 (&&) の際は以下の通りに書くとよい
function Item({ name, isPacked }) {
    return (
      <li className="item">
        {name} {isPacked && '✅'}
      </li>
    );
  }
  
  export default function PackingList() {
    return (
      <section>
        <h1>Sally Ride's Packing List</h1>
        <ul>
          <Item 
            isPacked={true} 
            name="Space suit" 
          />
          <Item 
            isPacked={true} 
            name="Helmet with a golden leaf" 
          />
          <Item 
            isPacked={false} 
            name="Photo of Tam" 
          />
        </ul>
      </section>
    );
  }
//これは「isPacked なら (&&)、チェックマークをレンダーし、それ以外の場合には何もレンダーしない」のように読んでください。
//左側（条件）が true である場合、右側（今回の場合はチェックマーク）の値を返します。しかし、条件が false である場合、式全体が false になります。
//注意点
//&& の左辺に数値を置かない
////JavaScript は条件をテストする際、左の辺を自動的に真偽値に変換します。しかし、左の辺が 0 の場合は、式全体がその 0 という値に評価されてしまうため、React は何もレンダーしないのではなく 0 を表示します。
//たとえば、よくある間違いとして messageCount && <p>New messages</p> のようにコードを書くことが挙げられます。messageCount が 0 の場合は何も表示しないと思われがちですが、実際には 0 そのものが表示されてしまいます！
//これを修正するには、左の値を真偽値にしてください： messageCount > 0 && <p>New messages</p>。

