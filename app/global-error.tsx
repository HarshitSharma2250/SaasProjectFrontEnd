
'use client'

export default function GlobalError({error,reset}:{error:Error,reset:()=>void}){
    return(

<html>
<body>
  <h1>something Went Wrong !</h1>  
  <pre>{error.message}</pre>
{
    error.stack && (
        <details open>
            <summary>stack error : </summary>
            <pre>{error.stack}</pre>
        </details>
    )
}
<button onClick={()=>reset()}>reset</button>
</body>
</html>
    )
}