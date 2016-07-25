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
https = require 'https'
httpsAgent = require 'https-agent'
Finder = require 'fs-finder'
readdirp = require 'readdirp'
path = require 'path'
url = require 'url'
express = require 'express'
app = express()
crawl = require 'crawl'
roots_sample = require 'roots-sample-extension'
webriq_sitemap_generator = require 'webriq-sitemap-generator'
charge = require 'charge'
WebSocket = require 'faye-websocket'




readdirp({root: '.', lstat: true, fileFilter: '*.md', directoryFilter: '!node_modules'}
,(fileinfo) ->
 console.log(fileinfo.path)
,(err,res) ->
 return true
)

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
    css_pipeline(files: 'assets/css/*.styl'),
    webriq_sitemap_generator()




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

  after:->







