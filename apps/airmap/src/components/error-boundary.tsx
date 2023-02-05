import React from "react";
export class ErrorBoundary extends React.Component<
  {},
  {
    error: null | string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error: String(error) };
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error}</pre>
        </>
      );
    }

    return this.props.children;
  }
}
