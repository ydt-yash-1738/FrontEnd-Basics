import { useState, useCallback, useEffect, useRef } from 'react'



function App() {

  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]~`"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1) //+1 in case its zero
      pass += str.charAt(char)
    }

    setPassword(pass)

  },

    [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <div>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-slate-800'>
        <h1 className='text-white text-center mb-2'>Password Generator</h1>
        <div className='flex shadow rounded-xl overflow-hidden mb-1'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-4 pb-2'
            placeholder='Password'
            readOnly
            ref = {passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 font-bold'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 mt-2'>
            <input
              type="range"
              min={6}
              max={51}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label className='text-white font-semibold'>Length: {length-1}</label>
          </div>
          <div className='flex items-center gap-x-1 mt-2'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {setNumberAllowed((prev)=> !prev);}}>
            </input>
              <label className='text-white font-semibold' htmlFor="characterInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 mt-2'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {setCharAllowed((prev)=> !prev);}}>
            </input>
              <label className='text-white font-semibold' htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
