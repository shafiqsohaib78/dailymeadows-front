import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import LinkTool from "@editorjs/link";
import Warning from "@editorjs/warning";
import Paragraph from "@editorjs/paragraph";
// import Attaches from "@editorjs/attaches";
// import AnyButton from "@editorjs/editorjs-button";
import AnyButton from "editorjs-button";

export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
        instagram: true,
        facebook: true,
        twitter: true,
        pinterest: true,
        imgur: true,
        vimeo: true,
        vine: true,
        unsplash: true,
      },
    },
  },
  AnyButton: {
    class: AnyButton,
    inlineToolbar: false,
    config: {
      css: {
        btnColor: "btn--gray",
      },
    },
  },

  quote: Quote,
  table: Table,
  marker: Marker,
  image: SimpleImage,
  list: List,
  code: Code,
  raw: Raw,
  header: Header,
  // attaches: Attaches,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      placeholder: "Write your article's detail here...",
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://127.0.0.1:8000/api/linktool/", // Your backend endpoint for url data fetching
    },
  },
  warning: Warning,
};
// simpleImage: SimpleImage,
