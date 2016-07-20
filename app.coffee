fs           = require 'fs'
axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
cleanUrls    = require 'clean-urls'
collections  = require 'roots-collections'
records      = require 'roots-records'
excerpt      = require 'html-excerpt'
moment       = require 'moment'
marked = require 'marked'
dynamic_content = require 'dynamic-content'
posts = require 'roots-posts'
S = require 'underscore.string'
readDir = require 'readdir'
http = require 'http'
Finder = require 'fs-finder'
readdirp = require 'readdirp'
path = require 'path'
es = require 'event-stream'


run = () ->
  try
    stream = readdirp({
      root: './',
      fileFilter: ['!single-layout.jade', '!post.jade', '!search.jade', '!index.jade', '!layout.jade', '!.users.yml', '!*.json', '!*.xml', '!*.coffee', '!.gitignore', '!README.md'],
      directoryFilter: ['!admin', '!includes', '!css', '!img', '!js', '!sass', '!data', '!node_modules', '!public', '!.git', '!release']
    });

    result = ""

    stream.on 'data', (entry)->
     stream_path = entry.fullParentDir
     stream_file = entry.name

     str = stream_path.replace(/\\/g, "/")
     md =  stream_file.replace(/md/g,  "html")
     result += ""
     result += "<url><loc>" + str + "/" + md + "</loc></url>" + "\n";

     fs.writeFile './views/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+result+'</urlset>', (err) -> if err then console.log err
  catch e
    e = error

setTimeout(run, 20000)







monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]



sort = (ary, opts) ->
  opts = {} if !opts
  return ary.sort(opts.fn) if opts.fn
  opts.by = 'order' if !opts.by
  if opts.by == 'date' & opts.order =='asc'
   return ary.sort(a, b) ->
     if new Date(a[opts.by]) > new Date(b[opts.by]) then return -1 else return 1
  if opts.order =='asc'
    return ary.sort(a, b) ->
      if a[opts.by] > b[opts.by] then return -1 else return 1
  else
    return ary.sort(a, b) ->
      if a[opts.by] < b[opts.by] then return -1 else return 1

filter = (categorysearch, arr) ->
  $.grep arr, (item) ->
    $.grep(item.category, (cat) ->
      cat.type == categorysearch
    ).length


module.exports =

  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']


  locals:
    postExcerpt: (html, length, ellipsis) ->
      excerpt.text(html, length || 100, ellipsis || '...')
    dateFormat: (date, format) ->
      moment(date).format(format)



  extensions: [


    collections(folder: 'articles', layout: 'post'),
    collections(folder: 'technology', layout: 'post'),
    collections(folder: 'fashion', layout: 'post'),
    collections(folder: 'music', layout: 'post'),
    collections(folder: 'education', layout: 'post'),



    records(

      events: { file: "data/events.json"}
      site: { file: "data/site.json"}



    ),


    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl')





  ]
  live_reload: true

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true

  server:
    "clean_urls": true

