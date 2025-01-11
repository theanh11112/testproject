import React from "react";
import AddComponent from "./AddComponent";
// Đặt tên component với chữ cái đầu viết hoa
const Wrapper  = ({children,className}) => {
   return <div className={`Wrapper ${className}`}>{children}</div>
}

const Crush = ({name , content}) => {
    return (
      <div>
      <Wrapper className="Crush">
        <h2>{content} {name}</h2>
        </Wrapper>
      </div>
    )

}

const Friends = ({name,content}) => {
    return (
        <>
            <Wrapper className='Friends'>
                 <h2>{content} {name}</h2> 
            </Wrapper>
        </>
    )
}

const Greet = ({name}) => {
  console.log(`hello ${name}`);
}

const ExecuteFunction = ({callback, name}) => {
  callback({name : name})
}

function ParentComponent() {
  ExecuteFunction({callback :Greet , name : "an"});
  // Greet({name :'ngan'})
  return (
    <div>
      <h1>This is a function component</h1>
      {/* Gọi component con đúng cách */}
      {/* <Crush name={"An"} content={"yeu"}/>
      <Crush name={"Ngan"} content={"thich"}/>
      <Friends name={"Binh"} content={"khong than"}/>
      <Friends name={"Dan"} content={"hoi than"}/> */}
    </div>
  );
}

// su dung children ket hop voi  function component (tai su dung code )


export default ParentComponent;

