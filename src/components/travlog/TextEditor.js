import React, { useRef, useEffect } from 'react';

function TextEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize TinyMCE editor
    if (editorRef.current) {
      tinymce.init({
        selector: `#${editorRef.current.id}`,
        height: 300,
        plugins: 'advlist autolink lists link image charmap print preview anchor',
        toolbar: 'undo redo | formatselect | ' +
                 'bold italic underline | ' +
                 'bullist numlist | ' +
                 'link | ' +
                 'removeformat',
        setup: (editor) => {
          editor.on('change', () => {
            // Handle content changes here
            const content = editor.getContent();
            console.log(content); // Log the content to the console
          });
        },
      });
    }

    return () => {
      // Clean up TinyMCE when the component unmounts
      if (editorRef.current) {
        tinymce.get(editorRef.current.id).remove();
      }
    };
  }, []);

  return (
    <div>
      <textarea ref={editorRef}></textarea>
    </div>
  );
}

export default TextEditor;
