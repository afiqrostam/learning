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

  var result = $('#result')
  var exifNode = $('#exif')
  var thumbNode = $('#thumbnail')
  var actionsNode = $('#actions')
  var currentFile
  var coordinates

  function displayExifData (exif) {
    var thumbnail = exif.get('Thumbnail')
    var tags = exif.getAll()
    var table = exifNode.find('table').empty()
    var row = $('<tr></tr>')
    var cell = $('<td></td>')
    var prop
    if (thumbnail) {
      thumbNode.empty()
      loadImage(thumbnail, function (img) {
        thumbNode.append(img).show()
      }, {orientation: exif.get('Orientation')})
    }
    for (prop in tags) {
      if (tags.hasOwnProperty(prop)) {
        table.append(
          row.clone()
            .append(cell.clone().text(prop))
            .append(cell.clone().text(tags[prop]))
        )
      }
    }
    exifNode.show()
  }

  function updateResults (img, data) {
    var fileName = currentFile.name
    var href = img.src
    var dataURLStart
    var content
    if (!(img.src || img instanceof HTMLCanvasElement)) {
      content = $('<span>Loading image file failed</span>')
    } else {
      if (!href) {
        href = img.toDataURL(currentFile.type + 'REMOVEME')
        // Check if file type is supported for the dataURL export:
        dataURLStart = 'data:' + currentFile.type
        if (href.slice(0, dataURLStart.length) !== dataURLStart) {
          fileName = fileName.replace(/\.\w+$/, '.png')
        }
      }
      content = $('<a target="_blank">').append(img)
        .attr('download', fileName)
        .attr('href', href)
    }
    result.children().replaceWith(content)
    if (img.getContext) {
      actionsNode.show()
    }
    if (data && data.exif) {
      displayExifData(data.exif)
    }
  }

  function displayImage (file, options) {
    currentFile = file
    if (!loadImage(
      file,
      updateResults,
      options
    )) {
      result.children().replaceWith(
        $('<span>' +
          'Your browser does not support the URL or FileReader API.' +
          '</span>')
      )
    }
  }

  function dropChangeHandler (e) {
    e.preventDefault()
    e = e.originalEvent
    var target = e.dataTransfer || e.target
    var file = target && target.files && target.files[0]
    var options = {
      maxWidth: result.width(),
      canvas: true,
      pixelRatio: window.devicePixelRatio,
      downsamplingRatio: 0.5,
      orientation: true
    }
    if (!file) {
      return
    }
    exifNode.hide()
    thumbNode.hide()
    displayImage(file, options)
  }

  // Hide URL/FileReader API requirement message in capable browsers:
  if(window.createObjectURL||window.URL||window.webkitURL||window.FileReader){result.children().hide()}
  $('#file-input').on('change', dropChangeHandler)
})
