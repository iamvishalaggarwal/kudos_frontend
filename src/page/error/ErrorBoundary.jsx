import React from "react";
import PropTypes from "prop-types";
import FallbackUI from "./FallbackUI";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }
  // Reset error boundary when key changes
  componentDidUpdate(prevProps) {
    if (this.props.resetKey !== prevProps.resetKey) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };
  render() {
    if (this.state.hasError) {
      return <FallbackUI resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node,
  resetKey: PropTypes.any,
};

export default ErrorBoundary;
