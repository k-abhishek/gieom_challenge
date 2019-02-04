import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { QueryContextProvider } from './QueryContext'

function getMapFromSearchString(string) {
  if (typeof URLSearchParams === 'undefined') return {}
  const urlParams = new URLSearchParams(string)
  const ret = {}
  Array.from(urlParams.keys()).forEach(key => {
    const value = urlParams.get(key)
    if (/^\[/.test(value)) {
      ret[ key ] = value.replace('[', '').replace(']', '').split(',').filter(a => a)
    } else {
      ret[ key ] = value.length === 1 ? value[ 0 ] : value
    }
  })

  return ret
}

function mergeStringWithObject(string, object) {
  const newQueryObj = {
    ...getMapFromSearchString(string),
    ...object
  }

  const urlParams = new URLSearchParams()

  Object.keys(newQueryObj).forEach(key => {
    const value = newQueryObj[ key ]
    if (value) {
      if (Array.isArray(value)) {
        urlParams.set(key, `[${value.join(',')}]`)
      } else {
        urlParams.set(key, value)
      }
    }
  })

  return urlParams.toString()
}

class QueryProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  pushQueryParam = newParams => {
    const { history, location } = this.props
    const { search, pathname } = location

    const newQueryString = mergeStringWithObject(search, newParams)

    history.push(`${pathname}?${newQueryString}`)
  }

  actuallyReplaceQueryParam = () => {
    const { history, location } = this.props
    const { search, pathname } = location

    const newQueryString = mergeStringWithObject(search, this.newParams)

    this.newParams = {}

    history.replace(`${pathname}?${newQueryString}`)
  }

  replaceQueryParam = newParams => {
    /*
    * We do this weird timeout pattern here
    * to ensure that if replaceQueryParam
    * is called multiple times in one render
    * it still works as expected
    * */

    this.newParams = {
      ...this.newParams,
      ...newParams,
    }

    clearTimeout(this.timeout)

    this.timeout = setTimeout(this.actuallyReplaceQueryParam, 0)
  }

  render() {
    return (
      <QueryContextProvider
        value={{
          ...getMapFromSearchString(this.props.location.search),
          pushQueryParam: this.pushQueryParam,
          replaceQueryParam: this.replaceQueryParam,
        }}
      >
        {this.props.children}
      </QueryContextProvider>
    )
  }
}

export default withRouter(QueryProvider)
