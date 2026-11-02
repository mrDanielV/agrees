'use client';

import { useEffect, useRef, useState } from 'react';

export function CodeInput() {
    const cls = 'mr-3 h-12 w-10 rounded-lg text-xl text-center ring-2 ring-inset ring-gray-300 focus:ring-sber-green focus:outline-none border-none';
    const [code, setCode] = useState(['', '', '', '']);
    const refs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    useEffect(() => { 
        refs[0].current?.focus()
    }, []);

    const onCh = (event, index) => {
        //const el = refs[index].current;
        const v = event.target.value;
        const regex = /^\d/; // или /^\d$/

        if(!regex.test(v)) {
            return;
        }

        const newCode = [...code];
        newCode[index] = v.slice(0,1);
        setCode(newCode);

        if(index < 3) {
            refs[index + 1].current?.focus()
        }
    }

    const onKey = (event, index)=> {
        const newCode = [...code];

        if(event.key == 'Backspace') {
            if(code[index] != '') {
                 newCode[index] = '';
            }
            else if(index > 0 && code[index] === '') {
                refs[index - 1].current?.focus()
                newCode[index - 1] = '';
            }
            setCode(newCode);
        }
    }

    const onPaste = (e) => {
        e.preventDefault();
    }

    return (
        <div className="relative flex max-w-max">

            {code.map((item, index) => (
              <input 
                key={index}
                type="text"
                inputMode="numeric"
                className={cls}
                value={code[index]}
                ref={refs[index]} 
                onChange={(e) => onCh(e, index)} 
                onFocus={(e) => e.target.select()} 
                onKeyDown={(e) => onKey(e, index)}  
                onPaste={(e) => onPaste(e)} />
            ))}
        </div>
    )
}