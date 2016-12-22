'use strict'

const assert = require('assert')
const trumpet = require('trumpet')
const partialRight = require('ap').partialRight
const isAbsolute = require('is-absolute-url')
const join = require('url-join')
const url = require('url')

module.exports = transform

function transform(base) {
  assert(base, 'base url is required')
  const tr = trumpet()
  var rootUri = url.resolve(base, '/')

  tr.selectAll('img', partialRight(absolute, rootUri, 'src'))
  tr.selectAll('script', partialRight(absolute, rootUri, 'src'))
  tr.selectAll('link', partialRight(absolute, rootUri, 'href'))
  tr.selectAll('a', partialRight(absolute, rootUri, 'href'))
  tr.selectAll('a', partialRight(target, 'target'))

  return tr
}

function absolute (element, base, attribute) {
  element.setAttribute(
    attribute,
    (value) => value
      ? isAbsolute(value)
        ? value
        : join(base, value)
      : undefined
  )
}

function target (element, attribute) {
  element.setAttribute(attribute, '_blank')
}
