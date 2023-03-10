import React from "react";

import Error from "../../../pages/feed/error";

class EchoErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    return res.status(400).json({ code: { error }, message: { errorInfo } });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Error />;
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default EchoErrorBoundary;
