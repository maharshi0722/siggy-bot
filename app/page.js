"use client"

import { useState, useRef, useEffect } from "react"

function TypeMessage({ text }) {
  const [display,setDisplay]=useState("")

  useEffect(()=>{
    let i=0

    const interval=setInterval(()=>{
      setDisplay(text.slice(0,i))
      i++
      if(i>text.length) clearInterval(interval)
    },20)

    return ()=>clearInterval(interval)
  },[text])

  return <span>{display}</span>
}

export default function Page(){

const [messages,setMessages]=useState([
{role:"assistant",content:"✨ Siggy awakens inside the Ritual Network... speak, mortal."}
])

const [input,setInput]=useState("")
const [loading,setLoading]=useState(false)

const chatRef=useRef(null)

useEffect(()=>{
chatRef.current?.scrollTo({
top:chatRef.current.scrollHeight,
behavior:"smooth"
})
},[messages])

async function sendMessage(){

if(!input || loading) return

const userMsg={role:"user",content:input}

setMessages(prev=>[...prev,userMsg])
setInput("")
setLoading(true)

try{

const res=await fetch("/api/siggy",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
messages,
userMsg
})
})

const data=await res.json()

const reply =
data?.reply ||
data?.choices?.[0]?.message?.content ||
"Siggy vanished into the void..."

setMessages(prev=>[
...prev,
{role:"assistant",content:reply}
])

}catch{

setMessages(prev=>[
...prev,
{role:"assistant",content:"⚡ Siggy lost connection to the ritual forge."}
])

}

setLoading(false)

}

function handleKey(e){
if(e.key==="Enter") sendMessage()
}

return(

<div style={styles.page}>

<div style={styles.container}>

<div style={styles.header} className="flex items-center justify-center gap-3">
  <img src="/logo.png" style={styles.logo} className="w-10 h-10 object-contain" />
  <span>Siggy Soul Forge</span>
</div>

<div ref={chatRef} style={styles.chat}>

{messages.map((m,i)=>(
<div
key={i}
style={{
...styles.messageRow,
justifyContent:m.role==="user"?"flex-end":"flex-start"
}}
>

<div
style={{
...styles.message,
background:m.role==="user"
? "linear-gradient(135deg,#5bbcff,#2ea3ff)"
: "rgba(255,255,255,0.85)",
color:"#1a1a1a"
}}
>

{m.role==="assistant"
? <TypeMessage text={m.content}/>
: m.content}

</div>

</div>
))}

{loading && (
<div style={styles.messageRow}>
<div style={styles.loading}>
Siggy is thinking...
</div>
</div>
)}

</div>

<div style={styles.inputRow}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={handleKey}
placeholder="Ask Siggy anything..."
style={styles.input}
/>

<button onClick={sendMessage} style={styles.button}>
Send
</button>

</div>

</div>

</div>

)

}

const styles={

page:{
height:"100vh",
width:"100%",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(180deg,#eaf6ff,#dff0ff)",
padding:10,
fontFamily:"Inter, sans-serif"
},

container:{
width:"100%",
maxWidth:750,
height:"92vh",

background:"white",

borderRadius:20,
boxShadow:"0 20px 60px rgba(0,0,0,0.08)",

display:"flex",
flexDirection:"column",
overflow:"hidden"
},

header:{
padding:"16px 20px",
fontWeight:600,
fontSize:18,
background:"linear-gradient(135deg,#5bbcff,#2ea3ff)",
color:"white"
},

chat:{
flex:1,
padding:20,
overflowY:"auto",

display:"flex",
flexDirection:"column",
gap:14,

backgroundImage:"url('/bg.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
},

messageRow:{
display:"flex",
width:"100%"
},

message:{
padding:"14px 18px",
borderRadius:16,
maxWidth:"75%",
fontSize:15,
lineHeight:1.6,

backdropFilter:"blur(6px)",

boxShadow:"0 4px 12px rgba(0,0,0,0.1)"
},

loading:{
padding:"10px 14px",
borderRadius:12,
background:"rgba(255,255,255,0.8)"
},

inputRow:{
display:"flex",
padding:16,
gap:10,
borderTop:"1px solid #eee",
background:"white"
},

input:{
flex:1,
padding:"12px 14px",
borderRadius:12,
border:"1px solid #e5e5e5",
fontSize:15,
outline:"none"
},

button:{
padding:"12px 18px",
borderRadius:12,
border:"none",
headerInner:{
display:"flex",
alignItems:"center",
gap:"10px"
},


background:"linear-gradient(135deg,#5bbcff,#2ea3ff)",

color:"white",
fontWeight:600,
cursor:"pointer"
}

}