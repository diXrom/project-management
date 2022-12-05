import { Component } from 'react';

import { IErrorProps, IErrorState } from './lib/types';

class ErrorBoundary extends Component<IErrorProps, IErrorState> {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError)
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="flex items-center text-xl text-center rounded-md shadow-md h-36 w-96">
            Sorry, an unknown error has occurred, please reload the page
          </div>
        </div>
      );
    return children;
  }
}

export default ErrorBoundary;
