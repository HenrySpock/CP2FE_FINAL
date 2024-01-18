import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

 

const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null, 

            renderHTML: attributes => {
              const size = attributes.fontSize?.fontSize || attributes.fontSize;
              if (!size) {
                return {};
              }
              return {
                style: `font-size: ${size}px`,
              };
            },

            parseHTML: element => { 
              return {
                fontSize: element.style.fontSize.replace('px', ''),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {  

      setFontSize: fontSize => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run();
      },

    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('fontSize'),
        props: {}, 
      }),
    ];
  },
});

export default FontSize;
