/*
 * JavaScript Load Image Demo JS
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global loadImage, HTMLCanvasElement, $ */

$(function () {
  'use strict'

  var result=$('#result')
  var currentFile
  var coordinates
  
  function updateResults (img, data) {
    var fileName=currentFile.name
    var href=img.src
    var dataURLStart
    var content
    if(!(img.src||img instanceof HTMLCanvasElement)){content=$('<span>Loading image file failed</span>')}
    else{
      if(!href){
        href=img.toDataURL('image/jpeg',parseInt($('input[type="number"]').val(),10))
        img.className='img-fluid rounded';
        // Check if file type is supported for the dataURL export:
        dataURLStart ='data:'+currentFile.type
        if(href.slice(0,dataURLStart.length)!==dataURLStart){fileName=fileName.replace(/\.\w+$/,'.jpg')}}
      content=$('<a target="_blank">').append(img).attr('download', fileName).attr('href',href)}
    result.children().replaceWith(content)}

  function displayImage (file, options) {
    currentFile=file
    if (!loadImage(file,updateResults,options)){
      result.children().replaceWith($('<span>'+'Your browser does not support the URL or FileReader API.'+'</span>'))}}

  function dropChangeHandler (e) {
    e.preventDefault()
    e=e.originalEvent
    var target = e.dataTransfer || e.target
    var file=target && target.files && target.files[0]
    var options={
      orientation: true, 
      maxWidth: 500,
      maxHeight: 500, 
      canvas: true, 
      crop:true,
      pixelRatio: 1, 
      downsamplingRatio: 0.01}
    if(!file){return}
    displayImage(file,options)}

  // Hide URL/FileReader API requirement message in capable browsers:
  if(window.createObjectURL||window.URL||window.webkitURL||window.FileReader){result.children().hide()}
  $('#file-input').on('change', dropChangeHandler)})
