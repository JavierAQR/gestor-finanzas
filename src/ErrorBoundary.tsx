import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error encontrado: " + error);
    console.error("Error info: " + errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Oops! Aun no tienes registros!</h1>
          <p>Ingresa transacciones para poder visualizarlas</p>
          <a href="/index.html">Refrescar página</a>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
