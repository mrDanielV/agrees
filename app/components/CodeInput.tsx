'use client';

import { useEffect, useRef, useState, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from 'react';

type CodeInputProps = {
    onComplete: (code: string) => void;
};

export function CodeInput({onComplete}: CodeInputProps) {

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

    const onCh = (event: ChangeEvent<HTMLInputElement>, index: number) => {
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

        const fullCode = newCode.join('');
        if(fullCode.length === 4) {
            onComplete(newCode.join(''));
        }
    }

    const onKey = (event: KeyboardEvent<HTMLInputElement>, index: number)=> {
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

    const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
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