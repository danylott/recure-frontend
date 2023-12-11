'use client';

import React, { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  code: string;
  language: string;
}

export default function CodeSnippet({ code, language }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, []);

  return (
    <div className='relative'>
      <SyntaxHighlighter language={language} style={atomDark} wrapLines>
        {code}
      </SyntaxHighlighter>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button
          className='absolute top-2 right-2 px-4 py-2 bg-gray-200 border-none rounded-md cursor-pointer'
        >
          {isCopied
            ? 'Copied!'
            : 'Copy'}
        </button>
      </CopyToClipboard>
    </div>
  );
}
