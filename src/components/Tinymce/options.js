// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
const pluginList = [
  'advlist',
  'anchor',
  'autolink',
  // 'autoresize',
  'autosave',
  // 'bbcode',
  'charmap',
  'code',
  'codesample',
  'directionality',
  // 'emoticons',
  // 'fullpage',
  'fullscreen',
  'help',
  'hr',
  'image',
  'imagetools',
  'importcss',
  'insertdatetime',
  'link',
  'lists',
  'media',
  'nonbreaking',
  'noneditable',
  'pagebreak',
  'paste',
  'preview',
  'print',
  // 'quickbars',
  'save',
  'searchreplace',
  'spellchecker',
  'tabfocus',
  'table',
  'template',
  'textpattern',
  'toc',
  'visualblocks',
  'visualchars',
  'wordcount'
]
export const plugins = [pluginList.join(' ')]

const toolbarList = [
  'fontselect',
  'fontsizeselect',
  'formatselect',
  '|',
  'bold',
  'italic',
  'strikethrough',
  'forecolor',
  'backcolor',
  'permanentpen',
  'formatpainter',
  'removeformat',
  '|',
  'alignleft',
  'aligncenter',
  'alignright',
  'alignjustify',
  '|',
  'numlist',
  'bullist',
  'outdent',
  'indent',
  '|',
  'link',
  // 'image',
  'media',
  'insertdatetime',
  'table',
  'imageUploader'
]
export const toolbar = [toolbarList.join(' ')]

const fontFamilys = [
  '宋体=SimSun;',
  '新宋体=NSimSun;',
  '仿宋=FangSong;',
  '细明体=MingLiU;',
  '新细明体=PMingLiU;',
  '楷体=KaiTi;',
  '标楷体=DFKai-SB;',
  '黑体=SimHei;',
  '微软雅黑=Microsoft YaHei;',
  'Andale Mono=andale mono,times;',
  'Arial=arial,helvetica,sans-serif;',
  'Arial Black=arial black,avant garde;',
  'Book Antiqua=book antiqua,palatino;',
  'Comic Sans MS=comic sans ms,sans-serif;',
  'Courier New=courier new,courier;',
  'Georgia=georgia,palatino;',
  'Helvetica=helvetica;',
  'Impact=impact,chicago;',
  'Symbol=symbol;',
  'Tahoma=tahoma,arial,helvetica,sans-serif;',
  'Terminal=terminal,monaco;',
  'Times New Roman=times new roman,times;',
  'Trebuchet MS=trebuchet ms,geneva;',
  'Verdana=verdana,geneva;',
  'Webdings=webdings;',
  'Wingdings=wingdings,zapf dingbats;'
]
export const fontFormats = fontFamilys.join(' ')

const fontSize = [
  '8磅=8pt',
  '10磅=10pt',
  '12磅=12pt',
  '14磅=14pt',
  '16磅=16pt',
  '18磅=18pt',
  '20磅=20pt',
  '22磅=22pt',
  '24磅=24pt',
  '26磅=26pt',
  '28磅=28pt',
  '30磅=30pt',
  '32磅=32pt',
  '34磅=34pt',
  '36磅=36pt'
]
export const fontSizeFormats = fontSize.join(' ')

const menuBarList = [
  'file',
  'edit',
  'insert',
  'view',
  'format'
  // 'table',
  // 'tools',
  // 'help'
]
export const menuBar = menuBarList.join(' ')
