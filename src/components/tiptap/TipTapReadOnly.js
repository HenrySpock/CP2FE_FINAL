import React from 'react'; 
import './TipTap.css' 

const TipTapReadOnly = ({ content }) => {
  // console.log('TipTapReadOnly content: ', content); 
  return <div className="read-only-tiptap" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default TipTapReadOnly;