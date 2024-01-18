import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'; 
import Underline from '@tiptap/extension-underline';
import FontSize from './FontSize';
import TextStyle from '@tiptap/extension-text-style';

import Link from '@tiptap/extension-link';
import Emoji from './Emoji'; 
import './TipTap.css'
import Image from '@tiptap/extension-image';



const TipTap = ({ maxLength, postFormattedText, initialContent }) => {   
   

  const [content, setContent] = useState(initialContent || '');
  const [showFontSizeInput, setShowFontSizeInput] = useState(false);
  const [fontSize, setFontSize] = useState(16);  
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState(''); 

  const [showEmojiModal, setShowEmojiModal] = useState(false);

  const [isLimitExceeded, setIsLimitExceeded] = useState(false);

  // INSERT IMAGE 
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // console.log('initialContent: ', initialContent, 'content: ', content);

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setImageUrl('');
  };



  // ---
  const openLinkModal = () => {
    setShowLinkModal(true);
  };

  const closeLinkModal = () => {
    setShowLinkModal(false);
    setLinkUrl('');
  }; 



  const editor = useEditor({
    extensions: [StarterKit, Underline, FontSize, TextStyle.extend({}), 
      Link.configure({ openOnClick: true, attrs: { target: '_blank' }}), 
      Link.extend({ inclusive: false }),
      Image,      
    ],
    content,
    onUpdate: ({ editor }) => {
      const currentContent = editor.getHTML();
      // console.log('Editor content on update:', currentContent);  
      setContent(currentContent); 

      
      if (currentContent.length > maxLength) {
        // Trim the content to the maximum length
        const trimmedContent = currentContent.slice(0, maxLength);
        editor.commands.setContent(trimmedContent);
  
        setIsLimitExceeded(true); 
      }

      else {
        setIsLimitExceeded(false); 
        postFormattedText(currentContent);
      }
    },
    // Include other options if needed
  });

  // INSERT IMAGE 
  const insertImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      closeImageModal();
    }
  };
 

  const applyFontSize = () => {
    // console.log('Applying font size:', fontSize); 
  
    editor.chain().focus().setFontSize(fontSize).run();
    setShowFontSizeInput(false);
  };

  const incrementFontSize = () => {
    setFontSize(prevSize => {
      const newSize = prevSize + 1;
      editor.chain().focus().setFontSize(newSize).run();
      return newSize;
    });
  };
  
  const decrementFontSize = () => {
    setFontSize(prevSize => {
      const newSize = Math.max(prevSize - 1, 1); // Prevent font size from going below 1
      editor.chain().focus().setFontSize(newSize).run();
      return newSize;
    });
  };

  // Function to reset font size to initial value
  const cancelFontSizeChange = () => {
    setFontSize(16); // Reset to initial font size
    editor.chain().focus().setFontSize(16).run();
    setShowFontSizeInput(false);
  };

  const applyLink = () => {
    if (linkUrl) {
      let formattedUrl = linkUrl;
      // Check if the URL starts with http:// or https://, if not, prepend http://
      if (!/^https?:\/\//i.test(linkUrl)) {
        formattedUrl = 'http://' + linkUrl;
      }
      editor.chain().focus().setLink({ href: formattedUrl }).run(); // Remove extendMarkRange
      setLinkUrl('');
      closeLinkModal(); // Close the link modal after applying the link
    }
  };  
  
  const insertEmoji = (emoji) => {
    if (editor) {
      editor.chain().focus().insertContent(emoji).run();
      setShowEmojiModal(false);
    }
  };  

  return (
    <div className="tip-tap-editor">
      <h2>Log Entry Editor</h2>
      <div className='tip-tap-buttons'>

        <button className='tiptap-format-btn' onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>

        <button className='tiptap-format-btn' onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>

        <button className='tiptap-format-btn' onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button> 

        
          <button className='tiptap-format-btn' onClick={() => setShowFontSizeInput(true)}>
            Font Size
          </button>
        

        {showFontSizeInput && (
          <div className="overlay">
          <div className="font-size modal">
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
            <button className="crement" onClick={decrementFontSize}>-</button>
            <button className="crement" onClick={incrementFontSize}>+</button>
            <button className="set-unset" onClick={applyFontSize}>Set</button>
            <button className="set-unset" onClick={cancelFontSizeChange}>Cancel</button>
          </div>
          </div>
        )}

        <button className='tiptap-format-btn' onClick={openLinkModal}>
          Add Link
        </button>

        {/* INSERT IMAGE  */}
        <button className='tiptap-format-btn' onClick={openImageModal}>
          Insert Image
        </button>

        <button className='tiptap-format-btn' onClick={() => setShowEmojiModal(true)}>
          Add Emoji
        </button>

      </div>
      <div className="tiptap-editor-container">
        {isLimitExceeded && <div className="warning">Limit your text to 10,000 characters</div>}
          <EditorContent editor={editor} className='editorContent' />
        {isLimitExceeded && <div className="warning">Limit your text to 10,000 characters</div>}

        {showLinkModal && (
          <div className="overlay">
            <div className="add-link modal">
              <input
                type="text"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <button onClick={applyLink}>Apply</button>
              <button onClick={closeLinkModal}>Cancel</button>
            </div>
          </div>
        )} 
        
        {/* INSERT IMAGE MODAL  */}
        {showImageModal && (
          <div className="overlay">
            <div className="insert-image modal">
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <button onClick={insertImage}>Insert</button>
              <button onClick={closeImageModal}>Cancel</button>
            </div>
          </div>
        )}

        {showEmojiModal && (
          <Emoji
            insertEmoji={insertEmoji}
            closeModal={() => setShowEmojiModal(false)}
          />
        )}

      </div>
      
    </div>
  );
};

export default TipTap;

 