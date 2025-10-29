export type HTMLElementAttributes =
  | "accesskey"
  | "autocapitalize"
  | "autocorrect"
  | "autofocus"
  | "class"
  | "contenteditable"
  | "dir"
  | "draggable"
  | "enterkeyhint"
  | "exportparts"
  | "hidden"
  | "id"
  | "inert"
  | "inputmode"
  | "is"
  | "itemid"
  | "itemprop"
  | "itemref"
  | "itemscope"
  | "itemtype"
  | "lang"
  | "nonce"
  | "part"
  | "popover"
  | "slot"
  | "spellcheck"
  | "style"
  | "tabindex"
  | "title"
  | "translate"
  | "writingsuggestions"
  | `data-${string}`;

export type HTMLAnchorElementAttributes =
  | HTMLElementAttributes
  | "charset"
  | "coords"
  | "download"
  | "href"
  | "hreflang"
  | "name"
  | "ping"
  | "referrerpolicy"
  | "rel"
  | "rev"
  | "shape"
  | "target"
  | "type";

export type HTMLAppletElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "alt"
  | "archive"
  | "code"
  | "codebase"
  | "height"
  | "hspace"
  | "name"
  | "object"
  | "vspace"
  | "width";

export type HTMLAreaElementAttributes =
  | HTMLElementAttributes
  | "alt"
  | "coords"
  | "download"
  | "href"
  | "hreflang"
  | "nohref"
  | "ping"
  | "referrerpolicy"
  | "rel"
  | "shape"
  | "target"
  | "type";

export type HTMLAudioElementAttributes =
  | HTMLElementAttributes
  | "autoplay"
  | "controls"
  | "crossorigin"
  | "loop"
  | "muted"
  | "preload"
  | "src";

export type HTMLBaseElementAttributes =
  | HTMLElementAttributes
  | "href"
  | "target";

export type HTMLBaseFontElementAttributes =
  | HTMLElementAttributes
  | "color"
  | "face"
  | "size";

export type HTMLBlockQuoteElementAttributes = HTMLElementAttributes | "cite";

export type HTMLBodyElementAttributes =
  | HTMLElementAttributes
  | "alink"
  | "background"
  | "bgcolor"
  | "link"
  | "text"
  | "vlink";

export type HTMLBRElementAttributes = HTMLElementAttributes | "clear";

export type HTMLButtonElementAttributes =
  | HTMLElementAttributes
  | "command"
  | "commandfor"
  | "disabled"
  | "form"
  | "formaction"
  | "formenctype"
  | "formmethod"
  | "formnovalidate"
  | "formtarget"
  | "name"
  | "popovertarget"
  | "popovertargetaction"
  | "type"
  | "value";

export type HTMLCanvasElementAttributes =
  | HTMLElementAttributes
  | "height"
  | "width";

export type HTMLCaptionElementAttributes = HTMLElementAttributes | "align";

export type HTMLColElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "char"
  | "charoff"
  | "span"
  | "valign"
  | "width";

export type HTMLColGroupElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "char"
  | "charoff"
  | "span"
  | "valign"
  | "width";

export type HTMLDataElementAttributes = HTMLElementAttributes | "value";

export type HTMLDelElementAttributes =
  | HTMLElementAttributes
  | "cite"
  | "datetime";

export type HTMLDetailsElementAttributes =
  | HTMLElementAttributes
  | "name"
  | "open";

export type HTMLDialogElementAttributes =
  | HTMLElementAttributes
  | "closedby"
  | "open";

export type HTMLDirElementAttributes = HTMLElementAttributes | "compact";

export type HTMLDivElementAttributes = HTMLElementAttributes | "align";

export type HTMLDListElementAttributes = HTMLElementAttributes | "compact";

export type HTMLEmbedElementAttributes =
  | HTMLElementAttributes
  | "height"
  | "src"
  | "type"
  | "width";

export type HTMLFieldSetElementAttributes =
  | HTMLElementAttributes
  | "disabled"
  | "form"
  | "name";

export type HTMLFontElementAttributes =
  | HTMLElementAttributes
  | "color"
  | "face"
  | "size";

export type HTMLFormElementAttributes =
  | HTMLElementAttributes
  | "accept"
  | "accept-charset"
  | "action"
  | "autocomplete"
  | "enctype"
  | "method"
  | "name"
  | "novalidate"
  | "target";

export type HTMLFrameElementAttributes =
  | HTMLElementAttributes
  | "frameborder"
  | "longdesc"
  | "marginheight"
  | "marginwidth"
  | "name"
  | "noresize"
  | "scrolling"
  | "src";

export type HTMLFrameSetElementAttributes =
  | HTMLElementAttributes
  | "cols"
  | "rows";

export type HTMLHeadingElementAttributes = HTMLElementAttributes | "align";

export type HTMLHeadElementAttributes = HTMLElementAttributes | "profile";

export type HTMLHRElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "noshade"
  | "size"
  | "width";

export type HTMLHtmlElementAttributes =
  | HTMLElementAttributes
  | "manifest"
  | "version";

export type HTMLIFrameElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "allow"
  | "allowfullscreen"
  | "allowpaymentrequest"
  | "allowusermedia"
  | "frameborder"
  | "height"
  | "loading"
  | "longdesc"
  | "marginheight"
  | "marginwidth"
  | "name"
  | "referrerpolicy"
  | "sandbox"
  | "scrolling"
  | "src"
  | "srcdoc"
  | "width";

export type HTMLImageElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "alt"
  | "border"
  | "crossorigin"
  | "decoding"
  | "fetchpriority"
  | "height"
  | "hspace"
  | "ismap"
  | "loading"
  | "longdesc"
  | "name"
  | "referrerpolicy"
  | "sizes"
  | "src"
  | "srcset"
  | "usemap"
  | "vspace"
  | "width";

export type HTMLInputElementAttributes =
  | HTMLElementAttributes
  | "accept"
  | "align"
  | "alpha"
  | "alt"
  | "autocomplete"
  | "checked"
  | "colorspace"
  | "dirname"
  | "disabled"
  | "form"
  | "formaction"
  | "formenctype"
  | "formmethod"
  | "formnovalidate"
  | "formtarget"
  | "height"
  | "ismap"
  | "list"
  | "max"
  | "maxlength"
  | "min"
  | "minlength"
  | "multiple"
  | "name"
  | "pattern"
  | "placeholder"
  | "popovertarget"
  | "popovertargetaction"
  | "readonly"
  | "required"
  | "size"
  | "src"
  | "step"
  | "type"
  | "usemap"
  | "value"
  | "width";

export type HTMLInsElementAttributes =
  | HTMLElementAttributes
  | "cite"
  | "datetime";

export type HTMLIsIndexElementAttributes = HTMLElementAttributes | "prompt";

export type HTMLLabelElementAttributes = HTMLElementAttributes | "for" | "form";

export type HTMLLegendElementAttributes = HTMLElementAttributes | "align";

export type HTMLLIElementAttributes = HTMLElementAttributes | "type" | "value";

export type HTMLLinkElementAttributes =
  | HTMLElementAttributes
  | "as"
  | "blocking"
  | "charset"
  | "color"
  | "crossorigin"
  | "disabled"
  | "fetchpriority"
  | "href"
  | "hreflang"
  | "imagesizes"
  | "imagesrcset"
  | "integrity"
  | "media"
  | "referrerpolicy"
  | "rel"
  | "rev"
  | "sizes"
  | "target"
  | "type";

export type HTMLMapElementAttributes = HTMLElementAttributes | "name";

export type HTMLMenuElementAttributes = HTMLElementAttributes | "compact";

export type HTMLMetaElementAttributes =
  | HTMLElementAttributes
  | "charset"
  | "content"
  | "http-equiv"
  | "media"
  | "name"
  | "scheme";

export type HTMLMeterElementAttributes =
  | HTMLElementAttributes
  | "high"
  | "low"
  | "max"
  | "min"
  | "optimum"
  | "value";

export type HTMLObjectElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "archive"
  | "border"
  | "classid"
  | "codebase"
  | "codetype"
  | "data"
  | "declare"
  | "form"
  | "height"
  | "hspace"
  | "name"
  | "standby"
  | "type"
  | "typemustmatch"
  | "usemap"
  | "vspace"
  | "width";

export type HTMLOListElementAttributes =
  | HTMLElementAttributes
  | "compact"
  | "reversed"
  | "start"
  | "type";

export type HTMLOptGroupElementAttributes =
  | HTMLElementAttributes
  | "disabled"
  | "label";

export type HTMLOptionElementAttributes =
  | HTMLElementAttributes
  | "disabled"
  | "label"
  | "selected"
  | "value";

export type HTMLOutputElementAttributes =
  | HTMLElementAttributes
  | "for"
  | "form"
  | "name";

export type HTMLParagraphElementAttributes = HTMLElementAttributes | "align";

export type HTMLParamElementAttributes =
  | HTMLElementAttributes
  | "name"
  | "type"
  | "value"
  | "valuetype";

export type HTMLPreElementAttributes = HTMLElementAttributes | "width";

export type HTMLProgressElementAttributes =
  | HTMLElementAttributes
  | "max"
  | "value";

export type HTMLQuoteElementAttributes = HTMLElementAttributes | "cite";

export type HTMLScriptElementAttributes =
  | HTMLElementAttributes
  | "async"
  | "blocking"
  | "charset"
  | "crossorigin"
  | "defer"
  | "fetchpriority"
  | "integrity"
  | "language"
  | "nomodule"
  | "referrerpolicy"
  | "src"
  | "type";

export type HTMLSelectElementAttributes =
  | HTMLElementAttributes
  | "autocomplete"
  | "disabled"
  | "form"
  | "multiple"
  | "name"
  | "required"
  | "size";

export type HTMLSlotElementAttributes = HTMLElementAttributes | "name";

export type HTMLSourceElementAttributes =
  | HTMLElementAttributes
  | "height"
  | "media"
  | "sizes"
  | "src"
  | "srcset"
  | "type"
  | "width";

export type HTMLStyleElementAttributes =
  | HTMLElementAttributes
  | "blocking"
  | "media"
  | "type";

export type HTMLTableElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "bgcolor"
  | "border"
  | "cellpadding"
  | "cellspacing"
  | "frame"
  | "rules"
  | "summary"
  | "width";

export type HTMLTableBodyElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "char"
  | "charoff"
  | "valign";

export type HTMLTableCellElementAttributes =
  | HTMLElementAttributes
  | "abbr"
  | "align"
  | "axis"
  | "bgcolor"
  | "char"
  | "charoff"
  | "colspan"
  | "headers"
  | "height"
  | "nowrap"
  | "rowspan"
  | "scope"
  | "valign"
  | "width";

export type HTMLTemplateElementAttributes =
  | HTMLElementAttributes
  | "shadowrootclonable"
  | "shadowrootcustomelementregistry"
  | "shadowrootdelegatesfocus"
  | "shadowrootmode"
  | "shadowrootserializable";

export type HTMLTextAreaElementAttributes =
  | HTMLElementAttributes
  | "autocomplete"
  | "cols"
  | "dirname"
  | "disabled"
  | "form"
  | "maxlength"
  | "minlength"
  | "name"
  | "placeholder"
  | "readonly"
  | "required"
  | "rows"
  | "wrap";

export type HTMLTableFootElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "char"
  | "charoff"
  | "valign";

export type HTMLTableHeaderCellElementAttributes =
  | HTMLElementAttributes
  | "abbr"
  | "align"
  | "axis"
  | "bgcolor"
  | "char"
  | "charoff"
  | "colspan"
  | "headers"
  | "height"
  | "nowrap"
  | "rowspan"
  | "scope"
  | "valign"
  | "width";

export type HTMLTableHeadElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "char"
  | "charoff"
  | "valign";

export type HTMLTimeElementAttributes = HTMLElementAttributes | "datetime";

export type HTMLTableRowElementAttributes =
  | HTMLElementAttributes
  | "align"
  | "bgcolor"
  | "char"
  | "charoff"
  | "valign";

export type HTMLTrackElementAttributes =
  | HTMLElementAttributes
  | "default"
  | "kind"
  | "label"
  | "src"
  | "srclang";

export type HTMLUListElementAttributes =
  | HTMLElementAttributes
  | "compact"
  | "type";

export type HTMLVideoElementAttributes =
  | HTMLElementAttributes
  | "autoplay"
  | "controls"
  | "crossorigin"
  | "height"
  | "loop"
  | "muted"
  | "playsinline"
  | "poster"
  | "preload"
  | "src"
  | "width";

export type HTMLElementTagNameMapToAttributes = {
  a: HTMLAnchorElementAttributes;
  applet: HTMLAppletElementAttributes;
  area: HTMLAreaElementAttributes;
  audio: HTMLAudioElementAttributes;
  base: HTMLBaseElementAttributes;
  basefont: HTMLBaseFontElementAttributes;
  blockquote: HTMLBlockQuoteElementAttributes;
  body: HTMLBodyElementAttributes;
  br: HTMLBRElementAttributes;
  button: HTMLButtonElementAttributes;
  canvas: HTMLCanvasElementAttributes;
  caption: HTMLCaptionElementAttributes;
  col: HTMLColElementAttributes;
  colgroup: HTMLColGroupElementAttributes;
  data: HTMLDataElementAttributes;
  del: HTMLDelElementAttributes;
  details: HTMLDetailsElementAttributes;
  dialog: HTMLDialogElementAttributes;
  dir: HTMLDirElementAttributes;
  div: HTMLDivElementAttributes;
  dlist: HTMLDListElementAttributes;
  embed: HTMLEmbedElementAttributes;
  fieldset: HTMLFieldSetElementAttributes;
  font: HTMLFontElementAttributes;
  form: HTMLFormElementAttributes;
  frame: HTMLFrameElementAttributes;
  frameset: HTMLFrameSetElementAttributes;
  h1: HTMLHeadingElementAttributes;
  h2: HTMLHeadingElementAttributes;
  h3: HTMLHeadingElementAttributes;
  h4: HTMLHeadingElementAttributes;
  h5: HTMLHeadingElementAttributes;
  h6: HTMLHeadingElementAttributes;
  head: HTMLHeadElementAttributes;
  hr: HTMLHRElementAttributes;
  html: HTMLHtmlElementAttributes;
  iframe: HTMLIFrameElementAttributes;
  img: HTMLImageElementAttributes;
  input: HTMLInputElementAttributes;
  ins: HTMLInsElementAttributes;
  isindex: HTMLIsIndexElementAttributes;
  label: HTMLLabelElementAttributes;
  legend: HTMLLegendElementAttributes;
  li: HTMLLIElementAttributes;
  link: HTMLLinkElementAttributes;
  map: HTMLMapElementAttributes;
  menu: HTMLMenuElementAttributes;
  meta: HTMLMetaElementAttributes;
  meter: HTMLMeterElementAttributes;
  object: HTMLObjectElementAttributes;
  ol: HTMLOListElementAttributes;
  optgroup: HTMLOptGroupElementAttributes;
  option: HTMLOptionElementAttributes;
  output: HTMLOutputElementAttributes;
  p: HTMLParagraphElementAttributes;
  param: HTMLParamElementAttributes;
  pre: HTMLPreElementAttributes;
  progress: HTMLProgressElementAttributes;
  q: HTMLQuoteElementAttributes;
  script: HTMLScriptElementAttributes;
  select: HTMLSelectElementAttributes;
  slot: HTMLSlotElementAttributes;
  source: HTMLSourceElementAttributes;
  span: HTMLElementAttributes;
  style: HTMLStyleElementAttributes;
  table: HTMLTableElementAttributes;
  tbody: HTMLTableBodyElementAttributes;
  td: HTMLTableCellElementAttributes;
  template: HTMLTemplateElementAttributes;
  textarea: HTMLTextAreaElementAttributes;
  tfoot: HTMLTableFootElementAttributes;
  th: HTMLTableHeaderCellElementAttributes;
  thead: HTMLTableHeadElementAttributes;
  time: HTMLTimeElementAttributes;
  tr: HTMLTableRowElementAttributes;
  track: HTMLTrackElementAttributes;
  ul: HTMLUListElementAttributes;
  video: HTMLVideoElementAttributes;
};
