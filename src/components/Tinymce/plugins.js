// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
const pluginList = [
  'print',
  'preview',
  'fullpage',
  'searchreplace',
  'autolink',
  'directionality',
  'visualblocks',
  'visualchars',
  'fullscreen',
  'image',
  'link',
  'media',
  'template',
  'codesample',
  'table',
  'charmap',
  'hr',
  'pagebreak',
  'nonbreaking',
  'anchor',
  'toc',
  'insertdatetime',
  'advlist',
  'lists',
  'wordcount',
  'imagetools',
  'textpattern',
  'help'
  // 'powerpaste',
  // 'advcode',
  // 'mediaembed',
  // 'tinymcespellchecker',
  // 'a11ychecker',
  // 'formatpainter',
  // 'permanentpen',
  // 'pageembed',
  // 'tinycomments',
  // 'mentions',
  // 'linkchecker'
]

const pluginsStr = pluginList.join(' ')

const plugins = [pluginsStr]

export default plugins
