import React, { Component } from 'react'
import hocDisplayName from '../../utils/hocDisplayName'
import { QueryContextConsumer } from './QueryContext'

export default function WithQuery(WrappedComponent) {
  return class extends Component {
    static displayName = hocDisplayName('withQuery', WrappedComponent)

    render() {
      return (
        <QueryContextConsumer>
          {value =>
            <WrappedComponent
              {...this.props}
              query={value}
            />
          }
        </QueryContextConsumer>
      )
    }
  }
}
