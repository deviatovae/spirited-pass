'use client';
import { Component } from 'react';
import { toast } from 'react-toastify';
import ErrorPage from './ErrorPage';
import { ReturnHome } from './ReturnHome';

type Props = {
  children: JSX.Element | JSX.Element[];
};
type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    toast.error(error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage error="Oops! Something went wrong.">
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="pt-4 text-2xl block text-center w-full"
          >
            Retry
          </button>
          <ReturnHome />
        </ErrorPage>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
