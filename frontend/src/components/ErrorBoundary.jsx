import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Frontend render error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
          <div className="w-full max-w-xl rounded-[2rem] border border-red-500/20 bg-slate-900 p-8 text-center shadow-2xl shadow-black/30">
            <p className="text-sm uppercase tracking-[0.35em] text-red-300">
              App Error
            </p>
            <h1 className="mt-4 text-3xl font-semibold">
              Something broke while loading the page.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Try reloading once. If the issue continues, clear site storage and
              open the app again.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
